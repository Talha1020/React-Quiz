function Questions({ data }) {
  const { questions, answer, QuestionsIndex, dispatch } = data;

  return (
    <>
      <h4>{questions[QuestionsIndex].question}</h4>
      <div className="options">
        {questions[QuestionsIndex].options.map((option, index) => (
          <button
            key={option}
            disabled={answer !== null}
            className={`btn-option btn ${index === answer ? "answer" : ""}
            ${
              answer !== null
                ? index === questions[QuestionsIndex].correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }
            `}
            onClick={() => dispatch({ type: "clicked", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
}

export default Questions;
