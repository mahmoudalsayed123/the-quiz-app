import React, { useEffect } from 'react'
import { QuizeContext, useQuizeContext } from '../context/QuizeContext';

export default function Timer() {
    const {remainingSeconds,dispatch} = useQuizeContext(QuizeContext);
    const mins = Math.floor(remainingSeconds / 60)
    const seconds = remainingSeconds % 60;
    useEffect(function(){
        const id = setInterval(() =>{
            dispatch({type: "tick"})
        },1000)

        return function() {
            clearInterval(id);
        }
    },[remainingSeconds,dispatch]);
    return (
        <div className="timer">
            {mins < 10 ? `0${mins}`: `${mins}` }: {seconds < 10 ? `0${seconds}`: `${seconds}`}
        </div>
    )
}
