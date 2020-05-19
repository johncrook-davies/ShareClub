export function compareTwoThings(a,b) {
  if(Array.isArray(a) && Array.isArray(b)) {
    return diffBetweenTwoArraysOfObjects(a,b)
  } else if((typeof a === 'object') && (typeof b === 'object') ) {
    return diffBetweenTwoObjects(a,b)
  } else {
    throw new Error('compareTwoThings: error with arguments, they are not the same type or not objects or arrays.')
  }
}

export function diffBetweenTwoArraysOfObjects(a,b) {
  /*
    Returns additions, updates and deletions neccesary for a to equal b
    Input:
      a: Array[Object]
      b: Array[Object]
    Output:
      {
        create: Array[Object],
        destroy: Array[Object],
        update: Array[Object]
      }
  */
  let result = {},
      inBothArrays,
      update;
  // In a but not b
  result.destroy = a.filter((obj) => {
    let id = obj.id;
    return b.every((b_element) => {return b_element.id !== obj.id})
  })
  // In b but not a
  result.create = b.filter((obj) => {
    let id = obj.id;
    return a.every((a_element) => {return a_element.id !== id})
  })
  // In both a and b
  inBothArrays = b.filter((obj) => {
    let id = obj.id;
    return a.some((a_element) => {return a_element.id === id})
  })
  update = inBothArrays.map((obj) => {
    let oldElement = a.filter((a_element) => {return a_element.id === obj.id})[0];
    let changes = diffBetweenTwoObjects(oldElement,obj);
    changes.id = obj.id;
    return changes
  })
  result.update = update.filter((el) => {
    return Object.keys(el).length > 1
  })
  return result;
}

const allArrayElementsAreSame = (a,b) => (!a.every((v) => b.includes(v)) || !a.every((v) => b.includes(v)))

export function diffBetweenTwoObjects(a,b) {
  /*
    Returns additions, updates and deletions neccesary for a to equal b
    Input:
      a: Object
      b: Object
    Output:
      {
        create: Object,
        destroy: Object,
        update: Object
      }
  */
  let result = {};
  for(prop in a) {
    if(a.hasOwnProperty(prop) && b.hasOwnProperty(prop)) {
      // In both a and b
      if(a[prop] === '0' && b[prop] === null) {
        // Make sure zero and null are classified as equal
      } else if(Array.isArray(a[prop]) || Array.isArray(b[prop])) {
        // If values are arrays then convert any jsons back to an array and compare
        try {
          // Property of a is a json
          let arr = JSON.parse(a[prop]),
              chng = {};
          if(allArrayElementsAreSame(arr, b[prop])) {
            chng[prop] = b[prop];
            result.update = chng;
          }
        } catch(e) {
          try {
            // Property of b is a json
            let arr = JSON.parse(b[prop]),
                chng = {};
            if(allArrayElementsAreSame(arr, a[prop])) {
              chng[prop] = b[prop];
              result.update = chng;
            }
          } catch(e) {
            // Both a and b are arrays
            let chng = {};
            if(allArrayElementsAreSame(a[prop], b[prop])) {
              chng[prop] = b[prop];
              result.update = chng;
            }
          }
        }
      } else {
        if(a[prop] !== b[prop]) {
          let chng = {};
          chng[prop] = b[prop];
          result.update = chng;
        }  
      }
    } else if(a.hasOwnProperty(prop)) {
      // Just in a
      let chng = {};
      chng[prop] = a[prop];
      result.destroy = chng;
    }
  }
  for(prop in b) {
    if(b.hasOwnProperty(prop) && !a.hasOwnProperty(prop)) {
      // Just in b
      let chng = {};
      chng[prop] = b[prop];
      result.create = chng;
    }
  }
  return result;
}