import { View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Text from '../../../../../../components/Text';
import styles from './style.css';
import { ResidentType } from '../../../../../../services/api/types/ecoid';

interface PropTypes {
  members: ResidentType[];
}

export default function HouseholdMemberList(props: PropTypes) {
  const { members } = props;
  const { i18n } = useTranslation();
  return (
    <View>
      <Text bold="bold" style={styles.sectionTitle}>
        {i18n.t('features.ecoId.ecoIdHouseholdScreen.householdMembers')}
      </Text>
      {members.map((member: ResidentType, index: number) => (
        <View
          key={member.residentId}
          style={[
            styles.memberListItem,
            {
              borderTopWidth: index === 0 ? 1 : 0,
            },
          ]}
        >
          <Text>{member.fullName}</Text>
        </View>
      ))}
    </View>
  );
}
