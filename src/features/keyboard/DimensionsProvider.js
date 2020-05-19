import React from "react";
import Dimensions from "react-dimensions";

const DimensionsProvider = (props) => {
  return (
    <div>
      {props.children({
        containerWidth: props.containerWidth,
        containerHeight: props.containerHeight,
      })}
    </div>
  );
};

export default Dimensions()(DimensionsProvider);
