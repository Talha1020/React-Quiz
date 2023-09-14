function NextButton({
  answer,
  EarnedPoints,
  dispatch,
  numQuestions,
  QuestionsIndex,
}) {
  if (answer === null) return;

  if (QuestionsIndex < numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: "next" })}>
        Next
      </button>
    );

  if (QuestionsIndex === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "Finished" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
