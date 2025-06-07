import React, { createContext, useContext, useEffect, useReducer } from 'react'

const questionsArr = [
    {
        "question": "Which is the most popular JavaScript framework?",
        "options": [
            "Angular",
            "React",
            "Svelte",
            "Vue"
        ],
        "correctOption": 1,
        "points": 10,
        "id": "eb55"
    },
    {
        "question": "Which company invented React?",
        "options": [
            "Google",
            "Apple",
            "Netflix",
            "Facebook"
        ],
        "correctOption": 3,
        "points": 10,
        "id": "b1f1"
    },
    {
        "question": "What's the fundamental building block of React apps?",
        "options": [
            "Components",
            "Blocks",
            "Elements",
            "Effects"
        ],
        "correctOption": 0,
        "points": 10,
        "id": "3136"
    },
    {
        "question": "What's the name of the syntax we use to describe the UI in React components?",
        "options": [
            "FBJ",
            "Babel",
            "JSX",
            "ES2015"
        ],
        "correctOption": 2,
        "points": 10,
        "id": "4d66"
    },
    {
        "question": "How does data flow naturally in React apps?",
        "options": [
            "From parents to children",
            "From children to parents",
            "Both ways",
            "The developers decides"
        ],
        "correctOption": 0,
        "points": 10,
        "id": "18b4"
    },
    {
        "question": "How to pass data into a child component?",
        "options": [
            "State",
            "Props",
            "PropTypes",
            "Parameters"
        ],
        "correctOption": 1,
        "points": 10,
        "id": "588f"
    },
    {
        "question": "When to use derived state?",
        "options": [
            "Whenever the state should not trigger a re-render",
            "Whenever the state can be synchronized with an effect",
            "Whenever the state should be accessible to all components",
            "Whenever the state can be computed from another state variable"
        ],
        "correctOption": 3,
        "points": 30,
        "id": "7e3b"
    },
    {
        "question": "What triggers a UI re-render in React?",
        "options": [
            "Running an effect",
            "Passing props",
            "Updating state",
            "Adding event listeners to DOM elements"
        ],
        "correctOption": 2,
        "points": 20,
        "id": "1258"
    },
    {
        "question": "When do we directly \"touch\" the DOM in React?",
        "options": [
            "When we need to listen to an event",
            "When we need to change the UI",
            "When we need to add styles",
            "Almost never"
        ],
        "correctOption": 3,
        "points": 20,
        "id": "529d"
    },
    {
        "question": "In what situation do we use a callback to update state?",
        "options": [
            "When updating the state will be slow",
            "When the updated state is very data-intensive",
            "When the state update should happen faster",
            "When the new state depends on the previous state"
        ],
        "correctOption": 3,
        "points": 30,
        "id": "07c5"
    },
    {
        "question": "If we pass a function to useState, when will that function be called?",
        "options": [
            "On each re-render",
            "Each time we update the state",
            "Only on the initial render",
            "The first time we update the state"
        ],
        "correctOption": 2,
        "points": 30,
        "id": "3b39"
    },
    {
        "question": "Which hook to use for an API request on the component's initial render?",
        "options": [
            "useState",
            "useEffect",
            "useRef",
            "useReducer"
        ],
        "correctOption": 1,
        "points": 10,
        "id": "7862"
    },
    {
        "question": "Which variables should go into the useEffect dependency array?",
        "options": [
            "Usually none",
            "All our state variables",
            "All state and props referenced in the effect",
            "All variables needed for clean up"
        ],
        "correctOption": 2,
        "points": 30,
        "id": "28ac"
    },
    {
        "question": "An effect will always run on the initial render.",
        "options": [
            "True",
            "It depends on the dependency array",
            "False",
            "In depends on the code in the effect"
        ],
        "correctOption": 0,
        "points": 30,
        "id": "6857"
    },
    {
        "question": "When will an effect run if it doesn't have a dependency array?",
        "options": [
            "Only when the component mounts",
            "Only when the component unmounts",
            "The first time the component re-renders",
            "Each time the component is re-rendered"
        ],
        "correctOption": 3,
        "points": 20,
        "id": "419f"
    }
]

const QuizeContext = createContext()

let initialState = {
    questions: [],

    // loading, error, ready, active, finish 
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    remainingSeconds: 120,
    maxPossiblePoints: 0,
    heighScore: 0,
}

function reducer(state, action) {
    switch (action.type) {
        case "dataRecived":
            return {
                ...state,
                questions: action.payload,
                status: "ready"
            }

        case "dataFaild":
            return {
                status: "error"
            }
        case "start":
            return {
                ...state,
                status: "active",
                remainingSeconds: state.remainingSeconds,
            }
        case "newAnswer":
            return {
                ...state,
                answer: action.payload,
            }
        case "nextQuestion":
            return {
                ...state,
                index: state.index === state.numOfQuestions ? state.status = "finish" : state.index + 1,
                answer: null,
                points: action.payload,
            }
        case "finish":
            return {
                ...state,
                status: "finished",
                heighScore: state.heighScore > state.points ? state.heighScore : state.points,
            }
        case "tick":
            return {
                ...state,
                remainingSeconds: state.remainingSeconds - 1,
                status: state.remainingSeconds === 0 ? "finished" : state.status
            }
        case "restart":
            return {
                ...state,
                questions: state.questions,
                status: "ready",
                index: 0,
                answer: null,
                points: 0,
                remainingSeconds: 120,
                heighScore: 0,
            }
        default:
            throw new Error("Data Not Founded")
    }
}

function QuizeProvider({ children }) {

    const [{ status, questions, index, answer, points, remainingSeconds, heighScore }, dispatch] = useReducer(reducer, initialState)
    const maxPossiblePoints = questions.reduce((prev, cur) => {
        return prev + cur.points;
    }, 0)
    const numberOfQuestions = questions.length;
    dispatch({ type: "dataRecived", payload: questionsArr })
    dispatch({ type: "error", payload: 'Data Not Found' })

    useEffect(function () {
        fetch("http://localhost:9000/questions")
            .then((res) => res.json())
            .then((data) => dispatch({ type: "dataRecived", payload: data }))
            .catch((err) => dispatch({ type: "error", payload: err }));
        dispatch({ type: "dataRecived", payload: questionsArr })
        dispatch({ type: "error", payload: 'Data Not Found' })
    }, []);

    return (
        <QuizeContext.Provider value={{ status, questions, index, answer, points, remainingSeconds, maxPossiblePoints, heighScore, numberOfQuestions, dispatch }}>
            {children}
        </QuizeContext.Provider>
    )
}

function useQuizeContext() {
    const context = useContext(QuizeContext);
    if (context === undefined) return
    return context;
}

export { QuizeProvider, useQuizeContext, QuizeContext }