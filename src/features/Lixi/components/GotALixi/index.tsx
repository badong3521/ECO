import React, { useEffect } from 'react';
import { Animated, Easing, ScrollView, View } from 'react-native';
import Share from 'react-native-share';
import FastImage from 'react-native-fast-image';
import ViewShot from 'react-native-view-shot';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Text from '../../../../components/Text';
import ButtonSvg from '../../../../assets/lixi/button.svg';
import styles from './style.css';
import { CardType } from '../../../../components/Card/types';
import UserInformationBar from '../../../../components/UserInformationBar';
import DateUtils from '../../../../utils/date';
import BounceView from '../../../../components/BounceView';
import HTMLView from '../../../../components/HTMLView';

const BACKGROUND = require('../../../../assets/lixi/background.png');
const PATTERN = require('../../../../assets/lixi/pattern.png');
const LIXI_BACKGROUND = require('../../../../assets/lixi/lixi_background.png');
const VOUCHER_BACKGROUND = require('../../../../assets/lixi/voucher_background.png');
const OPEN_GIFT = require('../../../../assets/lixi/open_gift.png');

interface GotALixiScreenProps {
  navigation: any;
}

// Show the result after open lixi box: result maybe a message or a voucher
export default function GotALixiScreen(props: GotALixiScreenProps) {
  const { navigation } = props;
  const i18n = useTranslation();
  const card: CardType = navigation.getParam('card');
  const viewShotRef = React.createRef<ViewShot>();
  const contentAnimated = new Animated.Value(0);
  const textAnimated = new Animated.Value(-200);

  // share screenshot of lixi result
  async function onSharePress() {
    if (viewShotRef.current) {
      const uri = await viewShotRef.current.capture();
      await Share.open({ url: uri });
    }
  }

  function onMerchantPress() {
    navigation.navigate('CardScreen', {
      card: {
        ...card.merchant?.profileCard,
        type: 'CardMerchant',
      },
    });
  }

  function runLixiAnimation() {
    Animated.timing(contentAnimated, {
      toValue: 1,
      duration: 700,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start();
    Animated.timing(textAnimated, {
      toValue: 0,
      duration: 1000,
      easing: Easing.elastic(0.3),
      useNativeDriver: true,
    }).start();
  }

  useEffect(() => {
    runLixiAnimation();
  }, []);

  return (
    <ViewShot ref={viewShotRef}>
      <View style={styles.root}>
        <FastImage source={BACKGROUND} style={styles.background} />
        <FastImage source={PATTERN} style={styles.pattern} resizeMode="cover" />
        <Animated.View
          style={[
            styles.congratulationContainer,
            {
              transform: [
                {
                  translateY: textAnimated,
                },
              ],
            },
          ]}
        >
          <Text fontSize="large" style={styles.congratulation} bold="bold">
            {getTitle(i18n, card)}
          </Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.content,
            {
              transform: [
                {
                  scale: contentAnimated,
                },
              ],
            },
          ]}
        >
          <FastImage
            source={card ? VOUCHER_BACKGROUND : LIXI_BACKGROUND}
            style={styles.lixiBackground}
            resizeMode="contain"
          />
          <FastImage
            source={OPEN_GIFT}
            style={styles.openGift}
            resizeMode="contain"
          />
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {card?.merchant && (
              <View style={styles.avatarContainer}>
                <UserInformationBar
                  avatar={card.merchant.logo}
                  name={card.merchant.name}
                  onClick={onMerchantPress}
                />
              </View>
            )}
            <Text bold="bold" style={styles.title}>
              {card
                ? card.title
                : i18n.t('features.lixiOnboarding.luckyMessage.title')}
            </Text>
            <HTMLView
              html={card ? card.description : getLuckyMessage(i18n)}
              containerStyle={styles.description}
              fontStyle={styles.descriptionFont}
              scrollable={false}
            />
          </ScrollView>

          {card && (
            <View style={styles.expireContainer}>
              <Text style={styles.expire} fontSize="small">
                {i18n.t('features.directory.promotions.expiredAt')}
                {card.expiry && (
                  <Text style={styles.expiredDate} fontSize="small">
                    {` ${DateUtils.getDateString(
                      card.expiry,
                      DateUtils.MOMENT_FORMATS.FULL_DATE,
                    )}`}
                  </Text>
                )}
              </Text>
            </View>
          )}
          <View style={styles.buttonContainer}>
            <BounceView
              pressedScale={0.8}
              style={styles.button}
              onPress={onSharePress}
            >
              <View style={styles.bounceView}>
                <ButtonSvg />
                <Text bold="bold" style={styles.share}>
                  {i18n.t('actions.share')}
                </Text>
              </View>
            </BounceView>
          </View>

          <View style={styles.closed}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={styles.closedText} bold="bold">
                {i18n.t('actions.close')}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </ViewShot>
  );
}

function getLuckyMessage(i18n: UseTranslationResponse): string {
  const index = Math.floor(Math.random() * 10) % 3;
  return i18n.t(`features.lixiOnboarding.luckyMessage.${index + 1}`);
}

function getTitle(i18n: UseTranslationResponse, card: CardType) {
  if (card) {
    if (card.promotion?.promotionType === 'lixi') {
      return i18n.t('features.lixiOnboarding.gotLixi');
    }
    if (card.promotion?.promotionType === 'gift') {
      return i18n.t('features.lixiOnboarding.gotGift');
    }
    return i18n.t('features.lixiOnboarding.gotVoucher', {
      merchant: card.merchant?.name ?? '',
    });
  }
  return i18n.t('features.lixiOnboarding.gotLucky');
}
