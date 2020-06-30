import React from "react";
import "./Grid.css";

const Grid = (props) => {
  const item = [];
  for (let i = 1; i < props.range; i++) {
    item.push(<div className="grid-item" key={i}></div>);
  }
  return <div className="piano-grid">{item}</div>;
};

export { Grid };
