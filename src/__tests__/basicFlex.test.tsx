import React, { StrictMode } from "react";
import { HBox, VBox } from "../Layout";
import "regenerator-runtime";
import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach } from "vitest";
import { wait } from "./wait.js";

interface BoxProps {
    width: number;
    height: number;
    centered?: boolean;
}

const App: React.FC<BoxProps> = ({ width, height }) => {
    return (
        <StrictMode>
            <div className="App1">
                <HBox id="root" width={width} height={height}>
                    <VBox id="child1" width="10%"></VBox>
                    <VBox id="child2" width="20%"></VBox>
                    <VBox id="child3" width="70%" height={20}></VBox>
                </HBox>
            </div>
        </StrictMode>
    );
};

const App2: React.FC<BoxProps> = ({ width, height, centered }) => {
    return (
        <StrictMode>
            <div className="App2">
                <HBox id="root" centered={centered} width={width} height={height}>
                    <VBox id="child1" width={10}></VBox>
                    <VBox id="child2" width={10}></VBox>
                    <VBox id="child3" width={20}></VBox>
                </HBox>
            </div>
        </StrictMode>
    );
};

const App3: React.FC<BoxProps> = ({ width, height, centered }) => {
    return (
        <StrictMode>
            <div className="App3">
                <VBox id="root" centered={centered} width={width} height={height}>
                    <VBox id="child1" height={10}></VBox>
                    <VBox id="child2" height={10}></VBox>
                    <VBox id="child3" height={20}></VBox>
                </VBox>
            </div>
        </StrictMode>
    );
};


describe("App", () => {
    afterEach(() => {
        // this is necessary
        cleanup();
    });
    it("basic flex layout", async () => {
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

        expect(child1).toHaveStyle("left: 0px");
        expect(child1).toHaveStyle("width: 10px");
        expect(child1).toHaveStyle("height: 50px");
        expect(child2).toHaveStyle("left: 10px");
        expect(child2).toHaveStyle("width: 20px");
        expect(child2).toHaveStyle("height: 50px");
        expect(child3).toHaveStyle("top: 0px");
        expect(child3).toHaveStyle("left: 30px");
        expect(child3).toHaveStyle("width: 70px");
        expect(child3).toHaveStyle("height: 20px");
    });

    it("HBox parent basic flex layout, centered and not centered", async () => {
        const { rerender } = render(<App2 width={100} centered={true} height={50} />);
        await wait(50);
        const root = screen.getByTestId("root")
        const child1 = screen.getByTestId("child1")
        const child2 = screen.getByTestId("child2")
        const child3 = screen.getByTestId("child3")


        expect(root).toHaveStyle("left: 0px");
        expect(root).toHaveStyle("top: 0px");
        expect(root).toHaveStyle("height: 50px");
        expect(root).toHaveStyle("width: 100px");

        expect(child1).toHaveStyle("left: 30px");
        expect(child1).toHaveStyle("width: 10px");
        expect(child1).toHaveStyle("height: 50px");
        expect(child2).toHaveStyle("left: 40px");
        expect(child2).toHaveStyle("width: 10px");
        expect(child2).toHaveStyle("height: 50px");
        expect(child3).toHaveStyle("top: 0px");
        expect(child3).toHaveStyle("left: 50px");
        expect(child3).toHaveStyle("width: 20px");
        expect(child3).toHaveStyle("height: 50px");
        rerender(<App2 width={100} centered={false} height={50} />);
        expect(child1).toHaveStyle("left: 0px");
        expect(child1).toHaveStyle("width: 10px");
        expect(child1).toHaveStyle("height: 50px");
        expect(child2).toHaveStyle("left: 10px");
        expect(child2).toHaveStyle("width: 10px");
        expect(child2).toHaveStyle("height: 50px");
        expect(child3).toHaveStyle("top: 0px");
        expect(child3).toHaveStyle("left: 20px");
        expect(child3).toHaveStyle("width: 20px");
        expect(child3).toHaveStyle("height: 50px");
    });

    it("VBox parent basic flex layout, centered and not centered", async () => {
        const { rerender } = render(<App3 width={50} centered={true} height={100} />);
        await wait(50);

        const root = screen.getByTestId("root")
        const child1 = screen.getByTestId("child1")
        const child2 = screen.getByTestId("child2")
        const child3 = screen.getByTestId("child3")

        expect(root).toHaveStyle("top: 0px");
        expect(root).toHaveStyle("left: 0px");
        expect(root).toHaveStyle("width: 50px");
        expect(root).toHaveStyle("height: 100px");

        expect(child1).toHaveStyle("top: 30px");
        expect(child1).toHaveStyle("height: 10px");
        expect(child1).toHaveStyle("width: 50px");
        expect(child2).toHaveStyle("top: 40px");
        expect(child2).toHaveStyle("height: 10px");
        expect(child2).toHaveStyle("width: 50px");
        expect(child3).toHaveStyle("left: 0px");
        expect(child3).toHaveStyle("top: 50px");
        expect(child3).toHaveStyle("height: 20px");
        expect(child3).toHaveStyle("width: 50px");
        rerender(<App3 width={50} centered={false} height={100} />);
        expect(child1).toHaveStyle("top: 0px");
        expect(child1).toHaveStyle("height: 10px");
        expect(child1).toHaveStyle("width: 50px");
        expect(child2).toHaveStyle("top: 10px");
        expect(child2).toHaveStyle("height: 10px");
        expect(child2).toHaveStyle("width: 50px");
        expect(child3).toHaveStyle("left: 0px");
        expect(child3).toHaveStyle("top: 20px");
        expect(child3).toHaveStyle("height: 20px");
        expect(child3).toHaveStyle("width: 50px");
    });
});
