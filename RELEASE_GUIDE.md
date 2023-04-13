# Git flow for production release
1. Create new version branch `v1.0.0-release-1` with `v1.0.0` is version name, `release-x` is version of bundleJS with codepush for `v1.0.0` version.<br>
Example:
- Branch: `v1.0.1` with new update for additions of some native code
- Branch: `v1.0.1-release-1` with new update for only JS code at the first time
- Branch: `v1.0.1-release-2` with new update for only JS code at the second time

2. In above version branch, change version name and version code for both Android and IOS
- IOS<br>
<img src="https://i.ibb.co/t4fJ3pS/4.png" width="500"/>
- Android <br>
<img src="https://i.ibb.co/r0wRzjK/6.png" width="500"/>
3. Create pull request from version branch `v1.0.0-release-1` to `development` and `master` and merge.
4. Create new tag `v1.1.1-release-6-1cp` and release code on this tag.<br>
With `1cp` is the number of codepush update.

#Fastlane
## Build testing app
1. Run command to build and push to Firebase Distributor
- `yarn releaseTest:pushNewBuild:staging` for Staging app
- `yarn releaseTest:pushNewBuild:demo` for Demo app
- `yarn releaseTest:pushNewBuild:beta` for Beta app

- *Note: If you don't have any native code changes, you can move to Step 2*

2. Run command to push the new JS changes for CodePush will the current IOS & Android version
- `yarn releaseTest:update:staging` for Staging app
- `yarn releaseTest:update:demo` for Demo app
- `yarn releaseTest:update:beta` for Beta app

## Build Production App

### Checklist
1. `Version` name and `Build` number if you want to build a new app with new features, you should upgrade version name
2. Change logs: note all thing you want to let user know about new version
- IOS: `ios/fastlane/metadata/<en-GB|vi>/release_notes.txt`
- Android: `android/fastlane/metadata/<en-IN|vi>/changelogs/<version_code>.txt`

#### Publish new version
#### Update bundleJS in appcenter
# Metadata changes
### App Icon
Go to website [https://appicon.co](https://appicon.co) to generate icons for Iphone and Android. Then download and extract zip file.
1. Android.
- copy all folders inside `android` folder of extracted to `android/src/main/res/`. Replace the duplicated files
- if you want to change icon in splash screen, replace file in `/android/src/main/res/mipmap-xxxhdpi/splash.png` (should be same dimension)
- if you want to change notification icon, replace file in `/android/src/main/res/mipmap-xxxhdpi/ic_notification.png` (should be same dimension)

*Note: Android required a notification icon, you should choose the icon that is NOT solid, because some device will fill the icon by a color, and you will see the rectangle only*

2. IOS (AppIcon for IOS must be square, CANNOT have border)
- pick the files in extracted folder that has same dimensions with all files in `ios/Ecoone/Images.xcassets/AppIcon.appiconset/` (except Contents.json). Replace the picked files to the old images.
- if you want to change icon in splash screen, replace files in  `ios/Ecoone/Images.xcassets/SplashLogo.imageset/`

### App Info
Change the content inside `<android|ios>/fastlane/metadata`

# Tips
### How to schedule the release
1. Android
Go `Publishing overview` <br>
<img src="https://i.ibb.co/jHKnFKk/7.png" width="500"/>
<br>
`Manage`<br>
<img src="https://i.ibb.co/mNbcy5M/8.png" width="500"/>
- Check `Managed publishing on` to manual release a new version after approved
- Check `Managed publishing off` to auto release a new version after approved

2. IOS
Select option you want <br>
<img src="https://i.ibb.co/F7vQsTX/Screen-Shot-2021-05-04-at-17-21-26.png" width="500"/>

### How to add a new permission (such as CAMERA, LOCATION)
For IOS, when you want to add a new permission, you have to put the key to `Info.plist` file <br>
For ex:
```
<key>NSPhotoLibraryAddUsageDescription</key>
<string>$(PRODUCT_NAME) would like to save photos to your photo gallery</string>
```

and add the vi and en messages to `InfoPlist.strings` files.
