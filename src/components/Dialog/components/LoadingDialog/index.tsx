import React, {
  RefObject,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { BackHandler, TouchableWithoutFeedback, View } from 'react-native';
import { Portal } from 'react-native-paper';
import AnimatedLottieView from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
import Heading from '../../../Heading';
import styles from './style.css';
import Button from '../../../Button';
import Text from '../../../Text';
import IconComponent from '../../../Icon';

const LOADING_DOTS = require('../../../../assets/animation/loading_dots.json');

export interface LoadingDialogRef {
  show: (props: LoadingDialogType) => void;
  showError: (props: LoadingDialogType) => void;
  dismiss: () => void;
}

export interface LoadingDialogType {
  title?: string;
  dismissible?: boolean;
  error?: string | any;
  onGoBackPress?: () => void;
  buttonTitle?: string;
}

interface LoadingDialogProps {
  dialogRef: RefObject<LoadingDialogRef>;
}

// use this component for full page loader
export default function LoadingDialog(props: LoadingDialogProps) {
  const { dialogRef } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState<LoadingDialogType>({});
  const { title, dismissible, error, onGoBackPress, buttonTitle } = data;
  const i18n = useTranslation();

  useImperativeHandle(
    dialogRef,
    (): LoadingDialogRef => ({
      show: (prs: LoadingDialogType) => {
        setData(prs);
        setVisible(true);
      },
      dismiss: () => {
        if (visible) {
          setVisible(false);
        }
      },
      showError: (prs: LoadingDialogType) => {
        setData(prs);
        setVisible(true);
      },
    }),
  );

  function onBackPressHandler() {
    if (dismissible) {
      setVisible(false);
    }
    return true;
  }

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (visible) {
      BackHandler.addEventListener('hardwareBackPress', onBackPressHandler);
      return () =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onBackPressHandler,
        );
    }
  }, [dismissible, visible]);

  return visible ? (
    <Portal>
      <TouchableWithoutFeedback
        onPress={() => {
          if (dismissible) {
            setVisible(false);
          }
        }}
      >
        <View style={styles.container}>
          {title && (
            <Heading bold="bold" size="h1" style={styles.title}>
              {title}
            </Heading>
          )}
          {!error && (
            <View style={styles.animation}>
              <AnimatedLottieView source={LOADING_DOTS} autoPlay />
            </View>
          )}
          {error && (
            <View style={styles.errorContainer}>
              <IconComponent size={40} name="warning" />
              <Text bold="bold" style={styles.error}>
                {error}
              </Text>
              <Button
                type="primary"
                style={styles.goBack}
                title={buttonTitle || i18n.t('actions.goBack')}
                uppercase={false}
                onPress={() => {
                  setVisible(false);
                  if (onGoBackPress) {
                    onGoBackPress();
                  }
                }}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Portal>
  ) : (
    <View />
  );
}
