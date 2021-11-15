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
      <HBox
        id="root"
        paddingLeft={10}
        paddingTop={2}
        width={width}
        height={height}
      >
        <VBox id="child1" flex={1}></VBox>
        <VBox id="child2" flex={2}></VBox>
        <VBox id="child3" flex={7} height={20}></VBox>
      </HBox>
    </div>
  );
};

const App2: React.FC<BoxProps> = ({ width, height, centered }) => {
  return (
    <div className="App">
      <HBox
        id="root"
        padding={10}
        centered={centered}
        width={width}
        height={height}
      >
        <VBox id="child1" width={10}></VBox>
        <VBox id="child2" width={10}></VBox>
        <VBox id="child3" width={20}></VBox>
      </HBox>
    </div>
  );
};

const App3: React.FC<BoxProps> = ({ width, height, centered }) => {
  return (
    <div className="App">
      <VBox
        id="root"
        padding={10}
        centered={centered}
        width={width}
        height={height}
      >
        <VBox id="child1" height={10}></VBox>
        <VBox id="child2" height={10}></VBox>
        <VBox id="child3" height={20}></VBox>
      </VBox>
    </div>
  );
};

configure({ adapter: new Adapter() });

describe("App", () => {
  it("basic flex layout with padding", () => {
    const app = mount(<App width={110} height={50} />);
    const root = app.find("#root").first().getDOMNode();
    const child1 = app.find("#child1").first().getDOMNode();
    const child2 = app.find("#child2").first().getDOMNode();
    const child3 = app.find("#child3").first().getDOMNode();

    expect(root).toHaveStyle("left: 0px");
    expect(root).toHaveStyle("top: 0px");
    expect(root).toHaveStyle("height: 50px");
    expect(root).toHaveStyle("width: 110px");

    expect(child1).toHaveStyle("left: 10px");
    expect(child1).toHaveStyle("width: 10px");
    expect(child1).toHaveStyle("height: 48px");
    expect(child2).toHaveStyle("left: 20px");
    expect(child2).toHaveStyle("width: 20px");
    expect(child2).toHaveStyle("height: 48px");
    expect(child3).toHaveStyle("top: 2px");
    expect(child3).toHaveStyle("left: 40px");
    expect(child3).toHaveStyle("width: 70px");
    expect(child3).toHaveStyle("height: 20px");
  });

  it("HBox parent basic flex layout, centered and not centered with padding", () => {
    const app = mount(<App2 width={120} centered={true} height={70} />);
    const root = app.find("#root").first().getDOMNode();
    const child1 = app.find("#child1").first().getDOMNode();
    const child2 = app.find("#child2").first().getDOMNode();
    const child3 = app.find("#child3").first().getDOMNode();

    expect(root).toHaveStyle("left: 0px");
    expect(root).toHaveStyle("top: 0px");
    expect(root).toHaveStyle("height: 70px");
    expect(root).toHaveStyle("width: 120px");

    expect(child1).toHaveStyle("left: 40px");
    expect(child1).toHaveStyle("width: 10px");
    expect(child1).toHaveStyle("height: 50px");
    expect(child2).toHaveStyle("left: 50px");
    expect(child2).toHaveStyle("width: 10px");
    expect(child2).toHaveStyle("height: 50px");
    expect(child3).toHaveStyle("top: 10px");
    expect(child3).toHaveStyle("left: 60px");
    expect(child3).toHaveStyle("width: 20px");
    expect(child3).toHaveStyle("height: 50px");
    app.setProps({ width: 120, height: 70, centered: false });
    expect(child1).toHaveStyle("left: 10px");
    expect(child1).toHaveStyle("width: 10px");
    expect(child1).toHaveStyle("height: 50px");
    expect(child2).toHaveStyle("left: 20px");
    expect(child2).toHaveStyle("width: 10px");
    expect(child2).toHaveStyle("height: 50px");
    expect(child3).toHaveStyle("top: 10px");
    expect(child3).toHaveStyle("left: 30px");
    expect(child3).toHaveStyle("width: 20px");
    expect(child3).toHaveStyle("height: 50px");
  });

  it("VBox parent basic flex layout, centered and not centered with padding", () => {
    const app = mount(<App3 width={70} centered={true} height={120} />);
    const root = app.find("#root").first().getDOMNode();
    const child1 = app.find("#child1").first().getDOMNode();
    const child2 = app.find("#child2").first().getDOMNode();
    const child3 = app.find("#child3").first().getDOMNode();

    expect(root).toHaveStyle("top: 0px");
    expect(root).toHaveStyle("left: 0px");
    expect(root).toHaveStyle("width: 70px");
    expect(root).toHaveStyle("height: 120px");

    expect(child1).toHaveStyle("top: 40px");
    expect(child1).toHaveStyle("height: 10px");
    expect(child1).toHaveStyle("width: 50px");
    expect(child2).toHaveStyle("top: 50px");
    expect(child2).toHaveStyle("height: 10px");
    expect(child2).toHaveStyle("width: 50px");
    expect(child3).toHaveStyle("left: 10px");
    expect(child3).toHaveStyle("top: 60px");
    expect(child3).toHaveStyle("height: 20px");
    expect(child3).toHaveStyle("width: 50px");
    app.setProps({ width: 70, height: 120, centered: false });
    expect(child1).toHaveStyle("top: 10px");
    expect(child1).toHaveStyle("height: 10px");
    expect(child1).toHaveStyle("width: 50px");
    expect(child2).toHaveStyle("top: 20px");
    expect(child2).toHaveStyle("height: 10px");
    expect(child2).toHaveStyle("width: 50px");
    expect(child3).toHaveStyle("left: 10px");
    expect(child3).toHaveStyle("top: 30px");
    expect(child3).toHaveStyle("height: 20px");
    expect(child3).toHaveStyle("width: 50px");
  });
});
