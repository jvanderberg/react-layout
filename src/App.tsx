import { Fragment } from "react";
import "./App.css";
import { AutoSize } from "./AutoSize";
import { HBox, Spacer, VBox } from "./Layout";
const boxShadow = { boxShadow: "0px 0px 0.5px 0.5px blue" };
interface ContentsType {
  children?: any;
  color: string;
}

const Contents = ({ children, color }: ContentsType) => {
  const boxShadow = { boxShadow: "0px 0px 0.5px 0.5px " + color };

  return (
    <Fragment>
      <HBox displayName="ContentsRoot">
        <VBox width={"20%"} style={boxShadow} displayName="Child1">
          <VBox style={boxShadow} displayName="Child1-1"></VBox>
          <VBox style={boxShadow} displayName="Child1-2"></VBox>
          <VBox style={boxShadow} displayName="Child1-3"></VBox>
        </VBox>
        <VBox width={"60%"} style={boxShadow} displayName="Child2">
          <VBox flex={1} style={boxShadow} displayName="Child2-1"></VBox>
          <VBox flex={3} style={boxShadow} displayName="Child2-2">
            {children}
          </VBox>
          <VBox flex={1} style={boxShadow} displayName="Child1"></VBox>
        </VBox>
        <VBox width={"20%"} style={boxShadow} displayName="Child3">
          <VBox style={boxShadow} displayName="Child3-1"></VBox>
          <VBox style={boxShadow} displayName="Child3-2"></VBox>
          <VBox style={boxShadow} displayName="Child3-3"></VBox>
        </VBox>
      </HBox>
    </Fragment>
  );
};
function App() {
  return (
    <div className="App">
      <AutoSize viewPort={true}>
        <HBox displayName="Root">
          <Contents color="blue">
            <Contents color="black">
              <Contents color="green">
                <Contents color="orange">
                  <Contents color="black">
                    <Contents color="gray">
                      <Contents color="black">
                        <Contents color="green">
                          <Contents color="orange">
                            <Contents color="black">
                              <Contents color="gray"></Contents>
                            </Contents>
                          </Contents>
                        </Contents>
                      </Contents>
                    </Contents>
                  </Contents>
                </Contents>
              </Contents>
            </Contents>
          </Contents>
        </HBox>
      </AutoSize>
    </div>
  );
}

export default App;
