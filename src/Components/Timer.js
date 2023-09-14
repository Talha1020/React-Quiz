import { useEffect } from "react";

function Timer({ dispatch, RemainingSeconds }) {
  const min = Math.floor(RemainingSeconds / 60);
  const sec = RemainingSeconds % 60;

  useEffect(
    function () {
      const id = setInterval(() => dispatch({ type: "Timer" }), 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {min < 10 && "0"}
      {min} : {sec < 10 && "0"}
      {sec}
    </div>
  );
}

export default Timer;
