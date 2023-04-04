import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const DEBOUNCE_INTERVAL = 700;

const useDebounceState = <T>(defaultValue: T, onUpdate?: () => void): [T, Dispatch<SetStateAction<T>>, Dispatch<SetStateAction<boolean>>] => {
  const [value, setValue] = useState<T>(defaultValue);
  const [clear, setClear] = useState(true);
  const [sleepAfterTyping, setSleepAfterTyping] = useState<number>(0);
  const [runCounter, setRunCounter] = useState<boolean>(false);

  let interval: NodeJS.Timer;

  useEffect(() => {
    if (value !== defaultValue && clear) {
      setClear(false);
    }
    if (!clear) {
      setRunCounter(true);
      setSleepAfterTyping(0);
    }
  }, [value, clear, defaultValue]);

  useEffect(() => {
    if (!onUpdate || clear) {
      return;
    }
    if (runCounter) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      interval = setInterval(() => {
        setSleepAfterTyping(sleepAfterTyping + 1);
      }, DEBOUNCE_INTERVAL);
      if (sleepAfterTyping > 2) {
        onUpdate?.();
        setRunCounter(false);
        setSleepAfterTyping(0);
      }
    } else {
      clearInterval(interval);
    }

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(interval);
    };
  }, [sleepAfterTyping, runCounter, onUpdate]);

  return [value, setValue, setRunCounter];
};

export default useDebounceState;
