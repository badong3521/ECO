import { Alert, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.css';
import { CardType } from '../../../../components/Card/types';
import BottomPromotionCard from './components/BottomPromotionCard';
import TopPromotionCard from './components/TopPromotionCard';
import CardApi from '../../../../services/api/card';
import { RedeemType } from '../../../../services/api/types/card';
import { applicationColors } from '../../../../../style.css';
import DialogManager from '../../../../components/Dialog/manager';

interface CardDescriptionPromotionProps {
  card: CardType;
  onPressMerchant: (merchantCardId: number) => void;
}

// Render the description of a card where type is "CardMasonryPromotion"
export default function CardDescriptionPromotion(
  props: CardDescriptionPromotionProps,
) {
  const { card, onPressMerchant } = props;
  const i18n = useTranslation();
  const redeemButtonRef = React.createRef();
  const cardApi = new CardApi();
  const [redeemedAt, setRedeemedAt] = useState<RedeemType>();

  function onMerchantProfilePress() {
    onPressMerchant(card.merchant?.profileCard.id!);
  }

  function showConfirmRedeemDialog() {
    DialogManager.showConfirmDialog({
      title: i18n.t('features.cardScreen.confirmRedeemTitle'),
      confirmTitle: i18n.t('actions.yes'),
      onDismiss: onDismissToRedeem,
      onConfirmPress,
      returnTitle: i18n.t('actions.no'),
      confirmColor: applicationColors.primary.shade900,
    });
  }

  async function onConfirmPress() {
    const response = await cardApi.redeemCard(card.id);
    if (response.status === 'success') {
      setRedeemedAt(response.result.data);
    } else {
      Alert.alert('', response.errors.toString());
    }
  }

  function onDismissToRedeem() {
    // @ts-ignore
    redeemButtonRef.current!.snapTo({ index: 0 });
  }

  async function fetchRedeemedCard() {
    const res = await cardApi.fetchRedeemCard(card.id);
    if (res.status === 'success' && res.result.data.length > 0) {
      setRedeemedAt(res.result.data[0]);
    }
  }

  useEffect(() => {
    fetchRedeemedCard();
  }, []);

  return (
    <View style={styles.container}>
      <TopPromotionCard
        card={card}
        onMerchantProfilePress={onMerchantProfilePress}
      />

      <BottomPromotionCard
        onSlideToRedeem={showConfirmRedeemDialog}
        redeemedAt={redeemedAt}
        redeemButtonRef={redeemButtonRef}
      />
    </View>
  );
}
