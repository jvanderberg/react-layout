import React from "react";
import { mount } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { HBox, VBox } from "../Layout";
import "regenerator-runtime";
import "@testing-library/jest-dom/extend-expect";

interface BoxProps {
  width: number;
  height: number;
  centered?: boolean;
}
const App: React.FC<BoxProps> = ({ width, height }) => {
  return (
    <div className="App">
      <VBox id="root" width={width} height={height} centered={true}>
        <HBox id="centered" centered={true} spacing="10%" height="75%">
          <VBox id="child1" width="20%"></VBox>
          <VBox id="child2" width="20%"></VBox>
          <VBox id="child3" width="20%"></VBox>
        </HBox>
      </VBox>
    </div>
  );
};

configure({ adapter: new Adapter() });

describe("App", () => {
  it("basic proportional layout, centered with spacing", () => {
    const app = mount(<App width={100} height={100} />);
    const centered = app.find("#centered").first().getDOMNode();
    const child1 = app.find("#child1").first().getDOMNode();
    const child2 = app.find("#child2").first().getDOMNode();
    expect(centered).toHaveStyle("left: 0px");
    expect(centered).toHaveStyle("top: 12.5px");
    expect(centered).toHaveStyle("width: 100px");
    expect(centered).toHaveStyle("height: 75px");

    expect(child1).toHaveStyle("left: 10px");
    expect(child1).toHaveStyle("width: 20px");
    expect(child1).toHaveStyle("height: 75px");
    expect(child2).toHaveStyle("left: 40px");
    expect(child2).toHaveStyle("width: 20px");
    expect(child2).toHaveStyle("height: 75px");

    app.setProps({ width: 200, height: 400 });
    expect(centered).toHaveStyle("left: 0px");
    expect(centered).toHaveStyle("top: 50px");
    expect(centered).toHaveStyle("width: 200px");
    expect(centered).toHaveStyle("height: 300px");
    expect(child2).toHaveStyle("left: 80px");
    expect(child2).toHaveStyle("width: 40px");
    expect(child2).toHaveStyle("height: 300px");
  });
});