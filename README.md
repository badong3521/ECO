# Ecoone
Welcome to the Ecoone mobile application!

Before starting to develop on this code base please refer to the [Required Reading](#required-reading) section.
It contains important information about the code structure and other design patterns applied to the code base.

In order to increase overall code quality we enforce 100% TypeScript, ESlint, and Prettier adherance!
You can test your current code using `npm run lint`. I recommend installing the linter directly to your IDE.

## Application Folder Structure
The following is the architecture that is used in the application. Each important node has been labeled with a number and has been expanded upon.

```
├── src
|   ├── components
|   |   └── # Reusable components (1)
|   ├── config
|   |   └── # Configuration files (ENV keys, API urls, etc.)
|   ├── features
|   |   └── # Major features (2)
|   ├── lib
|   |   └── # Library files or required configuration for libraries.
|   ├── navigation
|   |   └── # Router (3)
|   ├── reducers
|   |   └── # Root reducer.
|   └── services
|       └── # Shared business logic that can be reused throughout the application (API client etc.)
├── android
|   └── # Android build
├── ios
|   └── # iOS build
├── App.tsx
└── index.html
```

1. Inside the _components_ folder we have any component that can be reused across multiple _features_ without reprecussions.
2. Each high level feature of the application (merchants, bus) is contained within this folder. Inside each feature there can be multiple
smart components and routable screens.
3. The `react-navigation` router object that controls routing within the application.

## Required Plugins
Installing these plugins in your IDE will make your life much easier:
* ESLint
* [Prettier](https://prettier.io/)

## OTA Release (Codepush)
In order to provide up to date releases to our users we make use of [Codepush](https://appcenter.ms). The process for how to initiate a release for Android and iOS is listed below.
The following segment is built on the documentation of Codepush which can be found [here](https://docs.microsoft.com/en-us/appcenter/distribution/codepush/cli).

Before you can release for either system you will need to install the appcenter CLI tool and login with a user in the Ecotek-Corp organization.
```
> npm install -g appcenter-cli
> appcenter login
```

The process for releasing a Codepush build is to push it to the staging environment and then - after it has been tested internally - promote the build to a production build.
Currently there's 2 separate Codepush applications that control the Android and iOS environment. They can be used interchangeably in the following code examples to release for either system.

| *Application*                | *Description*                                             |
|----------------------------|---------------------------------------------------------|
| Ecotek-Corp/Ecoone-Android | This environment will release to all our Android users. |
| Ecotek-Corp/Ecoone-iOS     | This environment will release to all our iOS users.     |

### Releasing
To release a new staging build through Codepush you need to run the following command.
```
> appcenter codepush release-react --app {{APP}}
```

*Note*: If you don't specify the `-m` flag it will not force update for all users.

To promote this build to production, which means it will rollout to our users, you will need to run the following command.
This will release the *latest* `staging` build to `production` meaning that it will be live instantly (with no prompt) for all users
```
> appcenter codepush promote -a {{APP}} -s Staging -d Production
```

To know detail about releasing flow. Please follow this guideline [Relese guidline](./RELEASE_GUIDE.md)

### Rollback
If you wish to rollback a build to a previous state for the `production` environment you can do so with the following command.
This will create a new release that contains the exact code, metadata, and features, of the previous build.
```
> appcenter codepush rollback -a {{APP}} Production
```

## Run Locally (Android)
To run the application locally follow these steps:

1. `git clone` the project.
2. `yarn install`
3. `npm start` (this needs to be running during development but feel free to detach).
4. Launch API server.
5. `adb reverse tcp:3000 tcp:3000` to create a tunnel to localhost API.
6. Launch emulator using Android Studio or plug in device.
7. `react-native run-android` to install application on device. or run some short commands:
```
yarn android # run android app with development environment
yarn android:staging # run android app with staging environment
```

## Run Locally (iOS Simulator only)
To run the application locally follow these steps:
1. `git clone` the project.
2. `yarn install`
3. `npm start`.
4. Launch API server.
5. `react-native run-ios` to install application on IOS simulator.

## Run Staging environment (IOS)
Follow step 1-3 like locally
4. run `yarn ios:staging` to install application on IOS device (both Simulator and real devide)

## Debugging locally
In order to properly debug the application you can use the Chrome debugging interface. You can read [the following article](https://facebook.github.io/react-native/docs/debugging#chrome-developer-tools) to find out more.

## Build Staging
### Android
- run command:
`yarn build:android:staging`
- The apk output file will be located in `android/app/build/outputs/apk/staging/app-staging.apk`
### IOS
- Choose `StagingEcoone` scheme
- Select `Product` => `Archive`

## Build Production
### Android
- run command:
`yarn build:android:production`
- The .apk output file will be located in `android/app/build/outputs/apk/release/app-release.apk`
### IOS
- Choose `ProductionEcoone` scheme
- Select `Product` => `Archive`

## Build Release
### Android
- run command:
`yarn build:android:productionRelease`
- The .aab output file will be located in `android/app/build/outputs/bundle/`
### IOS
- Choose `ProductionEcoone` scheme
- Select `Product` => `Archive`

## Design System
In the future we want to have our own Design System but for now we use [React Native Paper](https://reactnativepaper.com/).

## Redux and Redux Toolkit
[Redux Toolkit documentation](https://redux-toolkit.js.org/tutorials/basic-tutorial)

Redux is well known for having a very verbose API so we have added Redux Toolkit to help solve this issue.
In Redux Toolkit we create **slices** instead of the normal switch-case structure of Redux.
```typescript
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // reducer actions
    setUser(state, action: PayloadAction<UserType>) {
      state.user = action.payload;
    },
    // reducer actions
  },
});
```

To properly use the reducers we can create custom React Hooks that act as an accessor to state values and as a dispatch to state actions.
```typescript
export function useUserState() {
  const userState = useSelector((state: any) => state.user) as UserState;
  const dispatch = useDispatch();
  const actions = {
    // reducer action functions
    setUser: (payload: UserType) =>
      dispatch(userSlice.actions.setUser(payload)),
    // reducer action functions
  };
  return [userState, actions] as [typeof userState, typeof actions];
}
```

To use our custom hook in our component we just require it and use it like any other hook.
```typescript
// imports
import { useUserState } from '../User/reducers';

export default function HomePageScreen(props: LandingScreenProps) {
  // User state
  const [userState, userActions] = useUserState();
  const { user, userLanguage } = userState;

  // User actions
  userActions.setUser(someValue);

  // functions and render
}
```

## Internationalization
In order to provide both Vietnamese and English translations we use i18next.

Since we use functional components and not class based components we have to import  `useTranslation` and grab the i18n instance from there.

```typescript
// Imports
import { useTranslation } from 'react-i18next';

export default function Component(props: any) {
  const { i18n } = useTranslation();

  // component methods and render
}
```

## Deep Linking
Please follow [this article](https://reactnavigation.org/docs/4.x/deep-linking) on how to set up deep linking within the application.

To test the deep link you can run the following command.
```
adb shell am start -W -a android.intent.action.VIEW -d "ecoone://${YOUR_DEEP_LINK}" com.ecoone
```

## Form
Used to get, update and validate value for all fields easy.
We used `react-hook-form` library to support it.

1. Form
- `fields`: is all data you want to get and update. You must define a type class that has all fields in the form
  #####For example:
  A sign-in form has 2 fields: `email` and `password`
  ```
     type SignInFormType {
        email: string
        password: string
     }
  ```
  then you can create new form by `react-form-hook` like this
  ```
    const { register, errors, setValue, handleSubmit } = useForm<SignInFormType>();
  ```
  + `register`: method from `react-hook-form`, used to register fields to form.
  + `errors`: list errors `react-hook-form`. it will include errors of all fields
  + `setValue`: method from `react-hook-form`, used to update when a field is updated value.
  + `handleSubmit` is the function that will give all data of fields in form by a callback
     ```
     handleSubmit((signInFormType: SignInFormType) => {
        // run logic here to do something after clicked submit data of form
     })
     ```
- `props`: there are some props that are needed when using `Form`
  + `children`: this will includes fields. `Form` can have many components that are not a field.
    #####For example:
    ```
    `Form`
         `View` -> it is NOT
            `ImageView` -> it is NOT
            `TextView` -> it is NOT
            `EmailInput` -> it is a field of form
         `PhoneInput` -> it is a field of form
    ```

2. Input
- is the component that hold a field in form. `Input` can be whatever you want to save the field data
- `props`: to become an input, a component will have the following props:
  + `name`: [required] is the name of field. The value of `name` must be same as the field in the form type class. For example type `SignInFormType` has `email` field, so the `EmailInput` must has name `email` also.
  + `rules`: is the rules to validate the field. Please refer to `ValidationRules`
  + `onValueChange`: for custom input, the input will call `onValueChange` when the value changes
  + `onChangeText`: for text input, text input already used it for default. This prop also will be called to update the text changed.

- You can make a new input by your self. Just remember to put your input to the form.

####An example for a Form has 2 fields: `email` and `password` and form type is `SignInFormType`
```
        <Form
          register={register}
          errors={errors}
          setValue={setValue}
        >
          <Input
            name="email"
            rules={PhoneNumberValidation}
          />
          <Text>I am not an input component. But I can still be here...<Text/>
          <Input
            name="password"
            secureTextEntry
            rules={PasswordValidation}
          />
        </Form>
```

You can refer to the link for more info https://react-hook-form.com/

## Firebase tracking
There 3 types of tracking
###1. Screen tracking
- Method 1: Call `Firebase.setScreen` directly
- Method 2: Already called every time when navigate to new screen. Check `AppContainer` for more detail. If you want to modify the screen name, you can put `eventScreenName` to the params of route.
#####For example
```
    BusLanding: {
      screen: BusScreen,
      params: {
        eventScreenName: 'EcobusScreen',
      }
    },
```

###2. Event tracking
Contains 2 params:
  + `eventId`: (required) name of event
  + `eventParams`: (optional) includes `type` and `value` to give more information.
There are 4 methods
- Method 1: Call `Firebase.track(eventId, eventParams)` directly
- Method 2: Put props `eventId` and `eventParams` to clickable components: `Button`, `TouchableComponent`, `IconButton`, `FAB`
- Method 3: If you want to track an event when a screen started, put `eventId` and `eventParams` to the `params` of navigation
  + For example:
  ```
  ChangePasswordScreen: {
        screen: ChangePasswordScreen,
        params: {
          eventId: 'update_password_started', // put it in here
          eventParams: {
             type: 'name',
             value: 'Nha'
          }
        },
        navigationOptions: () => ({
          ...lightNavigationOptions,
          headerTitle: i18n.t('headers.changePassword'),
        }),
      }
  ```
- Method 4: Track after an api is called successfully by put `eventId` and `eventParams` to the `this.request` api function
  For example:
  ```
  this.request<ApiReqType>({
        path: `oauth/revoke`,
        method: 'POST',
        params: {
          token,
        },
        eventId: 'sign_out',
      });
  ```
###3. User tracking
Call `Firebase.setCurrentUser` to update current user

## FCM (Firebase Cloud Messenging) - Push Notification
- `device_token`: each device will be given a `device_token` by FCM. Each installing will have a new `device_token`. This token will be used to receive a notification from Server for FCM api
- `notification`: has 2 types
  + `remote_notification`: can be sent by server or fcm api.
  + `local_notification`: can be push by app.

### Notification flow:
1. Server sends a notification
2. App received a notification:
- When app is in `background`: `remote_notification` will be shown automatically. with the data in `notification`
- When app is in `foreground`: app will handle the data of `notification` then push a `local_notification`
3. Handling a clicked notification
- When app is in `foreground`: function `onNotification` will be called with the data of `notification`
- When app is in `background`: app will be opened after notification clicked. We will get the clicked notification data by function `getInitialNotification`
4. Check the data of clicked notification and navigate to a specific screen
- Notification format:
```
{
  // will be used to show remote_notification automatically
  "notification": {
    "body": "Ecoone notification body",
    "content_available": true,
    "priority": "high",
    "title": "Ecoone notification title"
  },
 // will be used to handle clicked notification
  "data": {
    "id": 1,
    "notification_type": "ecofeedback_ticket_reply"
  }
}
```
- `notification_type` will be used to check what screen will be open when a notification is clickedd
### Notes
- For IOS: app needs user's permission to receive notification.
- Read more about fcm for RN: https://rnfirebase.io/messaging/usage
- Read more about showing the `local_notification` for RN: https://github.com/zo0r/react-native-push-notification

## Fastlane
Notes: only MacOS can build ios because ios is required Xcode to build.
### 1. Setup
####__RubyGems (macOS/Linux/Windows)__
```sudo gem install fastlane -NV```
####__Homebrew (macOS)__
```brew install fastlane```
### 2. Folder conventions
```
├── android
|   ├── fastlane
|   |   └── Fastfile: file includes all lanes for android
|   |   └── metadata: includes all android app information from Google Play Console
|   |   └── key.json: allow fastlane have credential to modify app on Google Play
|   |   └── README.md: explain about all  lanes for android
├── ios
|   ├── fastlane
|   |   └── Fastfile: file includes all lanes for ios
|   |   └── metadata: includes all android app information from Apple Store
|   |   └── README.md: explain about all  lanes for android
```
### 3. Usage

#### Production Release
__If app has NO changes of native code => Skip Step 1 and Step 2, Go Step 3 and run the command, it will do Code Push, otherwise it will upload new build version to App Store__
##### Android
- Step 1: Update  `versionCode` and `versionName` in `android/app/build.gradle` file
- Step 2: Update metadata (app's infomation) in `android/fastlane/metadata`. If you upgrade the `versionCode` you should add a new file to `android/fastlane/metadata/{language_code}/changelogs/{new_version_code}.txt`
- Step 3: run `yarn build:android:production`
##### IOS
- Step 1: Update  `version` and `build` in `General` => `TARGETS` section
- Step 2: Update metadata (app's infomation) in `ios/fastlane/metadata`.
- Step 3: run `yarn build:ios:production`

#### Staging Release
__If app has NO changes of native code => Skip Step 1, Go Step 3 and run the command, it will do Code Push, otherwise it will upload new build version to Firebase Distribution__
##### Android
- Step 1: Update  `versionCode` and `versionName` in `android/app/build.gradle` file
- Step 2: run `yarn build:android:staging`
##### IOS
- Step 1: Update  `version` and `build` in `General` => `TARGETS` section
- Step 2: run `yarn build:ios:production`

#### Other actions
Please go to file [Android Actions Available](android/fastlane/README.md) and [IOS Actions Available](ios/fastlane/README.md) to view all implemented fastlane actions
More information please refer to file `android/fastlane/README.md` and `ios/fastlane/README.md` or document https://docs.fastlane.tools/

## Required Reading
The articles here are included if you want to know more about the design patterns, methodology, and so on, that is applied in this project.

__General__
* [Smart vs Dumb Components](https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43)
* [React Hooks - Continues for multiple pages](https://reactjs.org/docs/hooks-intro.html)

__TypeScript__
* [TypeScript Documentation](https://www.typescriptlang.org/docs/home.html)

__Structure__
* [Structure React Applications](https://jaysoo.ca/2016/02/28/organizing-redux-application/)

**UI**
* [React Native Paper](https://reactnativepaper.com/)
