import React from "react";
import { mount } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { HBox, VBox } from "../Layout";
import "regenerator-runtime";
import { act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function App3() {
  return (
    <div className="App">
      <VBox
        id="root"
        displayName="Root"
        width={100}
        height={100}
        centered={true}
      >
        <HBox id="centered" centered={true} spacing="10%" height="75%">
          <VBox id="child1" width="20%" displayName="Contents"></VBox>
          <VBox id="child2" width="20%" displayName="Contents"></VBox>
          <VBox id="child3" width="20%" displayName="Contents"></VBox>
        </HBox>
      </VBox>
    </div>
  );
}

configure({ adapter: new Adapter() });

describe("App", () => {
  it("renders the title", async () => {
    const app = mount(<App3 />);
    await wait(100);
    console.log(app.find("#child2").first().html());

    expect(app.find("#child1").first().getDOMNode()).toHaveStyle("left: 10px");
  });
});
