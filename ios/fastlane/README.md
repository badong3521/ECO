fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios ios_code_push

```sh
[bundle exec] fastlane ios ios_code_push
```

Push new code to Staging/Demo/Beta by Code Push with current version in Xcode

options:

`mandatory:true | false`

`demo:true | false`

`beta:true | false`

### ios ios_code_push_production

```sh
[bundle exec] fastlane ios ios_code_push_production
```

Push new code to Production by Code Push

options:

`mandatory:true | false`

### ios ios_build

```sh
[bundle exec] fastlane ios ios_build
```

Build new IOS app

options:

`production:true`: build file with production environment

`production:false`: build file with staging environment

`demo:true|false`: build file with demo environment

`beta:true|false`: build file with beta environment

### ios ios_firebase_distribution

```sh
[bundle exec] fastlane ios ios_firebase_distribution
```

Build IOS app, upload it to Firebase Distribution and invite testers automatically

options:

`production:true`: build Production app, otherwise build Staging app

`company:true`: invite for all members in company group, otherwise only invite Ecoone internal members

`demo:true`: build Demo app

`beta:true`: build Beta app

### ios ios_upload_to_testflight_internal_testing

```sh
[bundle exec] fastlane ios ios_upload_to_testflight_internal_testing
```

Release TestFlight for internal testing

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
