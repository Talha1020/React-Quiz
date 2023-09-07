import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import InitialDescription from "./InitialDescription";
import Questions from "./Questions";

const initialState = {
  questions: [],
  status: "Loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataArrived":
      return { ...state, questions: action.payload, status: "dataArrived" };
    case "dataFailed":
      return { ...state, status: "dataFailed" };
    case "active":
      return { ...state, status: "active" };
    default:
      throw new Error("Unknown Error");
  }
}
function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
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
        {status === "active" && <Questions />}
      </Main>
    </div>
  );
}

export default App;
