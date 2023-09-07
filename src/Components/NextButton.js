function NextButton({ answer, EarnedPoints, dispatch }) {
  if (answer === null) return;

  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "next" })}>
      Next
    </button>
  );
}

export default NextButton;
