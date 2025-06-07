import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main"
import StartScreen from "./StartScreen";
import Loader from "./Loader";
import Error from "./ErrorScreen";
import Question from "./Questions";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";
import Timer from "./Timer";
import FinishScreen from "./FinishScreen";
import CreatedBy from "./CreatedBy";

const initialState = {
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

function reducer(state,action) {
  switch(action.type) {
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
        remainingSeconds: state.remainingSeconds
      }
    case "newAnswer": 
      return {
        ...state,
        answer: action.payload,
        maxPossiblePoints: state.points
      }
    case "nextQuestion": 
      return {
        ...state,
        index: state.index === state.numOfQuestions ? state.status = "finish" : state.index + 1,
        answer: null,
        points: action.payload,
        maxPossiblePoints: state.points
      }
      case "finish":
        return {
          ...state,
          status: "finished",
          maxPossiblePoints: state.maxPossiblePoints,
          heighScore : state.heighScore > state.points ? state.heighScore : state.points,
        }
    case "tick": 
      return {
        ...state,
        remainingSeconds: state.remainingSeconds - 1,
        status: state.remainingSeconds === 0 ? "finished": state.status
      }
    case "restart" :
      return {
        ...state,
        questions: state.questions,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
        remainingSeconds: 120,
        maxPossiblePoints: 0,
        heighScore: 0,
      }
    default: 
      throw new Error("Data Not Founded")
  }
}


function App() {

  const[{status,questions,index,answer,points,remainingSeconds,maxPossiblePoints,heighScore},dispatch] = useReducer(reducer,initialState)

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({type: "dataRecived", payload: data}))
      .catch((err) => dispatch({type: "error", payload: err}));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numOfQuestions={questions.length} dispatch={dispatch} />}
        {status === "active" && (
          <>
            <Progress questions={questions} numOfQuestions={questions.length} index={index} answer={answer} points={points}/> 
            <Question question={questions[index]} dispatch={dispatch} answer={answer} points={points} heighScore={heighScore} />
            <Timer dispatch={dispatch} remainingSeconds={remainingSeconds}/>
            {answer === 0 || answer > 0 ? <NextQuestion numOfQuestions={questions.length} index={index} dispatch={dispatch} question={questions[index]} points={points} answer={answer} /> : ""}
          </>
      )}
      {status === "finished" && <FinishScreen questions={questions} points={points} maxPossiblePoints={maxPossiblePoints} dispatch={dispatch}  heighScore={heighScore}/>}
      </Main>
      <footer className="footer">
        <CreatedBy />
      </footer>
    </div>
  );
}

export default App;
