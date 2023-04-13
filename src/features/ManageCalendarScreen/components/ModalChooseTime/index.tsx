import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useState,
} from 'react';

import { Dimensions, FlatList, View, Text } from 'react-native';
import Button from 'components/Button';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';

import { getStatusBarHeight } from 'utils/statusBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CSMApi from 'services/api/csm';
import { TimeSlotsType } from 'features/Csm/types';
import moment from 'moment';
import Loader from 'components/Loader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './style.css';

const csmApi = new CSMApi();

interface ModalChooseTimeProps {
  onChooseTimeSlot: (timeSlot?: TimeSlotsType) => void;
}

const ModalChooseTime: ForwardRefRenderFunction<
  Modalize,
  ModalChooseTimeProps
> = ({ onChooseTimeSlot }: ModalChooseTimeProps, ref) => {
  const insets = useSafeAreaInsets();

  const [timeSlots, setTimeSlots] = useState<TimeSlotsType[]>([]);
  const [chosenTimeSlot, setChosenTimeSlot] = useState<
    TimeSlotsType | undefined
  >(undefined);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchListTimeSlots();
  }, []);

  async function fetchListTimeSlots() {
    setLoading(true);
    const res = await csmApi.fetchListTimeSlots();
    setTimeSlots(res.status === 'success' ? res.result.data : []);
    setLoading(false);
  }

  const renderTimeItem = ({ item }: { item: TimeSlotsType }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={[
          styles.timeItem,
          item.fromTime === chosenTimeSlot?.fromTime &&
            item.toTime === chosenTimeSlot?.toTime &&
            styles.timeChosenItem,
        ]}
        onPress={() => {
          setChosenTimeSlot(item);
        }}
      >
        <Text style={styles.txtTimeSlot}>
          {moment(item.fromTime, 'HH:mm:ss').format('HH:mm')} -{' '}
          {moment(item.toTime, 'HH:mm:ss').format('HH:mm')}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Portal>
      <Modalize
        ref={ref}
        modalHeight={
          (Dimensions.get('window').height - getStatusBarHeight()) * 0.76
        }
        handlePosition="inside"
        disableScrollIfPossible
        tapGestureEnabled={false}
        closeSnapPointStraightEnabled
        modalStyle={styles.modalStyle}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        panGestureComponentEnabled
        HeaderComponent={
          <>
            <Text style={styles.headerModal}>Chọn khung giờ bàn giao</Text>
            <View style={styles.line} />
          </>
        }
        FooterComponent={
          <View
            style={[
              styles.buttonsContainer,
              { paddingBottom: 16 + insets.bottom },
            ]}
          >
            <TouchableOpacity
              containerStyle={styles.backButtonContainer}
              onPress={() => {
                ref.current?.close();
              }}
              activeOpacity={0.8}
            >
              <Button
                title="Quay lại"
                type="secondary2"
                uppercase={false}
                style={styles.backButton}
              />
            </TouchableOpacity>
            <TouchableOpacity
              containerStyle={styles.saveButtonContainer}
              onPress={() => {
                onChooseTimeSlot(chosenTimeSlot);
                ref.current?.close();
              }}
              activeOpacity={0.8}
            >
              <Button
                style={styles.backButton}
                title="Xác nhận"
                type="primary"
                uppercase={false}
              />
            </TouchableOpacity>
          </View>
        }
      >
        {loading && <Loader />}
        <FlatList
          data={timeSlots}
          renderItem={renderTimeItem}
          contentContainerStyle={[
            {
              paddingBottom: 90 + insets.bottom,
            },
            styles.contentContainerStyle,
          ]}
          ListFooterComponent={() => (
            <Text style={styles.note}>
              Trường hợp quý khách hàng muốn đặt lịch ngoài khung giờ trên, vui
              lòng liên hệ số điện thoại của Chuyên viên bàn giao để được hỗ
              trợ.
            </Text>
          )}
        />
      </Modalize>
    </Portal>
  );
};

export default forwardRef<Modalize, ModalChooseTimeProps>(ModalChooseTime);
