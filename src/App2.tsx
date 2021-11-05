import { Fragment, useState } from "react";
import "./App.css";
import { AutoSize } from "./AutoSize";
import { HBox, Spacer, VBox } from "./Layout";
import { easeInQuad, linear, usePropertyAnimator } from "./usePropertyAnimator";
const boxShadow = { boxShadow: "0px 0px 0.5px 0.5px blue" };

const LeftPanel = ({ opened }) => {
  console.log("render");
  const wclose = usePropertyAnimator(200, 0.0, 500, linear, [opened]);
  const wopen = usePropertyAnimator(0.00001, 200, 500, linear, [opened]);
  return (
    <HBox
      style={boxShadow}
      displayName="LeftPanel"
      width={opened ? wopen : wclose}
      //width={0}
    ></HBox>
  );
};
function App2() {
  //let [width, setWidth] = useState(500);
  const [opened, setOpened] = useState<boolean>(true);

  // const wclose = 0.0;
  //const wopen = 200;
  return (
    <div className="App">
      <HBox height={700} width={1000} displayName="Root" style={boxShadow}>
        <Spacer size={20} />
        <LeftPanel opened={opened} />
        {/* <HBox
          style={boxShadow}
          displayName="LeftPanel"
          width={opened ? wopen : wclose}
          //width={0}
        ></HBox> */}
        <VBox
          flex={1}
          style={{ backgroundColor: "#FF0000" }}
          displayName="Contents"
        ></VBox>
      </HBox>
      <button value="Toggle" onClick={() => setOpened(!opened)}>
        Toggle
      </button>
    </div>
  );
}

export default App2;
