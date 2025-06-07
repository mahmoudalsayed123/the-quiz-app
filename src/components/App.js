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
import { QuizeContext, useQuizeContext } from "../context/QuizeContext";






function App() {
  const {status,answer} = useQuizeContext(QuizeContext);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress/> 
            <Question />
            <Timer/>
            {answer === 0 || answer > 0 ? <NextQuestion/> : ""}
          </>
      )}
      {status === "finished" && <FinishScreen />}
      </Main>
      <footer className="footer">
        <CreatedBy />
      </footer>
    </div>
  );
}

export default App;
