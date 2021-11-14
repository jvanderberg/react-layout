import React from "react";
import { mount } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { HBox, VBox } from "../Layout";
import "regenerator-runtime";
import { act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { isExportDeclaration } from "typescript";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Unit = ({ level, children }) => (
  <VBox id={"l" + level + "root"}>
    <HBox>
      <VBox id={"l" + level + "1"} />
      <VBox id={"l" + level + "2"} />
    </HBox>
    <HBox>
      <VBox id={"l" + level + "3"} />
      <VBox id={"l" + level + "4"}>{children}</VBox>
    </HBox>
  </VBox>
);

function App({ width, height }) {
  return (
    <div className="App">
      <VBox width={width} height={height}>
        <Unit level={1}>
          <Unit level={2}>
            <Unit level={3}>
              <Unit level={4}>
                <Unit level={5}>
                  <Unit level={6}></Unit>
                </Unit>
              </Unit>
            </Unit>
          </Unit>
        </Unit>
      </VBox>
    </div>
  );
}

configure({ adapter: new Adapter() });

describe("App", () => {
  it("deep nesting", async () => {
    const app = mount(<App width={1000} height={1000} />);
    await wait(100);
    const root = app.find("#l6root").first().getDOMNode();
    const child1 = app.find("#l61").first().getDOMNode();
    const child2 = app.find("#l62").first().getDOMNode();
    const child3 = app.find("#l63").first().getDOMNode();
    const child4 = app.find("#l64").first().getDOMNode();

    expect(root).toHaveStyle("width: 31.25px");
    expect(root).toHaveStyle("height: 31.25px");
    expect(child4).toHaveStyle(`height: ${31.25 / 2}px`);
    expect(child4).toHaveStyle(`width: ${31.25 / 2}px`);
    app.setProps({ width: 10000, height: 100000 });
    await wait(100);
    expect(root).toHaveStyle("width: 312.5px");
    expect(root).toHaveStyle("height: 3125px");
    expect(child4).toHaveStyle(`height: ${3125 / 2}px`);
    expect(child4).toHaveStyle(`width: ${312.5 / 2}px`);
  });
});
