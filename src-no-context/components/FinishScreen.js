import React from 'react'

export default function FinishScreen({questions,dispatch,heighScore,points,maxPossiblePoints}) {
    maxPossiblePoints = questions.reduce((cur,acc) => {return cur + acc.points},0);
    const percentage = (points / maxPossiblePoints) * 100;

    let emoji;

    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 100) emoji = "🎉";
    if (percentage >= 50 && percentage < 80) emoji = "🙃";
    if (percentage >= 0 && percentage < 50) emoji = "😔";
    if (percentage === 0) emoji = "🤦🏻‍♂️";
  
    return (
        <>
            <p className="result">
                <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
                {maxPossiblePoints} ({Math.ceil(percentage)}%)
            </p>

            <p className="highscore">(Highscore : {heighScore} points)</p>
            <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "restart" })}
            >
            Restart quiz
            </button>
        </>
    )
}
