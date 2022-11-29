import React, { useState, useEffect, useRef } from 'react';

function Game() {
  const TIMEOUT = 15;
  const [words, setwords] = useState([]);
  const [inputWord, setInputWord] = useState('');
  // const [isDisabled, setisDisabled] = useState(true);
  const [timeout, settimeout] = useState(TIMEOUT);
  const textAreaRef = useRef();
  const btnRef = useRef();
  const ResetbtnRef = useRef();

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
  }

  function disableTextArea() {
    textAreaRef.current.setAttribute('disabled', true);
  }

  function enableBtn() {
    btnRef.current.removeAttribute('disabled');
  }

  function disableBtn() {
    btnRef.current.setAttribute('disabled', true);
  }

  function startGame() {
    enableTextArea();
    disableBtn();
    timeOut();
  }

  function initGame() {
    disableTextArea();
    enableBtn();
    settimeout(TIMEOUT);
    setInputWord('');
  }

  function timeOut() {
    console.log('oooo');
    const timeToEnd = setInterval(() => {
      settimeout((t) => {
        if (t > 0) {
          return (t -= 1);
        } else {
          initGame();
          clearInterval(timeToEnd);
        }
      });
    }, 1000);
  }
  return (
    <div className="Game">
      <h1>How fast do you type?</h1>

      <div className="tags-list">
        {words.map((word) => (
          <p className="tag">{word}</p>
        ))}
      </div>

      <p>Typed Words: {words.length}</p>

      <textarea
        ref={textAreaRef}
        name="typing-area"
        id="typing-area"
        className="typing-textarea"
        placeholder="Start typing..."
        value={inputWord}
        onChange={handleInputWord}
        onKeyUp={addWord}
        disabled
      ></textarea>

      <p className="time-remaining">Time remaining: {timeout}</p>

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
      </div>
    </div>
  );
}

export default Game;
