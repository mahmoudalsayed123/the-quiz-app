import React, { useEffect } from 'react'

export default function Timer({remainingSeconds,dispatch}) {
    const mins = Math.floor(remainingSeconds / 60)
    const seconds = remainingSeconds % 60;
    useEffect(function(){
        const id = setInterval(() =>{
            dispatch({type: "tick"})
        },1000)

        return function() {
            clearInterval(id);
        }
    },[remainingSeconds])
    return (
        <div className="timer">
            {mins < 10 ? `0${mins}`: `${mins}` }: {seconds < 10 ? `0${seconds}`: `${seconds}`}
        </div>
    )
}
