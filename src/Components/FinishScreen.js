function FinishScreen({ EarnedPoints, TotalPoints, Highestscore, dispatch }) {
  const percentage = (EarnedPoints / TotalPoints) * 100;
  console.log(Highestscore);
  let emoji;
  if (percentage >= 90 && percentage <= 100) emoji = "🥳";
  if (percentage >= 80 && percentage < 90) emoji = "😍";
  if (percentage >= 70 && percentage < 80) emoji = "👍";
  if (percentage >= 60 && percentage < 70) emoji = "😊";
  if (percentage >= 50 && percentage < 60) emoji = "🙂";
  if (percentage >= 40 && percentage < 50) emoji = "😒";
  if (percentage >= 0 && percentage < 40) emoji = "🤦‍♂️";

  return (
    <>
      <div className="result">
        <p>
          <span>{emoji}</span> You Scored <strong>{EarnedPoints}</strong> out of{" "}
          {TotalPoints}
        </p>
        <p>Your overall percentage : {Math.ceil(percentage)}%</p>
      </div>
      <p className="highscore">(Highestscore : {Highestscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "Restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
