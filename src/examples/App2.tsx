import React, { useState } from "react";
import { HBox, Spacer, VBox } from "../Layout";
import { easeInQuad, usePropertyAnimator } from "./usePropertyAnimator";
const boxShadow = { boxShadow: "0px 0px 0.5px 0.5px blue" };

const LeftPanel = ({ opened }: { opened: boolean }) => {
  const wclose = usePropertyAnimator(200, 0.0, 500, easeInQuad, [opened]);
  const wopen = usePropertyAnimator(0.00001, 200, 500, easeInQuad, [opened]);
  return <HBox style={boxShadow} width={opened ? wopen : wclose}></HBox>;
};
function App2() {
  const [opened, setOpened] = useState<boolean>(true);

  return (
    <div className="App">
      <HBox height={700} width={1000} style={boxShadow}>
        <Spacer size={20} />
        <LeftPanel opened={opened} />
        <VBox flex={1} style={{ backgroundColor: "#FF0000" }}></VBox>
      </HBox>
      <button value="Toggle" onClick={() => setOpened(!opened)}>
        Toggle
      </button>
    </div>
  );
}

export default App2;
