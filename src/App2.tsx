import { Fragment, useState } from "react";
import "./App.css";
import { HBox, Spacer, VBox } from "./Layout";
import { easeInQuad, usePropertyAnimator } from "./usePropertyAnimator";
const boxShadow = { boxShadow: "0px 0px 0.5px 0.5px blue" };

const LeftPanel = ({ opened }: { opened: boolean }) => {
  console.log("render");
  const wclose = usePropertyAnimator(200, 0.0, 500, easeInQuad, [opened]);
  const wopen = usePropertyAnimator(0.00001, 200, 500, easeInQuad, [opened]);
  return (
    <HBox
      style={boxShadow}
      displayName="LeftPanel"
      width={opened ? wopen : wclose}
    ></HBox>
  );
};
function App2() {
  const [opened, setOpened] = useState<boolean>(true);

  return (
    <div className="App">
      <HBox height={700} width={1000} displayName="Root" style={boxShadow}>
        <Spacer size={20} />
        <LeftPanel opened={opened} />
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
