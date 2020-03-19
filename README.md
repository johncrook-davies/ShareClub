# The Share Club documentation
## Setup notes
- In line with current recommendations, react native CLI is accessed via npx (which ships with Node), which will download the most recent stable version of the react native CLI each time the command is run. Share Club was first initialised with react native CLI version 3.2.1.
- Enabled runnnin on own device by installing 'ios-deploy"
```zsh
    npm install -g ios-deploy
```
## Commands
### Development environment
- Run native iOS simulator: 
```zsh
    npx react-native run-ios
```
- Run on own device:
```zsh
    npx react-native run-ios --device "Johnathan’s iPhone"
```