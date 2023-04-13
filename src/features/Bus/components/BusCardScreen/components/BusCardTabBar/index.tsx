import { View } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import React from 'react';
import { applicationColors } from '../../../../../../../style.css';
import Text from '../../../../../../components/Text';
import styles from './style.css';

interface Props {
  tabProps: any;
}
function BusCardTabBar(props: Props) {
  const { tabProps } = props;
  return (
    <TabBar
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...tabProps}
      getLabelText={({ route }) => route.title}
      style={styles.container}
      tabStyle={styles.tab}
      contentContainerStyle={styles.content}
      activeColor={applicationColors.primary.shade900}
      inactiveColor={applicationColors.primary.shade900}
      indicatorStyle={styles.indicatorStyle}
      renderLabel={scene => {
        return (
          <View
            style={[
              styles.labelContainer,
              {
                backgroundColor: scene.focused
                  ? applicationColors.primary.white
                  : undefined,
              },
            ]}
          >
            <Text style={styles.label}>{scene.route.title || ''}</Text>
          </View>
        );
      }}
      renderIndicator={() => undefined}
    />
  );
}

export default React.memo(BusCardTabBar);
