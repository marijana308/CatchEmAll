import React, { Component } from "react";
import Card from "./Card.jsx";
import images from "../pokemonImages.json";
import ReactDOM from "react-dom";

const style = {
  // cardContainer: {
  //   display: "grid",
  //   padding: "1rem",
  //   gridTemplateColumns: "repeat(10, 1fr)",
  //   marginTop: "4rem"
  // },
  info: {
    marginTop: "8rem"
  },
  hide: {
    fontFamily: "Kavoon",
    textAlign: "center",
    fontSize: "2rem",
    color: "#1a60b1",
    padding: "0.5rem",
    display: "none"
  },
  show: {
    fontFamily: "Kavoon",
    textAlign: "center",
    fontSize: "2rem",
    color: "#1a60b1",
    padding: "0.5rem",
    display: "block"
  }
};

export class CardContainer extends Component {
  state = {
    images: images,
    clickedImages: [],
    score: 0,
    high_score: 0,
    message: "",
    href: "#",
    framework: ""
  };

  //See Fisher-Yates shuffle in action! https://bost.ocks.org/mike/shuffle/
  shuffle = array => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  handleClick = id => {
    let clickedImages = this.state.clickedImages;
    let item = images.filter(image => id === image.id);

    let score = document.getElementById("score");
    let rules = document.getElementById("rules");

    ReactDOM.findDOMNode(score).style.display = "block";
    ReactDOM.findDOMNode(rules).style.display = "none";

    if (this.state.clickedImages.includes(item[0].img)) {
      this.setState({ images: images });
      this.setState({ clickedImages: [] });
      if (this.state.score > this.state.high_score) {
        this.setState({ high_score: this.state.score });
      }
      this.setState({ score: 0 });
      this.setState({ message: "RESET" });
    } else {
      clickedImages.push(item[0].img);
      this.setState({ clickedImages: clickedImages });
      this.setState({ score: this.state.score + 1 });
      this.setState({ images: this.shuffle(images) });
      this.setState({ message: "CORRECT" });
      this.setState({ framework: item[0].img });
    }
  };

  render() {
    return (
      <div style={style.info}>
        {/* <p className="help">?</p> */}
        <p id="score" style={style.hide}>
          Score: {this.state.score} | HighScore: {this.state.high_score}
        </p>
        <p id="rules" style={style.show}>
          Click on the pokemon to catch it but clicking a pokemon twice will
          reset.
        </p>
        {/* <p>{this.state.message}</p>
        <p>Pokemon: {this.state.framework}</p> */}
        <div className="cardContainer" style={style.cardContainer}>
          {images.map(image => (
            <Card
              id={image.id}
              key={image.id}
              src={image.src}
              name={image.img}
              clicked={image.clicked}
              handleClick={this.handleClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default CardContainer;
