import { Fragment, useState } from "react";
import "./App.css";
import { AutoSize } from "./AutoSize";
import { HBox, VBox } from "./Layout";
import { easeInQuad, linear, usePropertyAnimator } from "./usePropertyAnimator";
const boxShadow = { boxShadow: "0px 0px 0.5px 0.5px blue" };

function App2() {
  //let [width, setWidth] = useState(500);
  const [opened, setOpened] = useState<boolean>(true);
  const wclose = usePropertyAnimator(200, 1, 500, easeInQuad, [opened]);
  const wopen = usePropertyAnimator(1, 200, 500, easeInQuad, [opened]);
  return (
    <div className="App">
      <HBox height={700} width={1000} displayName="Root" style={boxShadow}>
        <HBox
          style={boxShadow}
          displayName="LeftPanel"
          width={opened ? wopen : wclose}
        ></HBox>
        <VBox
          flex={1}
          style={{ backgroundColor: "#FF0000" }}
          displayName="Contents"
        >
          <VBox
            flex={1}
            displayName={"breaker"}
            style={{ backgroundColor: "#00FF00" }}
          ></VBox>
        </VBox>
      </HBox>
      <button value="Toggle" onClick={() => setOpened(!opened)}>
        Toggle
      </button>
    </div>
  );
}

export default App2;
