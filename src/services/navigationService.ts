import { RefObject } from 'react';
import { NavigationActions } from 'react-navigation';

// This service allows navigation outside React components as
// the navigator variable is set as a reference to the `navigate` react-navigation
// component directly within App.tsx
let navigator: RefObject<any>;

function setTopLevelNavigator(navigatorRef: RefObject<any>) {
  navigator = navigatorRef;
}

function navigate(routeName: string, params?: any, key?: any) {
  // @ts-ignore
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
      key: key?.toString() || (params ? JSON.stringify(params) : ''),
    }),
  );
}

function back() {
  // @ts-ignore
  navigator.dispatch(NavigationActions.back());
}

export default {
  navigate,
  setTopLevelNavigator,
  back,
};
