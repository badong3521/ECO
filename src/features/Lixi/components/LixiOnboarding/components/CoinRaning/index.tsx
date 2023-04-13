import React, { useEffect, useMemo } from 'react';
import { Dimensions, View } from 'react-native';
import Animated from 'react-native-reanimated';
import CoinSvg from '../../../../../../assets/lixi/coin.svg';
import styles from './style.css';

interface DimensionsType {
  width: number;
  height: number;
}
const {
  View: ReanimatedView,
  Clock,
  Value,
  useCode,
  block,
  startClock,
  stopClock,
  set,
  abs,
  add,
  sub,
  divide,
  diff,
  multiply,
  cond,
  clockRunning,
  greaterThan,
  lessOrEq,
} = Animated;

const horizSpeed = 20;
const fallSpeed = 70;
const flipSpeed = 3;
const numItems = 50;
const itemWidth = 30;
const itemHeight = 30;

const randomize = (max: number, base = 0) => Math.random() * max + base;
const containerDims = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
};

interface CoinRainingProps {
  enable: boolean;
}

// This component is using source code of make-it-rain animation with some modifying
// See https://github.com/peacechen/react-native-make-it-rain/blob/master/src/makeItRain.js
export default function CoinRaining(props: CoinRainingProps) {
  const { enable } = props;
  const [items, setItems] = React.useState(createItems(containerDims));
  const clock = new Clock();

  useEffect(() => {
    return () => {
      // func indicates unmount
      stopClock(clock);
      setItems([]);
    };
  }, []);

  function createItems(dimensions: DimensionsType) {
    return useMemo(() => {
      const { width, height } = dimensions;
      // Adapt velocity props
      const xVelMax = horizSpeed;
      const yVelMax = fallSpeed * 3;
      const angleVelMax = flipSpeed;

      return [...new Array(numItems)].map((_, index) => {
        const x = randomize(width - itemWidth);
        const y = randomize(-height, 0);
        const anchor = randomize(width / 2, width / 5);
        const xArc = Math.abs(x - anchor);

        return {
          index,
          x: new Value(x),
          y: new Value(y),
          xArc: new Value(xArc),
          yBase: new Value(y),
          angle: new Value(0),
          anchor: new Value(anchor),
          tension: new Value((4 * Math.min(xArc, width / 2)) / width),
          xVel: new Value(randomize(xVelMax / 2, xVelMax / 2)),
          yVel: new Value(randomize(yVelMax, yVelMax)),
          angleVel: new Value(randomize(angleVelMax / 2, angleVelMax / 2)),
          delay: new Value(((index / numItems) * height) / yVelMax),
          color: undefined,
        };
      });
    }, [dimensions]);
  }

  const spring = (
    dt: any,
    position: number,
    velocity: any,
    anchor: number,
    tension = 50,
    mass = 1,
  ) => {
    const dist = sub(position, anchor);
    const acc = divide(multiply(-1, tension, dist), mass);
    return set(velocity, add(velocity, multiply(dt, acc)));
  };

  const swingArc = (
    x: any,
    y: any,
    xArc: number,
    yBase: number,
    anchor: number,
  ) => {
    const percentArc = divide(abs(sub(x, anchor)), xArc);
    const yOffset = multiply(percentArc, divide(xArc, 4));
    return set(y, sub(yBase, yOffset));
  };

  const useDraw = (_items: any[]) => {
    const nativeCode = useMemo(() => {
      const timeDiff = diff(clock);
      // eslint-disable-next-line no-shadow
      const nativeCode = _items.map(
        ({
          x,
          y,
          xArc,
          yBase,
          angle,
          xVel,
          yVel,
          angleVel,
          anchor,
          tension,
          delay,
        }) => {
          const dt = divide(timeDiff, 1000);
          const dy = multiply(dt, yVel);
          const dAngle = multiply(dt, angleVel);

          return [
            cond(
              lessOrEq(yBase, containerDims.height + itemHeight),
              cond(
                greaterThan(delay, 0),
                [set(delay, sub(delay, dt))],
                [
                  set(yBase, add(yBase, dy)),
                  spring(dt, x, xVel, anchor, tension), // swinging motion
                  set(x, add(x, multiply(xVel, dt))),
                  swingArc(x, y, xArc, yBase, anchor), // create dip in swing
                  set(angle, add(angle, dAngle)),
                ],
              ),
            ),
            cond(
              greaterThan(yBase, containerDims.height + itemHeight),
              set(yBase, -itemHeight * 4),
            ),
          ];
        },
      );

      // @ts-ignore
      nativeCode.push(cond(clockRunning(clock), 0, startClock(clock)), clock);
      return block(nativeCode);
    }, [_items]);

    useCode(() => nativeCode, [nativeCode]);
  };

  useDraw(items);

  return (
    <View pointerEvents="none" style={styles.root}>
      {enable &&
        items.map(({ index, x, y, angle }) => {
          return (
            <ReanimatedView
              key={index}
              style={[
                styles.coin,
                {
                  transform: [
                    { translateX: x },
                    { translateY: y },
                    { rotate: angle },
                    { rotateX: angle },
                    { rotateY: angle },
                  ],
                },
              ]}
            >
              <CoinSvg />
            </ReanimatedView>
          );
        })}
    </View>
  );
}
