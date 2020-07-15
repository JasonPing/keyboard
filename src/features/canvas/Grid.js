import React, { useRef, useEffect, useState } from "react";
import "./Grid.css";

const GridItem = () => {
  return <div className="grid-item"></div>;
};
const Grid = React.forwardRef((props, ref) => {
  const range = props.last - props.first + 1;

  return (
    <div className="piano-grid" ref={ref}>
      {Array(range)
        .fill()
        .map((_, i) => {
          return <GridItem key={i} />;
        })}
    </div>
  );
});
export { Grid };
