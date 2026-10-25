import { useState } from 'react'
import { Link } from 'react-router-dom'

const questions = [
  {
    question: 'Which technology is used as the database in CampusFlow?',
    options: ['React', 'MongoDB', 'Bootstrap', 'Express'],
    answer: 'MongoDB'
  },
  {
    question: 'Which React Hook is commonly used to manage component state?',
    options: ['useState', 'useRoute', 'useFetch', 'usePage'],
    answer: 'useState'
  },
  {
    question: 'Which technology handles the backend API in CampusFlow?',
    options: ['Bootstrap', 'Express', 'CSS', 'React Router'],
    answer: 'Express'
  },
  {
    question: 'Which HTTP method is commonly used to create a new resource?',
    options: ['GET', 'POST', 'DELETE', 'PUT'],
    answer: 'POST'
  },
  {
    question: 'Which technology is mainly used to create the user interface of CampusFlow?',
    options: ['MongoDB', 'Node.js', 'React', 'Express'],
    answer: 'React'
  }
]

function Quiz() {

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const question = questions[currentQuestion]

  const handleAnswer = (option) => {
    setSelectedAnswer(option)
  }

  const handleNext = () => {

    if (!selectedAnswer) {
      return
    }

    if (selectedAnswer === question.answer) {
      setScore(score + 1)
    }

    if (currentQuestion === questions.length - 1) {
      setFinished(true)
      return
    }

    setCurrentQuestion(currentQuestion + 1)
    setSelectedAnswer('')
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer('')
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    return (
      <main className="quiz-page py-5">
        <div className="container">

          <div className="quiz-result text-center mx-auto">

            <div className="quiz-result-icon">
              🎉
            </div>

            <span className="section-label">
              CHALLENGE COMPLETE
            </span>

            <h1 className="fw-bold mt-2">
              Your Score
            </h1>

            <div className="quiz-score">
              {score} / {questions.length}
            </div>

            <p className="lead text-secondary">
              {score === questions.length
                ? 'Perfect score! You know your stuff.'
                : score >= 3
                ? 'Great job! Keep exploring and learning.'
                : 'Nice try! Give it another shot.'}
            </p>

            <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">

              <button
                className="btn btn-primary btn-lg px-4"
                onClick={restartQuiz}
              >
                Try Again
              </button>

              <Link
                to="/events"
                className="btn btn-outline-primary btn-lg px-4"
              >
                Explore Events
              </Link>

            </div>

          </div>

        </div>
      </main>
    )
  }

  const progress =
    ((currentQuestion + 1) / questions.length) * 100

  return (
    <main className="quiz-page py-5">

      <div className="container">

        <div className="text-center mb-5">

          <span className="section-label">
            CAMPUS CHALLENGE
          </span>

          <h1 className="display-5 fw-bold mt-2">
            Think You Know CampusFlow?
          </h1>

          <p className="lead text-secondary">
            Take this quick 5-question challenge.
          </p>

        </div>

        <div className="quiz-card mx-auto">

          <div className="d-flex justify-content-between mb-2">

            <span className="text-secondary">
              Question {currentQuestion + 1} of {questions.length}
            </span>

            <span className="fw-semibold text-primary">
              {score} points
            </span>

          </div>

          <div className="progress mb-4">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <h3 className="fw-bold mb-4">
            {question.question}
          </h3>

          <div className="quiz-options">

            {question.options.map((option) => (

              <button
                key={option}
                className={`quiz-option ${
                  selectedAnswer === option
                    ? 'selected'
                    : ''
                }`}
                onClick={() => handleAnswer(option)}
              >
                <span>
                  {option}
                </span>

                <span>
                  {selectedAnswer === option ? '✓' : '○'}
                </span>
              </button>

            ))}

          </div>

          <button
            className="btn btn-primary btn-lg w-100 mt-4"
            onClick={handleNext}
            disabled={!selectedAnswer}
          >
            {currentQuestion === questions.length - 1
              ? 'Finish Challenge'
              : 'Next Question →'}
          </button>

        </div>

      </div>

    </main>
  )
}

export default Quiz