import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import Text from '../../components/Text';
import TouchableComponent from '../../components/TouchableComponent';
import { applicationColors, applicationDimensions } from '../../../style.css';
import IconComponent from '../../components/Icon';
import ReadMoreText from './ReadMoreText';
import NotificationApi from '../../services/api/notification';
import { Notification } from '../../services/api/types/notification';
import { useUserState } from '../User/reducers';
import { handleNotification } from '../../utils/notification';
import Loader from '../../components/Loader';
import styles from './style.css';
import useStatusBar from '../../utils/hooks/useStatusBar';
import NotificationEmpty from '../../assets/notification/empty.svg';
import Avatar from '../../components/Avatar';

// A history of all notifications sent to a user
export default function NotificationScreen() {
  const notificationApi = new NotificationApi();
  const [notifications, setNotifications] = useState<Notification[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [userState] = useUserState();
  const { userLanguage } = userState;
  const i18n = useTranslation();

  async function fetchNext() {
    if (currentPage < totalPage) {
      setLoading(true);
      const res = await notificationApi.fetchNotifications(currentPage + 1);
      setLoading(false);
      if (res.status === 'success') {
        setCurrentPage(currentPage + 1);
        setNotifications([...notifications!, ...res.result.data]);
      }
    }
  }

  async function onRefresh() {
    setRefreshing(true);
    const res = await notificationApi.fetchNotifications();
    setRefreshing(false);
    if (res.status === 'success') {
      setNotifications(res.result.data);
      setTotalPage(res.result.totalPages);
      setCurrentPage(1);
    } else {
      setNotifications([]);
    }
  }

  function onNotificationPress(item: any, index: number) {
    if (notifications) {
      const newArray: Notification[] = notifications.map((data, i) => {
        if (i === index) {
          return {
            ...data,
            status: 'read',
          };
        }
        return data;
      });
      setNotifications(newArray);
    }
    switch (item.redirectTo) {
      case 'app_ecofeedback':
      case 'web_econnect':
      case 'app_announcement':
      case 'app_rating':
      case 'vaccine_registration_list':
      case 'app_bus_card':
        handleNotification(item);
        break;
      case 'app_card':
        handleNotification({
          ...item,
          cardId: item.card.id,
          cardType: item.card.type,
        });
        break;
      case 'app_bill':
        handleNotification({
          ...item,
          residentIds: item.data.residentIds,
        });
        break;
      case 'app_ecofeedback_ticket':
        handleNotification({
          ...item,
          ecofeedbackTicketId: item.data.ecofeedbackTicketId,
        });
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    onRefresh();
  }, []);

  useStatusBar('dark-content');

  return (
    <FlatList
      keyExtractor={({ id }) => `noti-${id.toString()}`}
      ListFooterComponent={
        <View style={styles.footer}>{loading && <Loader />}</View>
      }
      ListEmptyComponent={
        notifications && notifications.length === 0 ? (
          <View style={styles.listEmptyContainer}>
            <Text style={styles.listEmptyText} fontSize="large">
              {i18n.t('features.notificationScreen.noNotification')}
            </Text>
            <NotificationEmpty
              height="50%"
              preserveAspectRatio="xMidYMid meet"
            />
          </View>
        ) : (
          <View />
        )
      }
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={fetchNext}
      onEndReachedThreshold={0.3}
      style={styles.flatList}
      contentContainerStyle={styles.contentContainer}
      data={notifications}
      renderItem={({ item, index }) => (
        <TouchableComponent
          onPress={() => onNotificationPress(item, index)}
          useForeground
        >
          <View>
            <View style={styles.listItem}>
              <View style={styles.infoContainer}>
                {item.sender ? (
                  <View style={styles.userInfo}>
                    <Avatar
                      size={28}
                      avatarUrl={item.sender.logo}
                      style={styles.avatar}
                    />
                    <Text bold="bold" fontSize="small" style={styles.userName}>
                      {item.sender.name[userLanguage]}
                    </Text>
                  </View>
                ) : (
                  <View />
                )}
                <View style={styles.dateContainer}>
                  {item.status === 'unread' && <View style={styles.unread} />}
                  <Text fontSize="small" style={styles.date}>
                    {moment(item.createdAt).format('DD/MM/YYYY')}
                  </Text>
                </View>
              </View>
              <Text bold="bold" fontSize="small" style={styles.title}>
                {item.title[userLanguage]}
              </Text>
              <View style={styles.descriptionContainer}>
                <ReadMoreText
                  numberOfLines={2}
                  textStyle={styles.description}
                  containerStyle={{
                    width: item.redirectTo !== 'app_none' ? '90%' : '100%',
                  }}
                >
                  {item.body[userLanguage]}
                </ReadMoreText>
                {item.redirectTo !== 'app_none' && (
                  <IconComponent
                    size={applicationDimensions.iconSize}
                    name="arrow-forward"
                    iconPack="material"
                    color={applicationColors.primary.shade900}
                  />
                )}
              </View>
            </View>
            <View style={styles.divider} />
          </View>
        </TouchableComponent>
      )}
    />
  );
}
