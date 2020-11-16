import ArrayItem from './ArrayItem.jsx';
import React, { useState } from 'react';
import './App.css';

function App() {
  const [numElements, setNumElements] = useState(5);

  // So that the slider can affect the number of elements in the array
  function setNumElementsHelper(e) {
    setNumElements(e.target.value);
  }

  let arrayNums = []
  for (let i = 0; i < numElements; i++) {
    arrayNums.push([Math.floor(Math.random() * 95 + 5), i]);
  }

  let array = arrayNums.map(number => (
    <ArrayItem value={number[0]} key={number[1]} position={number[1]} numElements={numElements} />
  ));

  return (
    <div id="app">
      <div className="nav">
        Welcome: <br />
        <label for="num-elements"># of Elements ({numElements}): </label>
        <input type="range" value={numElements} min="5" max="100" step="1" name="num-elements" onChange={setNumElementsHelper}></input>
      </div>
      <div className="array">
        {array}
      </div>
    </div>
  );
}

export default App;
