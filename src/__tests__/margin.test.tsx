import { cleanup, render, screen } from '@testing-library/react';
import React from "react";
import { afterEach, describe, expect, it } from "vitest";
import { HBox, VBox } from "../Layout";
import { wait } from "./wait";

interface BoxProps {
    width: number;
    height: number;
    centered?: boolean;
}

const App: React.FC<BoxProps> = ({ width, height }) => {
    return (

        <div className="App">
            <HBox id="root" width={width} height={height}>
                <VBox id="child1" marginLeft={10} width="10%"></VBox>
                <VBox id="child2" width="20%"></VBox>
                <VBox id="child3" width="60%" height={20}></VBox>
            </HBox>
        </div>

    );
};

const App2: React.FC<BoxProps> = ({ width, height }) => {
    return (
        <div className="App">
            <HBox id="root" width={width} height={height}>
                <VBox id="child1" margin={10} height={20} width="10%"></VBox>
                <VBox id="child2" width="20%"></VBox>
                <VBox id="child3" width="50%" height={20}></VBox>
            </HBox>
        </div>
    );
};

describe("App", () => {
    afterEach(() => {
        // this is necessary
        cleanup();
    });
    it("basic flex layout with marginLeft", async () => {
        render(<App width={100} height={50} />);
        await wait(50);

        const root = screen.getByTestId("root")
        const child1 = screen.getByTestId("child1")
        const child2 = screen.getByTestId("child2")
        const child3 = screen.getByTestId("child3")


        expect(root).toHaveStyle("left: 0px");
        expect(root).toHaveStyle("top: 0px");
        expect(root).toHaveStyle("height: 50px");
        expect(root).toHaveStyle("width: 100px");

        expect(child1).toHaveStyle("left: 10px");
        expect(child1).toHaveStyle("width: 10px");
        expect(child1).toHaveStyle("height: 50px");
        expect(child2).toHaveStyle("left: 20px");
        expect(child2).toHaveStyle("width: 20px");
        expect(child2).toHaveStyle("height: 50px");
        expect(child3).toHaveStyle("top: 0px");
        expect(child3).toHaveStyle("left: 40px");
        expect(child3).toHaveStyle("width: 60px");
        expect(child3).toHaveStyle("height: 20px");
    });

    it("basic flex layout with margin", () => {
        render(<App2 width={100} height={50} />);
        const root = screen.getByTestId("root")
        const child1 = screen.getByTestId("child1")
        const child2 = screen.getByTestId("child2")
        const child3 = screen.getByTestId("child3")

        expect(root).toHaveStyle("left: 0px");
        expect(root).toHaveStyle("top: 0px");
        expect(root).toHaveStyle("height: 50px");
        expect(root).toHaveStyle("width: 100px");

        expect(child1).toHaveStyle("left: 10px");
        expect(child1).toHaveStyle("width: 10px");
        expect(child1).toHaveStyle("height: 20px");
        expect(child1).toHaveStyle("top: 10px");

        expect(child2).toHaveStyle("left: 30px");
        expect(child2).toHaveStyle("width: 20px");
        expect(child2).toHaveStyle("height: 50px");
        expect(child3).toHaveStyle("top: 0px");
        expect(child3).toHaveStyle("left: 50px");
        expect(child3).toHaveStyle("width: 50px");
        expect(child3).toHaveStyle("height: 20px");
    });
});
