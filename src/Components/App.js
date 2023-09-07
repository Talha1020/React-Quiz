import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import InitialDescription from "./InitialDescription";
import Questions from "./Questions";
import NextButton from "./NextButton";
import ProgressMain from "./ProgressMain";

const initialState = {
  questions: [],
  status: "Loading",
  QuestionsIndex: 0,
  answer: null,
  EarnedPoints: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataArrived":
      return { ...state, questions: action.payload, status: "dataArrived" };
    case "dataFailed":
      return { ...state, status: "dataFailed" };
    case "active":
      return { ...state, status: "active" };
    case "clicked":
      return {
        ...state,
        answer: action.payload,
      };
    case "next":
      const GotPoints =
        state.answer === state.questions[state.QuestionsIndex].correctOption;

      const PointsAchieved =
        state.EarnedPoints + state.questions[state.QuestionsIndex].points;
      return {
        ...state,
        QuestionsIndex: state.QuestionsIndex + 1,
        EarnedPoints: GotPoints ? PointsAchieved : state.EarnedPoints,
        answer: null,
      };
    default:
      throw new Error("Unknown Error");
  }
}
function App() {
  const [
    { questions, status, QuestionsIndex, answer, EarnedPoints },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const TotalPoints = questions.reduce((acc, cur) => acc + cur.points, 0);
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataArrived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "Loading" && <Loader />}
        {status === "dataArrived" && (
          <InitialDescription numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "dataFailed" && <Error />}
        {status === "active" && (
          <>
            <ProgressMain
              numQuestions={numQuestions}
              QuestionsIndex={QuestionsIndex}
              TotalPoints={TotalPoints}
              EarnedPoints={EarnedPoints}
              answer={answer}
            />
            <Questions
              questions={questions}
              answer={answer}
              QuestionsIndex={QuestionsIndex}
              dispatch={dispatch}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              EarnedPoints={EarnedPoints}
            >
              Next
            </NextButton>
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
