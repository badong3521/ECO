import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Button from 'components/Button';
import navigationService from 'services/navigationService';
import { HandoverAppartmentType, STATUS_HANDOVER } from 'features/Csm/types';
import moment from 'moment';
import { getDateDDMMYYYY } from 'utils/date';
import styles from './style.css';
import StatusCalendar from '../StatusHandover';

type Props = {
  item: HandoverAppartmentType;
};

const HandoverAppartmentItem = ({ item }: Props) => {
  const {
    id,
    locationCode,
    zoneName,
    areaName,
    customerName,
    handoverTime,
    estimatedHandoverDeadline,
    employeeContact,
    handoverStatus,
  } = item;

  const onPress = () => {
    navigationService.navigate('OrderHandoverScreen', { id });
  };

  const timeSlot = handoverTime?.trim().split('-');

  return (
    <TouchableOpacity
      style={styles.cardCalendar}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.calendarRow1}>
        <Text style={styles.txtName}>{locationCode}</Text>
        <StatusCalendar handoverStatus={handoverStatus} />
      </View>
      <View style={styles.calendarRowDefault}>
        <Text style={styles.leftText}>Vùng/Tòa:</Text>
        <Text style={styles.righText}>{zoneName}</Text>
      </View>
      <View style={styles.calendarRowDefault}>
        <Text style={styles.leftText}>Dự án/Khu vực:</Text>
        <Text style={styles.righText}>{areaName}</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.calendarRowDefault}>
        <Text style={styles.leftText}>Khách hàng:</Text>
        <Text style={styles.righText}>{customerName}</Text>
      </View>
      <View style={styles.calendarRowDefault}>
        <Text style={styles.leftText}>Giờ bàn giao dự kiến:</Text>
        {Array.isArray(timeSlot) && (
          <Text style={styles.righText}>
            {`${moment(timeSlot[0], 'HH:mm:ss').format('HH:mm')} - ${moment(
              timeSlot[1],
              'HH:mm:ss',
            ).format('HH:mm')}`}
          </Text>
        )}
      </View>
      <View style={styles.calendarRowDefault}>
        <Text style={styles.leftText}>Ngày bàn giao dự kiến:</Text>
        <Text style={styles.righText}>
          {getDateDDMMYYYY(estimatedHandoverDeadline)}
        </Text>
      </View>
      <View style={styles.calendarRowDefault}>
        <Text style={styles.leftText}>CVBG liên hệ:</Text>
        <Text style={styles.righText}>{employeeContact?.name}</Text>
      </View>
      <View style={styles.calendarRowDefault}>
        <Text style={styles.leftText}>SĐT CVBG liên hệ:</Text>
        <Text style={styles.righText}>{employeeContact?.phoneNumber}</Text>
      </View>
      {handoverStatus.code === STATUS_HANDOVER.NOT_SCHEDULE && (
        <Button
          title="Đặt lịch bàn giao"
          onPress={onPress}
          type="primary"
          style={styles.buttonOrder}
          uppercase={false}
        />
      )}
    </TouchableOpacity>
  );
};

export default HandoverAppartmentItem;
