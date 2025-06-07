import React from 'react'
import { QuizeContext, useQuizeContext } from '../context/QuizeContext'
export default function NextQuestion() {
    let {dispatch,numberOfQuestions, questions,index,points,answer} = useQuizeContext(QuizeContext);
    const question = questions.at(index)
    if(index + 1 < numberOfQuestions) 
        return (
            <button  
                className="btn btn-ui"
                onClick={() => dispatch({type: "nextQuestion",payload: question.correctOption === answer ? points += question.points : points})}
                >
                Next 👉
            </button>
        )

    if(index === numberOfQuestions - 1) 
        return (
            <button  
                className="btn btn-ui"
                onClick={() => dispatch({type: 'finish'})}
                >
                Finish
            </button>
        )
}
