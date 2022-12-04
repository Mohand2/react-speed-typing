import React, { useState, useEffect, useRef } from 'react';

function Game({ GameTitle }) {
  // const TIMEOUT = 15;

  const [words, setwords] = useState([]);
  const [inputWord, setInputWord] = useState('');
  const [initTime, setinitTime] = useState(15);
  const [timeout, settimeout] = useState(initTime);
  const [isTextAreaDisabled, setisTextAreaDisabled] = useState(true);
  const [isEditTimeShown, setisEditTimeShown] = useState(false);

  const textAreaRef = useRef();
  const btnRef = useRef();
  const ResetbtnRef = useRef();
  const RestartbtnRef = useRef();
  const intervalRef = useRef();

  // utility function to split string into an array then return the last word entred
  function getWordToAdd(inputWord) {
    const wordList = inputWord.split(' ');
    //string : moh kader koukou
    //['moh', 'kader','koukou', ''];

    // console.log(wordList);
    const index = wordList.length;

    //why index is -2 > [ "moh", "kader", "koukou", "" ]
    // because the last one is always the charachter split in this cas is " " => space
    const wordToBeAdded = wordList[index - 2];
    // wordToBeAdded = koukou
    return wordToBeAdded;
  }
  // add word to the list
  function addWord(e) {
    if (e.code === 'Space') {
      // get the last entred word then add it to the list of words
      const wordToAdd = getWordToAdd(inputWord);
      // console.log('word to add: ' + wordToAdd);

      // check if word to add is empty then exit else add it
      if (wordToAdd === '') return;

      // add word to the list of words
      setwords((prevWords) => {
        return [...prevWords, wordToAdd];
      });
    }
  }

  function handleInputWord(e) {
    setInputWord(e.target.value);
  }

  function enableTextArea() {
    textAreaRef.current.removeAttribute('disabled');
    setisTextAreaDisabled(false);
  }

  function disableTextArea() {
    textAreaRef.current.setAttribute('disabled', true);
    setisTextAreaDisabled(true);
  }

  function enableBtn() {
    btnRef.current.removeAttribute('disabled');
  }

  function disableBtn() {
    btnRef.current.setAttribute('disabled', true);
  }

  function startGame() {
    enableTextArea();
    textAreaRef.current.focus();
    disableBtn();
    timeOut();
  }

  function initGame() {
    clearInterval(intervalRef.current);
    disableTextArea();
    enableBtn();
    settimeout(initTime);
    setInputWord('');
  }

  function timeOut() {
    intervalRef.current = setInterval(() => {
      settimeout((t) => {
        if (t > 0) {
          return (t -= 1);
        } else {
          initGame();
          clearInterval(intervalRef.current);
        }
      });
    }, 1000);
  }
  return (
    <div className="Game">
      <h3>{GameTitle}</h3>
      <h1>How fast do you type?</h1>

      <div className="tags-list">
        {words.map((word) => (
          <p className="tag">{word}</p>
        ))}
      </div>

      <p className="word-count">Typed Words: {words.length}</p>

      <textarea
        ref={textAreaRef}
        name="typing-area"
        id="typing-area"
        className="typing-textarea"
        placeholder={
          isTextAreaDisabled
            ? 'press start button to start typing!'
            : 'start typing...'
        }
        value={inputWord}
        onChange={handleInputWord}
        onKeyUp={addWord}
        disabled
      ></textarea>

      <p className="time-remaining">Time remaining: {timeout}s</p>

      <div className="btns">
        <button ref={btnRef} type="submit" onClick={startGame}>
          Start
        </button>
        <button
          ref={ResetbtnRef}
          type="submit"
          onClick={() => {
            setwords([]);
          }}
        >
          Reset Words
        </button>
        <button
          ref={RestartbtnRef}
          type="submit"
          onClick={() => {
            setwords([]);
            initGame();
          }}
        >
          Restart
        </button>
      </div>
      <div className="timeout-container">
        <button
          title="edit time"
          className="timeout-btn"
          onClick={() => {
            setisEditTimeShown((isE) => !isE);
          }}
        >
          ⏱
        </button>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            initGame();
          }}
        >
          <input
            title="edit time"
            type="number"
            name="time"
            id="time"
            placeholder="edit time"
            className={`timeout-input ${isEditTimeShown ? '' : 'hide'}`}
            value={initTime}
            onChange={(e) => {
              setinitTime(e.target.value);
              initGame();
            }}
          />
        </form>
      </div>
    </div>
  );
}

export default Game;
