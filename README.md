# The Share Club documentation
## Setup notes
- In line with current recommendations, react native CLI is accessed via npx (which ships with Node), which will download the most recent stable version of the react native CLI each time the command is run. Share Club was first initialised with react native CLI version 3.2.1.
- Enabled runnnin on own device by installing 'ios-deploy"
```zsh
    npm install -g ios-deploy
```
- Installed fastlane 2.143.0 with homebrew to help deploy to the app store quicker
```zsh
    brew install fastlane
    cd ios
    fastlane init
    cd ..
```
- Installed an SQLite react native plugin to manage device persistant storage
```zsh
    npx yarn add react-native-sqlite-storage
    cd ios
    pod install
    cd ..
```
- Built and installed a proprietary library to keep server database and internal storage in sync
## Memory
- Clubs, proposals and invitations are stored in a redux store for the duration of each session.
### Development environment
- Run native iOS simulator: 
```zsh
    npx react-native run-ios
```
- Run on own device:
```zsh
    npx react-native run-ios --device "Johnathan’s iPhone"
```
- Publish to testflight:
```zsh
    cd ios
    fastlane beta
    cd ..
```
- Add libraries with yarn by accessing through npx:
```zsh
    npx yarn add <library-name>
```
#### Notes
- It's best to use the Mac Os app 'Icon Set Creator' to automatically create all of the different icons needed. This just requires a 1024x1024 png of icon, choose to save in top level directory.