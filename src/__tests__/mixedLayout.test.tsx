import React, { Dispatch, StrictMode, useState } from "react";
import { HBox, VBox } from "../Layout";
import { act } from "@testing-library/react";
import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach } from "vitest";
import { wait } from "./wait.js";

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
        <StrictMode>
            <div className="App">
                <HBox id="root" width={width} height={height}>
                    <DynamicVBox setter={setter} id="child1" flex={2}></DynamicVBox>
                    <DynamicVBox setter={setter} id="child2" flex={2}></DynamicVBox>
                    <DynamicVBox setter={setter} id="child3" width={20}></DynamicVBox>
                </HBox>
            </div>
        </StrictMode>
    );
};


describe("App", () => {
    afterEach(() => {
        // this is necessary
        cleanup();
    });
    it("Test basic flex layouts with changing width/flex", async () => {
        const setter: Setter = {};
        render(
            <App id="base" width={100} height={50} setter={setter} />
        );
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
        });
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
