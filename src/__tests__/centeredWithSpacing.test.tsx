import { cleanup, render, screen } from '@testing-library/react';
import React from "react";
import { afterEach, describe, expect, it } from "vitest";
import { HBox, VBox } from "../Layout";
import { wait } from "./wait.js";

interface BoxProps {
    width: number;
    height: number;
    centered?: boolean;
}
const App: React.FC<BoxProps> = ({ width, height }) => {
    return (
        <div className="App">
            <VBox id="root" width={width} height={height} centered={true}>
                <HBox id="centered" centered={true} spacing={10} height="75%">
                    <VBox id="child1" width="20%"></VBox>
                    <VBox id="child2" width="20%"></VBox>
                    <VBox id="child3" width="20%"></VBox>
                </HBox>
            </VBox>
        </div>
    );
};


describe("App", () => {
    afterEach(() => {
        // this is necessary
        cleanup();
    });
    it("basic proportional layout, centered with spacing", async () => {
        const { rerender } = render(<App width={100} height={100} />);
        await wait(150);

        const centered = screen.getByTestId("centered");
        const child1 = screen.getByTestId("child1");
        const child2 = screen.getByTestId("child2");
        const child3 = screen.getByTestId("child3");
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
        expect(child2).toHaveStyle("height: 75px");
        expect(child3).toHaveStyle("width: 20px");
        expect(child3).toHaveStyle("left: 70px");


        rerender(<App width={200} height={400} />);
        expect(centered).toHaveStyle("left: 0px");
        expect(centered).toHaveStyle("top: 50px");
        expect(centered).toHaveStyle("width: 200px");
        expect(centered).toHaveStyle("height: 300px");
        expect(child2).toHaveStyle("left: 80px");
        expect(child2).toHaveStyle("width: 40px");
        expect(child2).toHaveStyle("height: 300px");
        expect(child3).toHaveStyle("width: 40px");
        expect(child3).toHaveStyle("left: 130px");
    });
});
