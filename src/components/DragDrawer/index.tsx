import { Dimensions, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Interactable, {
  IDragEvent,
  ISnapEvent,
} from 'react-native-interactable';
import { getStatusBarHeight } from 'utils/statusBar';
import styles from './style.css';
import DragLine from './components/DragLine';
import { applicationDimensions } from '../../../style.css';
import useKeyboard from '../../utils/hooks/useKeyboard';

const windowHeight = Dimensions.get('screen').height - getStatusBarHeight();
const dragDamping = 0.6;
let opened = false;

interface DragDrawerProps {
  header: React.ReactNode;
  content: React.ReactNode;
  onOpenChanged?: (open: boolean) => void;
  isOpen?: boolean; // if true, open the drawer. otherwise, close the drawer.
  closedHeight?: number; // if set, drawer will have height = `closedHeight` when closed.
  onDragEnded?: () => void; // handle vertical dragging gesture
  onLayoutHeight?: (height: number) => void;
}

// Spawn a drawer on the bottom of the page that can be dragged upwards to the maximum
// height of its content. If not enough content is provided it will cap its own height.
export default function DragDrawer(props: DragDrawerProps) {
  const {
    header,
    content,
    onOpenChanged,
    isOpen,
    closedHeight,
    onDragEnded,
    onLayoutHeight,
  } = props;
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const [sheetHeight, setSheetHeight] = useState<number>(windowHeight);
  const interactableRef = useRef(null);
  const keyboardVisible = useKeyboard();

  function getClosePosition(): number {
    if (keyboardVisible) {
      return 0;
    }
    if (closedHeight) {
      return sheetHeight - closedHeight;
    }
    return sheetHeight - (headerHeight + contentHeight);
  }

  function getOpenPosition(): number {
    // if has content or keyboard is visible, will open drawer to top of screen
    if (keyboardVisible || hasContent()) {
      return 0;
    }
    return Math.max(sheetHeight - headerHeight, 0);
  }

  function hasContent(): boolean {
    return contentHeight > applicationDimensions.smallPadding;
  }

  function open() {
    // @ts-ignore
    interactableRef.current.snapTo({ index: 1 });
  }

  function close() {
    // @ts-ignore
    interactableRef.current.snapTo({ index: 0 });
  }

  function onSnapStart(event: ISnapEvent) {
    opened = event.nativeEvent.index === 1;
    if (onOpenChanged) {
      onOpenChanged(opened);
    }
  }

  function onDrag(event: IDragEvent) {
    if (onDragEnded && event.nativeEvent.state === 'end') {
      onDragEnded();
    }
  }

  useEffect(() => {
    opened = isOpen!;
  }, [isOpen]);

  // wrap the drag drawer to exact height when header or content or keyboard changed
  useEffect(() => {
    if (opened) {
      open();
    } else {
      close();
    }
    if (onLayoutHeight) {
      onLayoutHeight(headerHeight + contentHeight);
    }
  }, [headerHeight, contentHeight, keyboardVisible]);

  return (
    <View style={styles.panelContainer} pointerEvents="box-none">
      <Interactable.View
        onDrag={onDrag}
        onLayout={e => {
          if (sheetHeight === windowHeight) {
            setSheetHeight(e.nativeEvent.layout.height);
          }
        }}
        ref={interactableRef}
        style={styles.bottomSheet}
        verticalOnly
        animatedNativeDriver
        dragEnabled={hasContent()}
        onSnapStart={onSnapStart}
        snapPoints={[
          { y: getClosePosition(), damping: dragDamping },
          { y: getOpenPosition(), damping: dragDamping },
        ]}
        boundaries={{
          top: 0,
        }}
      >
        {hasContent() && <DragLine />}
        <View
          onLayout={e => {
            setHeaderHeight(e.nativeEvent.layout.height);
          }}
        >
          {header}
        </View>
        <View
          style={{
            maxHeight: sheetHeight - headerHeight,
            paddingBottom: hasContent()
              ? applicationDimensions.smallPadding
              : 0,
          }}
          onLayout={e => {
            setContentHeight(e.nativeEvent.layout.height);
          }}
        >
          {content}
        </View>
      </Interactable.View>
    </View>
  );
}
