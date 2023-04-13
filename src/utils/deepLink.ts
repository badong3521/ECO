import dynamicLinks from '@react-native-firebase/dynamic-links';
import Config from 'react-native-config';

const REDIRECT_LINK = 'https://apps.apple.com/vn/app/ecoone/id1519364288';
// get this from Firebase console
const DOMAIN_URI_PREFIX = 'https://ecoone.page.link';

// eslint-disable-next-line import/prefer-default-export
export async function buildLink(
  title: string,
  description: string,
  // image has to be at least 300x200px and <300KB to display
  // https://firebase.google.com/docs/dynamic-links/link-previews
  image: string,
  param: string,
) {
  const link = await dynamicLinks().buildShortLink({
    link: `${REDIRECT_LINK}?${param}`,
    // domainUriPrefix is created in your Firebase console
    domainUriPrefix: DOMAIN_URI_PREFIX,
    android: {
      packageName: Config.ANDROID_APPLICATION_ID || 'com.ecoone', // we need code push to hotfix but new changes of Config can not use codepush, so we will use production appId if has no new config
    },
    ios: {
      bundleId: Config.IOS_APPLICATION_ID || 'ecoone.com',
    },
    social: {
      imageUrl: image,
      descriptionText: removeHtmlTag(description).substr(0, 500), // the description maybe too long
      title,
    },
  });
  return link;
}

function removeHtmlTag(text: string): string {
  return text ? text.replace(/(<([^>]+)>)/gi, '') : '';
}
