import { Alert, Linking, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import FastImage from 'react-native-fast-image';
import CSMApi from 'services/api/csm';
import Loader from 'components/Loader';
import styles from './style.css';
import Button from '../../../../components/Button';
import { applicationColors } from '../../../../../style.css';
import Text from '../../../../components/Text';

const SUCCESS_LOGO = require('../../../../assets/helpDesk/png/create_success_logo.png');

interface OrderSuccessScreenProps {
  navigation: any;
}

const EMAIL_HANDOVER = 'bangiao@ecopark.com.vn';

const csmApi = new CSMApi();

export default function OrderSuccessScreen(props: OrderSuccessScreenProps) {
  const { navigation } = props;
  const id: string = navigation.getParam('id');
  const sendEmail: boolean = navigation.getParam('sendEmail', false);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (sendEmail) {
      const sendEmailRequest = async () => {
        setLoading(true);
        const result = await csmApi.sendEmailAfterSurvey(id);
        if (result.status === 'success') {
          setLoading(false);
        } else {
          Alert.alert('Thông báo', 'Đã có lỗi xảy ra');
        }
      };
      sendEmailRequest();
    }
  }, []);

  if (loading) {
    return <Loader style={styles.loader} />;
  }

  return (
    <View style={styles.root}>
      <FastImage
        source={SUCCESS_LOGO}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text bold="bold" style={styles.title} fontSize="large">
        Đã gửi thành công!
      </Text>
      {!sendEmail && (
        <Text style={styles.title}>
          Mọi ý kiến đóng góp (nếu có), Quý Cư dân vui lòng chuyển về cho chúng
          tôi qua địa chỉ hòm thư{' '}
          <Text
            style={styles.email}
            onPress={() => {
              Linking.openURL(`mailto:${EMAIL_HANDOVER}`);
            }}
          >
            {EMAIL_HANDOVER}
          </Text>{' '}
          hoặc liên lạc trực tiếp qua số điện thoại của Chuyên viên bàn giao để
          được hỗ trợ và giải đáp kịp thời.
        </Text>
      )}
      <Button
        type="primary"
        title="Trang chủ"
        onPress={() => {
          navigation.navigate('ManageCalendarScreen');
        }}
        uppercase={false}
        style={styles.button}
      />
      <Button
        type="secondary"
        title="Xem chi tiết"
        onPress={() => {
          navigation.goBack();
          navigation.replace('OrderHandoverScreen', { id });
        }}
        uppercase={false}
        color={applicationColors.semantic.error.shade500}
        style={styles.button}
      />
    </View>
  );
}
