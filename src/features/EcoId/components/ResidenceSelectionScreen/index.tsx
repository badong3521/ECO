import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import ResidenceCard from './components/ResidenceCard';
import EcoIdApi from '../../../../services/api/ecoId';
import styles from './style.css';
import useStatusBar from '../../../../utils/hooks/useStatusBar';
import { fetchResidenceScreenProps } from '../../../../utils/ecoId';
import { ResidentType } from '../../../../services/api/types/ecoid';

interface PropTypes {
  navigation: any;
}

export default function ResidenceSelectionScreen(props: PropTypes) {
  const { navigation } = props;
  const ecoIdApi = new EcoIdApi();
  const [residences, setResidences] = useState<ResidentType[]>(
    navigation.state.params?.residences,
  );
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchHouseholds() {
    setLoading(true);
    const res = await ecoIdApi.fetchResidences();
    setLoading(false);
    if (res.status === 'success') {
      setResidences(res.result.data);
    }
  }

  useStatusBar('dark-content');

  return (
    <FlatList
      style={styles.container}
      keyExtractor={({ residentId }) => residentId.toString()}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      refreshing={loading}
      onRefresh={fetchHouseholds}
      data={residences}
      renderItem={({ item }) => (
        <ResidenceCard
          resident={item}
          onPress={async () => {
            const residenceScreenProps = await fetchResidenceScreenProps(
              item.residentId,
              navigation,
            );
            if (residenceScreenProps) {
              navigation.navigate('ResidenceScreen', residenceScreenProps);
            }
          }}
        />
      )}
    />
  );
}
