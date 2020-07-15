import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./timer.css";

import { startTimer, stopTimer, tickTimer, resetTimer } from "./timerSlice";

const Timer = () => {
  const dispatch = useDispatch();
  const time = useSelector((state) => state.timer.time);
  const [intv, setIntv] = useState(0);

  const progress = () => {
    dispatch(tickTimer(Date.now()));
    setIntv(requestAnimationFrame(progress));
  };
  const start = () => {
    setIntv(requestAnimationFrame(progress));
    dispatch(startTimer(Date.now()));
  };
  const stop = () => {
    cancelAnimationFrame(intv);
    dispatch(stopTimer());
  };

  const reset = () => {
    cancelAnimationFrame(intv);
    dispatch(resetTimer());
  };

  const format = (time) => {
    const pad = (time, length) => {
      while (time.length < length) {
        time = "0" + time;
      }
      return time;
    };

    time = new Date(time);
    let m = pad(time.getMinutes().toString(), 2);
    let s = pad(time.getSeconds().toString(), 2);
    let ms = pad(time.getMilliseconds().toString(), 3);

    return `${m} : ${s} . ${ms}`;
  };

  return (
    <>
      <section className="">
        <div className="button-group">
          <button
            onClick={() => {
              start();
            }}
          >
            Play
          </button>
          <button
            onClick={() => {
              stop();
            }}
          >
            Stop
          </button>
          <button
            onClick={() => {
              reset();
            }}
          >
            Reset
          </button>
        </div>
        <div>{format(time) + "  " + time}</div>
      </section>
    </>
  );
};

export { Timer };
