import Options from "./Options";

function Question({ question, dispatch, answer,points,heighScore }) {
    return (
    <div>
        <h4>{question.question}</h4>
        <Options question={question} dispatch={dispatch} answer={answer} points={points} heighScore={heighScore} />
    </div>
    );
}

export default Question;
