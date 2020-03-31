export function handleError(error) {
    console.log(
        "\n\tERROR DETECTED:",
        `\n\terror code: ${error.code}`,
        `\n\tdescription: '${error.message}'\n`
    )
}