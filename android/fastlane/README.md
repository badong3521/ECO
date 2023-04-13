fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## Android

### android android_code_push

```sh
[bundle exec] fastlane android android_code_push
```

Push new code to Staging | Demo | Beta by Code Push

options:

`mandatory:true | false`

`demo:true | false`

`beta:true | false`

### android android_code_push_production

```sh
[bundle exec] fastlane android android_code_push_production
```

Push new code to Production by Code Push

options:

`mandatory:true | false`

### android android_build

```sh
[bundle exec] fastlane android android_build
```

Build new Android app

options:

`production:true`: build file with production environment

`production:false`: build file with staging environment

`demo:true`: build file with Demo environment

`beta:true`: build file with Beta environment

`bundle:true`: output is bundle file (app.aab)

`bundle:false`: output is apk file (app.apk)

### android android_firebase_distribution

```sh
[bundle exec] fastlane android android_firebase_distribution
```

Build Android app, upload it to Firebase Distribution and invite testers automatically

options:

`production:true`: build Production app, otherwise build Staging app

`company:true`: invite for all members in company group, otherwise only invite EcoOne internal members

`demo:true`: build Demo app

`beta:true`: build Beta app

### android android_upload_to_play_store_internal_testing

```sh
[bundle exec] fastlane android android_upload_to_play_store_internal_testing
```

Release Play store internal testing

### android android_upload_to_google_store

```sh
[bundle exec] fastlane android android_upload_to_google_store
```

Build Production Android app, and upload all metadata and new build version to Google Store and rollout automatically. Please confirm all information in `android/fastlane/metadata` before call this lane

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
