import React from 'react'

export default function NextQuestion({dispatch,numOfQuestions,index,question,points,answer}) {
    if(index + 1 < numOfQuestions) 
        return (
            <button  
                className="btn btn-ui"
                onClick={() => dispatch({type: "nextQuestion",payload: question.correctOption === answer ? points += question.points : points})}
                >
                Next 👉
            </button>
        )

    if(index === numOfQuestions - 1) 
        return (
            <button  
                className="btn btn-ui"
                onClick={() => dispatch({type: 'finish'})}
                >
                Finish
            </button>
        )
}
