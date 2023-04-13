import { Animated, Dimensions, Easing, Platform } from 'react-native';
import Interactable, { ISnapEvent } from 'react-native-interactable';
import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../style.css';
import Text from '../../../../../../components/Text';
import AnimatedPromotionIcon from '../AnimatedPromotionIcon';
import { applicationColors } from '../../../../../../../style.css';
import i18n from '../../../../../../i18n';
import { RedeemType } from '../../../../../../services/api/types/card';
import { getDateTimeHHmmDDMMYYYY } from '../../../../../../utils/date';
import DashedLine from '../../../../../../components/DashedLine';

const redeemButtonWidth = Dimensions.get('screen').width - 117;
const redeemSnapRightIndex = redeemButtonWidth * 1.4;
const damping = 0.65;
const redeemedMarginTop = 12; // the space between the top and the bottom card if redeemed
const boundariesBouncing = Platform.OS === 'ios' ? 0.3 : 0;

interface BottomPromotionCardProps {
  onSlideToRedeem: () => void;
  redeemedAt?: RedeemType;
  redeemButtonRef: React.RefObject<any>;
}

// The bottom component of promotion card
export default function BottomPromotionCard(props: BottomPromotionCardProps) {
  const { onSlideToRedeem, redeemedAt, redeemButtonRef } = props;
  const slideAnimation = new Animated.Value(0);
  const marginTopAnimation = new Animated.Value(0);

  function onRedeemButtonSnap(event: ISnapEvent) {
    if (!redeemedAt && event.nativeEvent.index === 1) {
      onSlideToRedeem();
    }
  }

  const slideColorInterpolation = (inputColor: string, outputColor: string) =>
    slideAnimation.interpolate({
      inputRange: [0, redeemButtonWidth],
      outputRange: [inputColor, outputColor],
      extrapolateRight: 'clamp',
    });

  // animate the components if already redeemed
  useEffect(() => {
    if (redeemedAt) {
      Animated.timing(marginTopAnimation, {
        duration: 500,
        toValue: redeemedMarginTop,
        easing: Easing.elastic(1),
      }).start();
      Animated.timing(slideAnimation, {
        duration: 300,
        toValue: redeemButtonWidth,
      }).start();
      // snap to right automatically
      redeemButtonRef.current!.snapTo({ index: 1 });
    }
  }, [redeemedAt]);

  return (
    <Animated.View
      style={[
        styles.bottomContainer,
        {
          backgroundColor: slideColorInterpolation(
            applicationColors.primary.white,
            applicationColors.neutral.shade300,
          ),
          transform: [
            {
              translateY: marginTopAnimation.interpolate({
                inputRange: [0, redeemedMarginTop],
                outputRange: [0, redeemedMarginTop],
              }),
            },
          ],
        },
      ]}
    >
      <DashedLine
        type="top"
        interpolate={slideColorInterpolation(
          applicationColors.neutral.shade300,
          applicationColors.neutral.shade900,
        )}
        style={styles.dash}
      />

      <Text fontSize="small" style={styles.bottomDescription}>
        {i18n.t('features.cardScreen.useRedeemDescription')}
      </Text>

      <Animated.View
        style={[
          styles.slideContainer,
          {
            backgroundColor: slideColorInterpolation(
              applicationColors.secondary.shade500,
              applicationColors.neutral.shade900,
            ),
          },
        ]}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.2)']}
          start={{ x: 0, y: 0.2 }}
          end={{ x: 0, y: 0 }}
          style={styles.innerShadow}
        />

        <Text style={styles.slideToRedeem} bold="bold">
          {i18n.t(
            redeemedAt
              ? 'features.cardScreen.redeemed'
              : 'features.cardScreen.slideToRedeem',
          )}
        </Text>
        {redeemedAt && (
          <Text style={styles.redeemedAt} fontSize="small">
            {`${i18n.t(
              'features.cardScreen.redeemedAt',
            )}${getDateTimeHHmmDDMMYYYY(new Date(redeemedAt.redeemedAt))}`}
          </Text>
        )}

        <Interactable.View
          ref={redeemButtonRef}
          dragEnabled={!redeemedAt}
          style={styles.promotionButton}
          horizontalOnly
          onSnapStart={onRedeemButtonSnap}
          animatedValueX={slideAnimation}
          boundaries={{
            left: 0,
            right: redeemButtonWidth,
            bounce: boundariesBouncing,
          }}
          snapPoints={[
            { x: 0, damping },
            { x: redeemSnapRightIndex, damping },
          ]}
        >
          <AnimatedPromotionIcon
            value={slideAnimation}
            interpolate={slideColorInterpolation(
              applicationColors.secondary.shade500,
              applicationColors.neutral.shade900,
            )}
          />
        </Interactable.View>
      </Animated.View>
    </Animated.View>
  );
}
