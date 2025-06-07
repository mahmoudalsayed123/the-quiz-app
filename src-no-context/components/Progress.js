import React from 'react'

export default function Progress({questions,numOfQuestions,index,answer,points}) {

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
