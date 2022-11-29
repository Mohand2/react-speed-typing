import React from 'react';

function Game() {
  return (
    <div className="Game">
      <h1>How fast do you type?</h1>

      <textarea
        name="typing-area"
        id="typing-area"
        className="typing-textarea"
        placeholder="Start typing..."
      ></textarea>

      <p className="time-remaining">Time remaining: 0</p>
      <button type="submit">Start</button>
    </div>
  );
}

export default Game;
