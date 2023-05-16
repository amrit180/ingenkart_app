import React, {useCallback} from 'react';

const useCoundownTimmer = props => {
  const [time, setTime] = React.useState(60);
  const timerRef = React.useRef(time);

  const timmer = () => {
    if (timerRef.current < 0) {
      timerRef.current = 60;
    }
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
  };

  return {time, timmer, setTime};
};

export default useCoundownTimmer;
