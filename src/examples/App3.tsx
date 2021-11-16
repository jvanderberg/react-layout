import { AutoSize } from "../AutoSize";
import { HBox, VBox } from "../Layout";
import React from "react";
const boxShadow = { boxShadow: "0px 0px 0.5px 0.5px blue" };

function App3() {
  return (
    <div className="App">
      <AutoSize viewPort={true}>
        <VBox centered={true}>
          <HBox centered={true} spacing="10%" height="75%">
            <VBox width="20%" style={boxShadow}></VBox>
            <VBox width="20%" style={boxShadow}></VBox>
            <VBox width="20%" style={boxShadow}></VBox>
          </HBox>
        </VBox>
      </AutoSize>
    </div>
  );
}

export default App3;
