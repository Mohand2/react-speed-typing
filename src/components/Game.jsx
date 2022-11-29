import React, { useState, use } from 'react';

function Game() {
  const [words, setwords] = useState([]);
  const [inputWord, setInputWord] = useState('');

  console.log(words);

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

  return (
    <div className="Game">
      <h1>How fast do you type?</h1>
      <ol>
        {words.map((word) => (
          <li>{word}</li>
        ))}
      </ol>

      <p>Typed Words: {words.length}</p>

      <textarea
        name="typing-area"
        id="typing-area"
        className="typing-textarea"
        placeholder="Start typing..."
        value={inputWord}
        onChange={handleInputWord}
        onKeyUp={addWord}
      ></textarea>

      <p className="time-remaining">Time remaining: 0</p>
      <button type="submit">Start</button>
    </div>
  );
}

export default Game;
