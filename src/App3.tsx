import { Fragment, useState } from "react";
import "./App.css";
import { AutoSize } from "./AutoSize";
import { HBox, Spacer, VBox } from "./Layout";
import { easeInQuad, usePropertyAnimator } from "./usePropertyAnimator";
const boxShadow = { boxShadow: "0px 0px 0.5px 0.5px blue" };

function App3() {
  const [opened, setOpened] = useState<boolean>(true);

  return (
    <div className="App">
      <AutoSize viewPort={true}>
        <VBox displayName="Root" centered={true}>
          <HBox centered={true} spacing="10%" height="75%">
            <VBox width="20%" style={boxShadow} displayName="Contents"></VBox>
            <VBox width="20%" style={boxShadow} displayName="Contents"></VBox>
            <VBox width="20%" style={boxShadow} displayName="Contents"></VBox>
          </HBox>
        </VBox>
      </AutoSize>
    </div>
  );
}

export default App3;
