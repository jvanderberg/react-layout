import React, { StrictMode } from "react";
import { HBox, VBox } from "../Layout";
import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach } from "vitest";

interface BoxProps {
    width: number;
    height: number;
    centered?: boolean;
}

const App: React.FC<BoxProps> = ({ width, height }) => {
    return (
        <StrictMode>
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
        </StrictMode>
    );
};

const App2: React.FC<BoxProps> = ({ width, height, centered }) => {
    return (
        <StrictMode>
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
        </StrictMode>
    );
};

const App3: React.FC<BoxProps> = ({ width, height, centered }) => {
    return (
        <StrictMode>
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
        </StrictMode>
    );
};


describe("App", () => {
    afterEach(() => {
        // this is necessary
        cleanup();
    });
    it("basic flex layout with padding", () => {
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
        const { rerender } = render(<App2 width={120} centered={true} height={70} />);
        const root = screen.getByTestId("root")
        const child1 = screen.getByTestId("child1")
        const child2 = screen.getByTestId("child2")
        const child3 = screen.getByTestId("child3")


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

        rerender(<App2 width={120} centered={false} height={70} />);
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
        const { rerender } = render(<App3 width={70} centered={true} height={120} />);
        const root = screen.getByTestId("root")
        const child1 = screen.getByTestId("child1")
        const child2 = screen.getByTestId("child2")
        const child3 = screen.getByTestId("child3")

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
        rerender(<App3 width={70} centered={false} height={120} />);

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
