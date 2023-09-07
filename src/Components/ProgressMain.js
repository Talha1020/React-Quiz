function ProgressMain({
  numQuestions,
  QuestionsIndex,
  TotalPoints,
  EarnedPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={QuestionsIndex + Number(answer !== null)}
      />
      <p>
        Question <span>{QuestionsIndex + 1}</span> / {numQuestions}
      </p>
      <p>
        <span>{EarnedPoints}</span> / {TotalPoints}
      </p>
    </header>
  );
}

export default ProgressMain;
