import { useEffect, useRef } from 'react';

interface useIntervalPropTypes {
  callback: () => any;
  delay: number | null;
}

export default function useInterval(props: useIntervalPropTypes) {
  const { callback, delay } = props;
  const savedCallback = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
