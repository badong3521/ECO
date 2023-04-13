import React, { useEffect } from 'react';
import { Platform, TouchableWithoutFeedback, View } from 'react-native';
import Interactable, { IDragEvent } from 'react-native-interactable';
import { ListLanguages, useUserState } from '../../features/User/reducers';
import Text from '../Text';
import styles, { languageButtonSize } from './style.css';

// Component that allows a user to switch between languages
export default function LanguageToggle() {
  const [state, actions] = useUserState();
  const toggleButtonRef = React.useRef<any>();

  function onToggleLanguage() {
    actions.setUserLanguage(state.userLanguage === 'en' ? 'vn' : 'en');
  }

  function onSnapLanguage(event: IDragEvent) {
    if (event.nativeEvent.state === 'start') {
      actions.setUserLanguage(event.nativeEvent.x === 0 ? 'vn' : 'en');
    }
  }

  useEffect(() => {
    toggleButtonRef?.current?.snapTo({
      index: state.userLanguage === 'en' ? 0 : 1,
    });
  }, [state.userLanguage, toggleButtonRef?.current]);

  return (
    <View style={styles.root}>
      <TouchableWithoutFeedback onPress={onToggleLanguage}>
        <View style={styles.bgLanguage}>
          {ListLanguages.map(l => {
            return (
              <Text fontSize="tiny" style={styles.language} key={l}>
                {l.toString().toUpperCase()}
              </Text>
            );
          })}
        </View>
      </TouchableWithoutFeedback>
      <Interactable.View
        ref={toggleButtonRef}
        style={styles.floatingContainer}
        horizontalOnly
        boundaries={{
          left: 0,
          bounce: 0,
          right: languageButtonSize,
        }}
        initialPosition={
          Platform.OS === 'android'
            ? undefined
            : {
                x: state.userLanguage === 'en' ? 0 : languageButtonSize,
              }
        }
        onDrag={onSnapLanguage}
        snapPoints={[{ x: 0 }, { x: languageButtonSize }]}
      >
        <TouchableWithoutFeedback onPress={onToggleLanguage}>
          <View style={styles.floating}>
            <Text bold="bold" fontSize="tiny" style={styles.floatingText}>
              {state.userLanguage.toString().toUpperCase()}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </Interactable.View>
    </View>
  );
}
