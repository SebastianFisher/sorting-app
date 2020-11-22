import React from 'react';
import './App.css';
import ArrayEl from './ArrayEl';
import Dropdown from './Dropdown.jsx';
import mergeSortAnimate from './Algorithms/mergeSort.js';
import bubbleSortAnimate from './Algorithms/bubbleSort.js';
import monkeySortAnimate from './Algorithms/monkeySort.js';
import selectionSortAnimate from './Algorithms/selectionSort.js';

const PRIMARY_COLOR = "orange";
const SECONDARY_COLOR = "#85e3ff";
const POSITIVE_COLOR = "limegreen";
const NEGATIVE_COLOR = "crimson";

// IDEA: colorful sorting-- sort multiple columns simultaneously
// Each column has many rows which are all pixels of a certain color
// sort by hex value? maybe rgb/rgba somehow?
// FIX update keys
// slider for speed

export default class App extends React.Component {
  // Create state for the number of elements
  constructor(props) {
    super(props);

    this.state = {
      speed: 500,
      numElements: 5,
      arrayNums: [],
      algorithm: "Choose an Algorithm",
      showAlgoChoices: false,
      inputDisabled: false
    };

    this.delay = this.delay.bind(this);
    this.changeNumElements = this.changeNumElements.bind(this);
    this.changeSpeed = this.changeSpeed.bind(this);
    this.bubbleSort = this.bubbleSort.bind(this);
    this.mergeSort = this.mergeSort.bind(this);
    this.monkeySort = this.monkeySort.bind(this);
    this.selectionSort = this.selectionSort.bind(this);
    this.genNewArray = this.genNewArray.bind(this);
    this.handleAlgoChoice = this.handleAlgoChoice.bind(this);
    this.sortAlgo = this.sortAlgo.bind(this);

    // array for the sorting algorithms
    this.sortingAlgorithms = [["Bubble Sort", this.bubbleSort], ["Merge Sort", this.mergeSort], ["Selection Sort", this.selectionSort], ["Monkey Sort", this.monkeySort]];
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, 1000 - this.state.speed));
  }

  sortedAnimation() {
    const arrayElements = document.getElementsByClassName('array-element');
    for (let i = 0; i < arrayElements.length; ++i) {
      arrayElements[i].style.backgroundColor = POSITIVE_COLOR;
      setTimeout(() => arrayElements[i].style.backgroundColor = PRIMARY_COLOR, 500);
    }
  }

  async monkeySort() {
    const sort = monkeySortAnimate(this.state.arrayNums);
    if (sort === "warning") {
      alert("Monkey Sort is only allowed for arrays with 5 elements (otherwise it takes a while)");
      return;
    }
    const animations = sort[0];
    let i = 0;
    while (i < animations.length) {
      const arrayElements = document.getElementsByClassName('array-element');
      while (animations[i][0] !== "checked") {
        // Maybe push elements in another way also to make 
        const [elOneIdx, elTwoIdx, isSorted] = animations[i];
        const elOneStyle = arrayElements[elOneIdx].style;
        const elTwoStyle = arrayElements[elTwoIdx].style;
        const color = isSorted ? POSITIVE_COLOR : NEGATIVE_COLOR;
        elOneStyle.backgroundColor = color;
        elTwoStyle.backgroundColor = color;
        await this.delay();
        elOneStyle.backgroundColor = PRIMARY_COLOR;
        elTwoStyle.backgroundColor = PRIMARY_COLOR;
        i++;
      }
      if (animations[i][1]) {
        break;
      }
      i++;
      // Fix this part
      while (animations[i] !== "randomized") {
        const [elOneIdx, elTwoIdx] = animations[i].slice(0, 2);
        const elOne = arrayElements[elOneIdx];
        const elTwo = arrayElements[elTwoIdx];
        const elOneStyle = elOne.style;
        const elTwoStyle = elTwo.style;
        if (animations[i][2] === true) {
          elOneStyle.backgroundColor = SECONDARY_COLOR;
          elTwoStyle.backgroundColor = SECONDARY_COLOR;
          // Maybe make the delay cut in half so the color goes away after switching elements?
          // *** Need to make it so the numbers displayed on the element bars change during sorting***
          await this.delay();
        } else {
          const elOneHeight = animations[i][2];
          const elTwoHeight = animations[i][3];

          // Swap height values
          elOneStyle.height = `${elTwoHeight / 2}%`;
          elTwoStyle.height = `${elOneHeight / 2}%`;
          const temp = elOne.innerHTML;
          elOne.innerHTML = elTwo.innerHTML;
          elTwo.innerHTML = temp;

          elOneStyle.backgroundColor = PRIMARY_COLOR;
          elTwoStyle.backgroundColor = PRIMARY_COLOR;
        }
        i++;
      }
      i++;
    }
    this.sortedAnimation();
    this.setState({ arrayNums: sort[1] });
  }


  async bubbleSort() {
    const sort = bubbleSortAnimate(this.state.arrayNums);
    const animations = sort[0];
    for (let i = 0; i < animations.length; i++) {
      const arrayElements = document.getElementsByClassName('array-element');
      const switchColor = i % 3 !== 1;
      if (switchColor) {
        const [elOneIdx, elTwoIdx, shouldSwitch] = animations[i];
        const color = i % 3 === 2 ?
          PRIMARY_COLOR : shouldSwitch ?
            NEGATIVE_COLOR : POSITIVE_COLOR;
        await this.delay();
        arrayElements[elOneIdx].style.backgroundColor = color;
        arrayElements[elTwoIdx].style.backgroundColor = color;
      } else {
        let elOneIdx, elTwoIdx, elOneVal, elTwoVal
        if (animations[i] !== null) {
          [elOneIdx, elTwoIdx, elOneVal, elTwoVal] = animations[i];
        } else { continue }

        await this.delay();
        const elOne = arrayElements[elOneIdx];
        const elTwo = arrayElements[elTwoIdx];
        elOne.style.height = `${elOneVal / 2}%`;
        elTwo.style.height = `${elTwoVal / 2}%`;

        // Swap numbers inside inner html of div (if there are any)
        const temp = elOne.innerHTML;
        elOne.innerHTML = elTwo.innerHTML;
        elTwo.innerHTML = temp;
      }
    }
    this.sortedAnimation();
    this.setState({ arrayNums: sort[1] });
  }

  async mergeSort() {
    const sort = mergeSortAnimate(this.state.arrayNums);
    const animations = sort[0];
    // iterate thorugh animations array
    const arrayElements = document.getElementsByClassName('array-element');
    for (let i = 0; i < animations.length; i++) {
      const switchColor = i % 3 !== 1;
      if (switchColor) {
        // Get the first and second element being compared, and the k element where they will be merged to
        const [elOneIdx, elTwoIdx] = animations[i];
        const elOneStyle = arrayElements[elOneIdx].style;
        const elTwoStyle = arrayElements[elTwoIdx].style;

        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        await this.delay();
        elOneStyle.backgroundColor = color;
        elTwoStyle.backgroundColor = color;
      } else {
        const [elIdx, elHeight] = animations[i];
        await this.delay();
        const elStyle = arrayElements[elIdx].style;
        elStyle.height = `${elHeight / 2}%`;
        // Change number in div, if there is one
        if (this.state.numElements < 15) {
          arrayElements[elIdx].innerHTML = `${elHeight}`;
        }
      }
    }
    this.sortedAnimation();
    this.setState({ arrayNums: sort[1] });
  }

  async selectionSort() {
    const sort = selectionSortAnimate(this.state.arrayNums);
    const animations = sort[0];

    let i = 0;
    while (i < animations.length) {
      const arrayElements = document.getElementsByClassName('array-element');
      let tempI = 0;
      while (animations[i] !== "max found") {
        const colorCurrMin = tempI % 2 === 0;
        if (colorCurrMin) {
          const currMinStyle = arrayElements[animations[i]].style;
          currMinStyle.backgroundColor = SECONDARY_COLOR;
        } else {
          const currSearchingStyle = arrayElements[animations[i][0]].style;
          currSearchingStyle.backgroundColor = SECONDARY_COLOR;
          await this.delay();
          currSearchingStyle.backgroundColor = PRIMARY_COLOR;
          const changeCurrMin = animations[i][1];
          if (changeCurrMin) {
            const currMinStyle = arrayElements[animations[i][2]].style;
            currMinStyle.backgroundColor = PRIMARY_COLOR;
          }
        }
        i++;
        tempI++;
      }
      i++;
      i++;
      const swapEl = arrayElements[animations[i][0]];
      const currMinEl = arrayElements[animations[i][1]];

      swapEl.style.backgroundColor = NEGATIVE_COLOR;
      currMinEl.style.backgroundColor = POSITIVE_COLOR;
      await this.delay();

      swapEl.style.height = `${animations[i][3] / 2}%`;
      currMinEl.style.height = `${animations[i][2] / 2}%`;
      let temp = swapEl.innerHTML;
      swapEl.innerHTML = currMinEl.innerHTML;
      currMinEl.innerHTML = temp;

      swapEl.style.backgroundColor = PRIMARY_COLOR;
      currMinEl.style.backgroundColor = PRIMARY_COLOR;
      i++;
    }

    this.sortedAnimation();
    this.setState({ arrayNums: sort[1] });
  }


  // So that the slider can affect the number of elements in the array
  changeNumElements(e) {
    this.setState({ numElements: e.target.value }, this.genNewArray);
  }

  changeSpeed(e) {
    this.setState({ speed: e.target.value });
  }

  handleAlgoChoice(algo) {
    this.setState({ algorithm: algo });
  }

  async sortAlgo() {
    this.setState({ inputDisabled: true });
    for (let i = 0; i < this.sortingAlgorithms.length; i++) {
      const algo = this.sortingAlgorithms[i]
      if (this.state.algorithm === algo[0]) {
        await algo[1]();
        this.setState({ inputDisabled: false });
        break;
      }
    }
  }

  // Generates a new array when the component mounts
  componentDidMount() {
    this.genNewArray();
  }

  // Method to generate a new array
  genNewArray() {
    const arrayNums = [];
    for (let i = 0; i < this.state.numElements; i++) {
      arrayNums.push(Math.floor(Math.random() * 195 + 5));
    }
    this.setState({ arrayNums });
  }

  render() {
    let sortBtn = null;
    if (this.state.algorithm !== "Choose an Algorithm") {
      sortBtn = <div className="nav-item nav-button" disabled={this.state.inputDisabled} onClick={this.sortAlgo}>Sort!</div>
    }

    let numElements = this.state.numElements;
    if (numElements < 10) {
      numElements = `00${numElements}`;
    } else if (numElements < 100) {
      numElements = `0${numElements}`;
    }

    return (
      <div id="app">
        <div className="nav">
          <strong>Sorting Visualizer</strong>
          <Dropdown handleChoice={this.handleAlgoChoice} options={this.sortingAlgorithms.map(item => (item[0]))} displayValue={this.state.algorithm} />
          <div className="nav-item">
            <label htmlFor="num-elements"># of Elements ({numElements}): </label>
            <input type="range" disabled={(this.state.inputDisabled)} value={this.state.numElements} min="5" max="100" step="1" name="num-elements" onChange={this.changeNumElements}></input>
          </div>
          <div className="nav-item">
            <label htmlFor="sort-speed">Speed: </label>
            <input type="range" value={this.state.speed} min="0" max="999" step="1" name="sort-speed" onChange={this.changeSpeed}></input>
          </div>
          {sortBtn}
          <div className="nav-item nav-button" onClick={this.genNewArray}>Generate New Array</div>
        </div>
        <div className="array">
          {this.state.arrayNums.map((number, index) => (
            <ArrayEl value={number} key={index} position={index} numElements={this.state.numElements} />
          ))}
        </div>
      </div>
    );
  }
}
