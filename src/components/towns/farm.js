import React from "react";
import Structure from "../structure";

const Farm = ({ disabled }) => {
  return (
    <>
      <Structure
        name="Granja"
        image={"/assets/images/farm.webp"}
        data={{}}
        disabled={disabled}
      />
    </>
  );
};

export default Farm;
