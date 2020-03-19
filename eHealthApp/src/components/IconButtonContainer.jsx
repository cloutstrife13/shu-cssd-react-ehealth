import React from "react";

const IconButtonContainer = props => {
  const styles = {
    exerciseIcons: {
      display: "flex",
      justifyContent: "space-around"
    }
  };

  return (
    <div style={{ ...styles.exerciseIcons, ...props.style }}>
      {props.children}
    </div>
  );
};

export default IconButtonContainer;
