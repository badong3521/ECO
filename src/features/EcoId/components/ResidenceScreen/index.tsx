import React, { useState } from 'react';
import { View } from 'react-native';
import Text from '../../../../components/Text';
import Heading from '../../../../components/Heading';
import StickyHeaderScrollView from '../../../../components/StickyHeaderScrollView';
import { useUserState } from '../../../User/reducers';
import CurvedCoverPhoto from '../../../../components/CurvedCoverPhoto';
import useStatusBar from '../../../../utils/hooks/useStatusBar';
import styles from './style.css';
import BillInfoCard from './components/BillInfoCard';
import HouseholdMemberList from './components/HouseholdMemberList';
import useOnFocused from '../../../../utils/hooks/useOnFocused';
import { fetchTotalAmount } from '../../../../utils/ecoId';

const HEADER_IMAGE_HEIGHT = 300;

interface PropTypes {
  navigation: any;
}

export default function ResidenceScreen(props: PropTypes) {
  const { navigation } = props;
  const { residence, totalBill, nextBill } = navigation.state.params;
  const [currentBill, setCurrentBill] = useState<[number, Date | undefined]>([
    totalBill,
    nextBill,
  ]);

  const [userState] = useUserState();
  const { userLanguage } = userState;

  useStatusBar('light-content');

  function onPaymentPress() {
    navigation.navigate('EcoIdPreparePaymentScreen', {
      residence,
    });
  }

  async function fetchCurrentBills() {
    const res = await fetchTotalAmount(residence.residentId);
    setCurrentBill(res);
  }

  // fetch current bills again when this screen is focused
  useOnFocused(navigation, () => fetchCurrentBills());

  return (
    <View style={styles.root}>
      <StickyHeaderScrollView
        paddingTop={50}
        title={`${residence.areaName} - ${residence.locationCode}`}
        maxScrollOffset={HEADER_IMAGE_HEIGHT}
        onBackPress={() => navigation.goBack()}
        headerImage={
          <CurvedCoverPhoto uri={residence.banner} style={styles.coverImage} />
        }
        headerImageStyle={styles.headerImage}
        headerImageHeight={HEADER_IMAGE_HEIGHT}
      >
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <View style={styles.header}>
              <Text fontSize="large" style={styles.areaName}>
                {residence.areaName}
              </Text>
              <Heading size="h2" bold="bold" style={styles.text}>
                {residence.locationCode}
              </Heading>
            </View>
          </View>
          <BillInfoCard
            totalBill={currentBill[0]}
            nextBill={currentBill[1]}
            userLanguage={userLanguage}
            onPaymentPress={onPaymentPress}
            onPaymentHistoryPress={() =>
              navigation.navigate('EcoIdPaymentHistoryScreen', {
                residenceId: residence.residentId,
              })
            }
          />
          <HouseholdMemberList members={residence.members} />
        </View>
      </StickyHeaderScrollView>
    </View>
  );
}
