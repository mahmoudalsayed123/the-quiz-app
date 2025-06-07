import { QuizeContext, useQuizeContext } from "../context/QuizeContext";

function Options({ question }) {
    let {answer, dispatch,heighScore,points} = useQuizeContext(QuizeContext);
    const hasAnswer = answer !== null;
    return (
    <div>
        <div className="options">
            {question.options.map((option,index) => 
                <button 
                    className={`btn btn-option ${answer === index ? "answer" : ''} ${hasAnswer ? index === question.correctOption ? "correct" : "wrong" : ''}`}
                    key={option}
                    onClick={() => 
                    {
                        dispatch({type: "newAnswer", payload: index});
                        points = question.points;
                        if(hasAnswer) {
                            if(index === question.correctOption) {
                                heighScore += points;
                            }
                        }
                    }
                    }
                    disabled={hasAnswer}
                    >{option}</button>
            )}
        </div>
    </div>
    );
}

export default Options;
