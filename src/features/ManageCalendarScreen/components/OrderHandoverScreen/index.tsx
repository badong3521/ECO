import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Linking,
  Alert,
} from 'react-native';
import Button from 'components/Button';
import { Modalize } from 'react-native-modalize';
import ModalConfirm from 'components/ModalConfirm';
import ConfirmImage from 'assets/profile/ic_confirm_order.svg';
import ConfirmCancelImage from 'assets/profile/ic_confirm_cancel_order.svg';
import IconComponent from 'components/Icon';
import {
  DetailHandoverAppartmentType,
  STATUS_HANDOVER,
  TimeSlotsType,
} from 'features/Csm/types';
import moment from 'moment';
import CSMApi from 'services/api/csm';
import { getDateDDMMYYYY } from 'utils/date';
import Loader from 'components/Loader';
import styles from './style.css';
import ModalChooseTime from '../ModalChooseTime';
import StatusHandoverSimple from '../StatusHandoverSimple';
import { applicationColors } from '../../../../../style.css';
import Header from '../Header';

interface PropTypes {
  navigation: any;
}

const csmApi = new CSMApi();

const OrderHandoverScreen = (props: PropTypes) => {
  const { navigation } = props;

  const id = navigation.getParam('id', null) as string;

  const modalChooseTimeRef = useRef<Modalize>(null);
  const modalConfirmOrderRef = useRef<Modalize>(null);
  const modalConfirmCancelOrderRef = useRef<Modalize>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [chosenTimeSlot, setChosenTimeSlot] = useState<
    TimeSlotsType | undefined
  >(undefined);

  const [detailHandover, setDetailHandover] = useState<
    DetailHandoverAppartmentType | undefined
  >();

  const [convertedTimeSlot, setConvertedTimeSlot] = useState<string>(
    'Chọn thời gian bàn giao',
  );

  const [ordering, setOrdering] = useState<boolean>(false);

  const {
    locationCode,
    zoneName,
    areaName,
    estimatedHandoverDeadline,
    handoverStatus,
    sendingNoticeDate,
    dueDate,
    handoverDeadline,
    customer,
    employee,
    isEnableSurvey,
  } = detailHandover || {};

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      setLoading(true);
      const res = await csmApi.fetchDetailHandover(id);
      if (res.status === 'success') {
        const { data } = res.result;
        setDetailHandover(data);
        if (data.handoverTime) {
          const fromTime = data.handoverTime.trim().split('-')[0];
          const toTime = data.handoverTime.trim().split('-')[1];
          setChosenTimeSlot({ fromTime, toTime });
        }
      } else {
        setDetailHandover(undefined);
      }
      setLoading(false);
    };

    fetchDetail();
  }, [id]);

  useEffect(() => {
    if (chosenTimeSlot) {
      setConvertedTimeSlot(
        `${moment(chosenTimeSlot.fromTime, 'HH:mm:ss').format(
          'HH:mm',
        )} - ${moment(chosenTimeSlot.toTime, 'HH:mm:ss').format('HH:mm')}`,
      );
    }
  }, [chosenTimeSlot]);

  const openModalChooseTime = () => {
    modalChooseTimeRef.current?.open();
  };

  const onPressSave = () => {
    if (chosenTimeSlot) {
      modalConfirmOrderRef.current?.open();
    }
  };

  const onPressCancel = () => {
    modalConfirmCancelOrderRef.current?.open();
  };

  const onPressSurveyButton = () => {
    navigation.navigate('SurveyScreen', { detailHandover });
  };

  const onChooseTimeSlot = (timeSlot?: TimeSlotsType) => {
    setChosenTimeSlot(timeSlot);
  };

  const disabledChooseTime =
    handoverStatus &&
    [
      STATUS_HANDOVER.SCHEDULED,
      STATUS_HANDOVER.SCHEDULED_CONFIRMED,
      STATUS_HANDOVER.NOT_PAYMENT_COMPLETED,
      STATUS_HANDOVER.HANDOVER_READY,
      STATUS_HANDOVER.WAIT_CALENDAR_AGREE,
      STATUS_HANDOVER.HANDOVER_FAILED,
      STATUS_HANDOVER.HANDOVER_SUCCESS,
    ].includes(handoverStatus?.code);

  const disableButtonSave = !chosenTimeSlot;

  const renderHeader = (
    <Header
      title={`Đặt lịch bàn giao ${locationCode || ''}`}
      RightIcon={
        <TouchableOpacity
          style={[
            styles.iconContainer,
            {
              opacity:
                handoverStatus?.code === STATUS_HANDOVER.NOT_SCHEDULE ? 1 : 0,
            },
          ]}
          activeOpacity={0.6}
          disabled={
            handoverStatus?.code !== STATUS_HANDOVER.NOT_SCHEDULE ||
            disableButtonSave
          }
          onPress={onPressSave}
        >
          <IconComponent
            iconPack="feather"
            name="save"
            size={24}
            color={
              disableButtonSave ? '#d3d3d3' : applicationColors.primary.shade900
            }
          />
        </TouchableOpacity>
      }
    />
  );
  const renderTimeSelector = (
    <TouchableOpacity
      onPress={openModalChooseTime}
      style={[
        styles.timeSelect,
        disabledChooseTime && styles.timeSelectDisabled,
      ]}
      disabled={disabledChooseTime}
    >
      <Text
        style={[
          styles.txtTimeSelect,
          disabledChooseTime && styles.txtTimeSelectDisabled,
        ]}
      >
        {convertedTimeSlot}
      </Text>
      {!disabledChooseTime && (
        <IconComponent
          iconPack="feather"
          name="chevron-down"
          color="#999999"
          size={20}
        />
      )}
    </TouchableOpacity>
  );

  const orderHandover = async () => {
    if (chosenTimeSlot?.id) {
      setOrdering(true);
      const res = await csmApi.orderHandover(id, chosenTimeSlot.id);
      if (res.status === 'success') {
        navigation.replace('OrderSuccessScreen', { id });
      } else {
        Alert.alert('Thông báo', 'Đã có lỗi xảy ra');
      }
      setOrdering(false);
    }
  };

  const cancelOrderHandover = async () => {
    setOrdering(true);
    const res = await csmApi.cancelHandover(id);
    if (res.status === 'success') {
      navigation.replace('OrderSuccessScreen', { id });
    } else {
      Alert.alert('Thông báo', 'Đã có lỗi xảy ra');
    }
    setOrdering(false);
  };

  return (
    <View>
      {renderHeader}
      {loading ? (
        <Loader style={styles.loading} />
      ) : (
        <>
          <ScrollView
            style={styles.root}
            contentContainerStyle={styles.containerScrollView}
          >
            <View style={styles.itemComponent}>
              <Text style={styles.title}>Thông tin căn bàn giao</Text>
              <View style={styles.calendarRowDefault}>
                <Text style={styles.leftText}>Trạng thái:</Text>
                {handoverStatus && (
                  <StatusHandoverSimple
                    style={styles.righText}
                    handoverStatus={handoverStatus}
                  />
                )}
              </View>
              <View style={styles.calendarRowDefault}>
                <Text style={styles.leftText}>Vùng/Tòa:</Text>
                <Text style={styles.righText}>{zoneName}</Text>
              </View>
              <View style={styles.calendarRowDefault}>
                <Text style={styles.leftText}>Dự án/Khu vực:</Text>
                <Text style={styles.righText}>{areaName}</Text>
              </View>
              <View style={styles.calendarRowDefault}>
                <Text style={styles.leftText}>Ngày gửi thông báo:</Text>
                <Text style={styles.righText}>
                  {getDateDDMMYYYY(sendingNoticeDate)}
                </Text>
              </View>
              <View style={styles.calendarRowDefault}>
                <Text style={styles.leftText}>Hạn thanh toán:</Text>
                <Text style={styles.righText}>{getDateDDMMYYYY(dueDate)}</Text>
              </View>
              <View style={styles.calendarRowDefault}>
                <Text style={styles.leftText}>Hạn bàn giao:</Text>
                <Text style={styles.righText}>
                  {getDateDDMMYYYY(handoverDeadline)}
                </Text>
              </View>
              <View style={styles.calendarRowDefault}>
                <Text style={styles.leftText}>Ngày BG dự kiến:</Text>
                <Text style={styles.righText}>
                  {getDateDDMMYYYY(estimatedHandoverDeadline)}
                </Text>
              </View>
              <View style={[styles.calendarRowDefault, { marginTop: 9 }]}>
                <Text style={styles.leftText}>Giờ BG dự kiến:</Text>
                {renderTimeSelector}
              </View>
              <Text style={styles.txtNote}>
                Trường hợp quý khách hàng muốn đặt lịch ngoài khung giờ trên,
                vui lòng liên hệ số điện thoại của Chuyên viên bàn giao bên dưới
                để được hỗ trợ.
              </Text>
            </View>
            <View style={styles.itemComponent}>
              <Text style={styles.title}>Thông tin khách hàng</Text>
              <View style={styles.calendarRowDefault}>
                <Text style={styles.leftText}>Khách hàng:</Text>
                <Text style={styles.righText}>{customer?.fullName}</Text>
              </View>
              <View style={styles.calendarRowDefault}>
                <Text style={styles.leftText}>Số điện thoại:</Text>
                <Text style={styles.righText}>{customer?.phoneNumber}</Text>
              </View>
              <View style={styles.calendarRowDefault}>
                <Text style={styles.leftText}>Email:</Text>
                <Text style={styles.righText}>{customer?.email}</Text>
              </View>
            </View>
            <View style={styles.itemComponent}>
              <Text style={styles.title}>
                Thông tin chuyên viên bàn giao liên hệ
              </Text>
              <View style={styles.calendarRowDefault}>
                <Text style={styles.leftText}>CVBG liên hệ:</Text>
                <Text style={styles.righText}>{employee?.fullName}</Text>
              </View>
              <View style={styles.calendarRowDefault}>
                <Text style={styles.leftText}>SĐT:</Text>
                <Text
                  style={styles.righText}
                  onPress={() => {
                    Linking.openURL(`tel:${employee?.phone}`);
                  }}
                >
                  {employee?.phone}
                </Text>
              </View>
            </View>
          </ScrollView>
          {handoverStatus?.code === STATUS_HANDOVER.NOT_SCHEDULE && (
            <View style={styles.buttonsContainer}>
              <Button
                title="Quay lại"
                type="secondary2"
                uppercase={false}
                style={styles.backButton}
                containerStyle={styles.backButtonContainer}
                onPress={() => {
                  navigation.goBack();
                }}
              />
              <Button
                style={styles.backButton}
                title="Lưu lại"
                type="primary"
                uppercase={false}
                containerStyle={styles.saveButtonContainer}
                onPress={onPressSave}
                disable={disableButtonSave}
                loading={ordering}
              />
            </View>
          )}
          {handoverStatus?.code === STATUS_HANDOVER.SCHEDULED && (
            <View style={styles.buttonsContainer}>
              <Button
                style={styles.backButton}
                title="Hủy đặt lịch"
                type="primary"
                uppercase={false}
                containerStyle={styles.saveButtonContainer}
                onPress={onPressCancel}
                loading={ordering}
              />
            </View>
          )}
          {handoverStatus?.code === STATUS_HANDOVER.HANDOVER_SUCCESS &&
            isEnableSurvey && (
              <View style={styles.buttonsContainer}>
                <Button
                  style={styles.backButton}
                  title="Khảo sát bàn giao"
                  type="primary"
                  uppercase={false}
                  containerStyle={styles.saveButtonContainer}
                  onPress={onPressSurveyButton}
                  loading={ordering}
                />
              </View>
            )}
          <ModalChooseTime
            ref={modalChooseTimeRef}
            onChooseTimeSlot={onChooseTimeSlot}
          />
          {handoverStatus?.code === STATUS_HANDOVER.NOT_SCHEDULE && (
            <ModalConfirm
              ref={modalConfirmOrderRef}
              message={`Quý khách có chắc chắn muốn bàn giao căn ${locationCode} lúc ${convertedTimeSlot} ngày ${getDateDDMMYYYY(
                estimatedHandoverDeadline,
              ) || ''} không?`}
              onPressAction={orderHandover}
              title="Xác nhận đặt lịch bàn giao"
              ImageComponent={ConfirmImage}
            />
          )}

          {handoverStatus?.code === STATUS_HANDOVER.SCHEDULED && (
            <ModalConfirm
              ref={modalConfirmCancelOrderRef}
              message={`Quý khách có chắc chắn muốn huỷ lịch bàn giao căn ${locationCode} lúc ${convertedTimeSlot} ngày ${getDateDDMMYYYY(
                estimatedHandoverDeadline,
              ) || ''} không?`}
              onPressAction={cancelOrderHandover}
              title="Xác nhận hủy lịch bàn giao"
              ImageComponent={ConfirmCancelImage}
              buttonLeftTitle="Để sau"
              buttonRightTitle="Xác nhận"
            />
          )}
        </>
      )}
    </View>
  );
};

export default OrderHandoverScreen;
