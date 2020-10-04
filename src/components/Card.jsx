import React from "react";

// const style = {
//   width: "8rem"
// };

const imgStyle = {
  width: "8rem",
  height: "8rem"
};

export default function Card(props) {
  return (
    <div
      className="card"
      //style={style}
      onClick={() => props.handleClick(props.id)}
    >
      <img
        className="card-img-top"
        src={props.src}
        alt={props.img}
        style={imgStyle}
      />
    </div>
  );
}
