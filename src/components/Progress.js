import React from 'react'
import { QuizeContext, useQuizeContext } from '../context/QuizeContext';

export default function Progress() {
    const {questions,numOfQuestions,index,answer,points} = useQuizeContext(QuizeContext);
    // console.log(numOfQuestions,index)

    const maxPoints = questions.reduce((cur,acc) => {return cur + acc.points},0);
    
    return (
        <header className='progress'>
            <progress max={numOfQuestions} value={index + Number(answer !== null)} />
            <p>
                Question <strong>{index + 1}</strong> / {numOfQuestions}
            </p>

            <p>
                Question <strong>{points}</strong> / {maxPoints}
            </p>
        </header>
    )
}
