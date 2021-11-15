import React, { Dispatch, useState } from "react";
import { mount } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { HBox, VBox } from "../Layout";
import "regenerator-runtime";
import { act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

interface Setter {
  [key: string]: {
    setWidth: Dispatch<React.SetStateAction<number | undefined>>;
    setHeight: Dispatch<React.SetStateAction<number | undefined>>;
    setFlex: Dispatch<React.SetStateAction<number | undefined>>;
  };
}
interface DBoxProps {
  setter: Setter;
  id: string;
  width?: number;
  height?: number;
  flex?: number;
}
const DynamicVBox: React.FC<DBoxProps> = ({
  setter,
  id,
  width,
  height,
  flex,
  ...props
}) => {
  const [lwidth, setWidth] = useState(width);
  const [lheight, setHeight] = useState(height);
  const [lflex, setFlex] = useState(flex);
  setter[id] = { setWidth, setHeight, setFlex };
  return (
    <VBox id={id} width={lwidth} height={lheight} flex={lflex} {...props} />
  );
};

const App: React.FC<DBoxProps> = ({ width, height, setter }) => {
  return (
    <div className="App">
      <HBox id="root" width={width} height={height}>
        <DynamicVBox setter={setter} id="child1" flex={2}></DynamicVBox>
        <DynamicVBox setter={setter} id="child2" flex={2}></DynamicVBox>
        <DynamicVBox setter={setter} id="child3" width={20}></DynamicVBox>
      </HBox>
    </div>
  );
};

configure({ adapter: new Adapter() });

describe("App", () => {
  it("Test basic flex layouts with changing width/flex", async () => {
    const setter: Setter = {};
    const app = mount(
      <App id="base" width={100} height={50} setter={setter} />
    );
    //await wait(100);
    const root = app.find("#root").first().getDOMNode();
    const child1 = app.find("#child1").first().getDOMNode();
    const child2 = app.find("#child2").first().getDOMNode();
    const child3 = app.find("#child3").first().getDOMNode();

    expect(root).toHaveStyle("left: 0px");
    expect(root).toHaveStyle("top: 0px");
    expect(root).toHaveStyle("height: 50px");
    expect(root).toHaveStyle("width: 100px");

    expect(child1).toHaveStyle("left: 0px");
    expect(child1).toHaveStyle("width: 40px");
    expect(child1).toHaveStyle("height: 50px");
    expect(child2).toHaveStyle("left: 40px");
    expect(child2).toHaveStyle("width: 40px");
    expect(child2).toHaveStyle("height: 50px");
    expect(child3).toHaveStyle("top: 0px");
    expect(child3).toHaveStyle("left: 80px");
    expect(child3).toHaveStyle("width: 20px");
    expect(child3).toHaveStyle("height: 50px");

    act(() => setter.child3.setFlex(4));
    //await wait(100);
    expect(child1).toHaveStyle("left: 0px");
    expect(child1).toHaveStyle("width: 25px");
    expect(child1).toHaveStyle("height: 50px");
    expect(child2).toHaveStyle("left: 25px");
    expect(child2).toHaveStyle("width: 25px");
    expect(child2).toHaveStyle("height: 50px");
    expect(child3).toHaveStyle("top: 0px");
    expect(child3).toHaveStyle("left: 50px");
    expect(child3).toHaveStyle("width: 50px");
    expect(child3).toHaveStyle("height: 50px");

    await act(async () => {
      setter.child1.setFlex(undefined);
      setter.child1.setWidth(50);
      setter.child3.setFlex(2);
      //await wait(100);
    });
    //await wait(100);
    expect(child1).toHaveStyle("left: 0px");
    expect(child1).toHaveStyle("width: 50px");
    expect(child1).toHaveStyle("height: 50px");
    expect(child2).toHaveStyle("left: 50px");
    expect(child2).toHaveStyle("width: 25px");
    expect(child2).toHaveStyle("height: 50px");
    expect(child3).toHaveStyle("top: 0px");
    expect(child3).toHaveStyle("left: 75px");
    expect(child3).toHaveStyle("width: 25px");
    expect(child3).toHaveStyle("height: 50px");
  });
});
