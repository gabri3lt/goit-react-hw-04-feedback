import React, { useState } from 'react';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Notification from './Notification';

const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const onLeaveFeedback = state => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [state]: prevFeedback[state] + 1,
    }));
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = feedback;
    return Math.round((good / countTotalFeedback()) * 100);
  };

  const options = Object.keys(feedback);

  return (
    <div>
      <h1>"Please leave feedback"</h1>
      <FeedbackOptions options={options} onLeaveFeedback={onLeaveFeedback} />

      <h2>"Statistics"</h2>
      {countTotalFeedback() > 0 ? (
        <Statistics
          good={feedback.good}
          neutral={feedback.neutral}
          bad={feedback.bad}
          total={countTotalFeedback()}
          positivePercentage={countPositiveFeedbackPercentage()}
        />
      ) : (
        <Notification message="There is no feedback" />
      )}
    </div>
  );
};

export default App;
