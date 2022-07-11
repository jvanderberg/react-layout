import React, { StrictMode } from "react";
import { HBox, VBox } from "../Layout";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from '@testing-library/react'

interface BoxProps {
    width: number;
    height: number;
    centered?: boolean;
}

const App: React.FC<BoxProps> = ({ width, height }) => {
    return (
        <StrictMode>
            <div className="App">
                <HBox id="root" width={width} height={height}>
                    <VBox id="child1" marginLeft={10} flex={1}></VBox>
                    <VBox id="child2" flex={2}></VBox>
                    <VBox id="child3" flex={7} height={20}></VBox>
                </HBox>
            </div>
        </StrictMode>
    );
};

const App2: React.FC<BoxProps> = ({ width, height }) => {
    return (
        <div className="App">
            <HBox id="root" width={width} height={height}>
                <VBox id="child1" margin={10} height={20} flex={1}></VBox>
                <VBox id="child2" flex={2}></VBox>
                <VBox id="child3" flex={7} height={20}></VBox>
            </HBox>
        </div>
    );
};


describe("App", () => {
    it("basic flex layout with marginLeft", () => {
        render(<App width={110} height={50} />);
        const root = screen.getByTestId("root")
        const child1 = screen.getByTestId("child1")
        const child2 = screen.getByTestId("child2")
        const child3 = screen.getByTestId("child3")


        expect(root).toHaveStyle("left: 0px");
        expect(root).toHaveStyle("top: 0px");
        expect(root).toHaveStyle("height: 50px");
        expect(root).toHaveStyle("width: 110px");

        expect(child1).toHaveStyle("left: 10px");
        expect(child1).toHaveStyle("width: 10px");
        expect(child1).toHaveStyle("height: 50px");
        expect(child2).toHaveStyle("left: 20px");
        expect(child2).toHaveStyle("width: 20px");
        expect(child2).toHaveStyle("height: 50px");
        expect(child3).toHaveStyle("top: 0px");
        expect(child3).toHaveStyle("left: 40px");
        expect(child3).toHaveStyle("width: 70px");
        expect(child3).toHaveStyle("height: 20px");
    });

    it("basic flex layout with margin", () => {
        render(<App2 width={120} height={50} />);
        const root = screen.getByTestId("root")
        const child1 = screen.getByTestId("child1")
        const child2 = screen.getByTestId("child2")
        const child3 = screen.getByTestId("child3")

        expect(root).toHaveStyle("left: 0px");
        expect(root).toHaveStyle("top: 0px");
        expect(root).toHaveStyle("height: 50px");
        expect(root).toHaveStyle("width: 120px");

        expect(child1).toHaveStyle("left: 10px");
        expect(child1).toHaveStyle("width: 10px");
        expect(child1).toHaveStyle("height: 20px");
        expect(child1).toHaveStyle("top: 10px");

        expect(child2).toHaveStyle("left: 30px");
        expect(child2).toHaveStyle("width: 20px");
        expect(child2).toHaveStyle("height: 50px");
        expect(child3).toHaveStyle("top: 0px");
        expect(child3).toHaveStyle("left: 50px");
        expect(child3).toHaveStyle("width: 70px");
        expect(child3).toHaveStyle("height: 20px");
    });
});
