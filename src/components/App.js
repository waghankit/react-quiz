import React from "react";
import { quizData } from "./quizData";
import './style.css'


class App extends React.Component {
  state = {
    currentQuestion: 0,
    myAnswer: null,
    options: [],
    score: 0,
    disabled: true,
    isEnd: false
  };

  loadQuizData = () => {
    this.setState(() => {
      return {
        questions: quizData[this.state.currentQuestion].question,
        answer: quizData[this.state.currentQuestion].answer,
        options: quizData[this.state.currentQuestion].options
      };
    });
  };

  componentDidMount() {
      this.loadQuizData();
  }

  
  nextQuestionHandler = () => {
    const { myAnswer, answer, score } = this.state;

    if (myAnswer === answer) {
      this.setState({
        score: score + 1
      });
    }

    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: quizData[this.state.currentQuestion].question,
          options: quizData[this.state.currentQuestion].options,
          answer: quizData[this.state.currentQuestion].answer
        };
      });
    }
  }
  
  checkAnswer = answer => {
    this.setState({ myAnswer: answer, disabled: false });
  };

  finishHandler = () => {
    if (this.state.currentQuestion === quizData.length - 1) {
      this.setState({
        isEnd: true
      });
    }
  };

  render() {
    const { options, myAnswer, currentQuestion, isEnd } = this.state;
    

    if (isEnd) {
      return (
        <div className="container result">
          <h1 className="final-card">Thank you for taking up the quiz!</h1>
          <h3 className="final-score"><span className="colorchange">Final score : </span>{this.state.score} / {quizData.length} </h3>
        </div>
      );
    } else {
      return (
        
        <div className="container App">
        
          <h1 className="quiz-questions">{this.state.questions} </h1>
          <span className="questions-left">{`Question ${currentQuestion + 1} of ${quizData.length} !!`}</span>
          {options.map(option => (
            <p
              key={option}
              className={`ui floating message options ${myAnswer === option ? "selected" : null}`}
              onClick={() => this.checkAnswer(option)}
            >
              {option}
            </p>
          ))}
          {/* Next Button */}
          {currentQuestion < quizData.length - 1 && (
            <button
              className="btn btn-primary"
              disabled={this.state.disabled}
              onClick={this.nextQuestionHandler}
            >
              Next
            </button>
          )}
          {/* Finish Button */}
          {currentQuestion === quizData.length - 1 && (
            <button className="ui inverted button" onClick={this.finishHandler}>
              Finish
            </button>
          )}
        </div>
      );
    }
  }
}

export default App;
