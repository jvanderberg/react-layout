import { cleanup, render, screen } from '@testing-library/react';
import React, { ReactNode, StrictMode } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { HBox, VBox } from "../Layout";
import { wait } from "./wait.js";

interface UnitProps {
    level: number;
    children?: ReactNode
}
const Unit: React.FC<UnitProps> = ({ level, children }) => (

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

interface BoxProps {
    width: number;
    height: number;
}
const App: React.FC<BoxProps> = ({ width, height }) => {
    return (
        <StrictMode>
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
        </StrictMode>
    );
};


describe("App", () => {
    afterEach(() => {
        // this is necessary
        cleanup();
    });
    it("deep nesting", async () => {
        const { rerender } = render(<App width={1000} height={1000} />);

        await wait(100);
        const root = screen.getByTestId("l6root");
        const child4 = screen.getByTestId("l64");
        expect(root).toHaveStyle("width: 31.25px");
        expect(root).toHaveStyle("height: 31.25px");
        expect(child4).toHaveStyle(`height: ${31.25 / 2}px`);
        expect(child4).toHaveStyle(`width: ${31.25 / 2}px`);
        rerender(<App width={10000} height={100000} />);
        expect(root).toHaveStyle("width: 312.5px");
        expect(root).toHaveStyle("height: 3125px");
        expect(child4).toHaveStyle(`height: ${3125 / 2}px`);
        expect(child4).toHaveStyle(`width: ${312.5 / 2}px`);
    });
});
