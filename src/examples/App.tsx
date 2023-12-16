import React from "react";
import { AutoSize } from "../AutoSize";
import { HBox, VBox } from "../Layout";
interface ContentsType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children?: any;
    color: string;
}

const Contents = ({ children, color }: ContentsType) => {
    const boxShadow = { boxShadow: "0px 0px 0.5px 0.5px " + color };

    return (
        <HBox>
            <VBox width={"20%"} style={boxShadow}>
                <VBox style={boxShadow}></VBox>
                <VBox style={boxShadow}></VBox>
                <VBox style={boxShadow}></VBox>
            </VBox>
            <VBox width={"60%"} style={boxShadow}>
                <VBox height="20%" style={boxShadow}></VBox>
                <VBox height="60%" style={boxShadow}>
                    {children}
                </VBox>
                <VBox height="20%" style={boxShadow}></VBox>
            </VBox>
            <VBox width={"20%"} style={boxShadow}>
                <VBox style={boxShadow}></VBox>
                <VBox style={boxShadow}></VBox>
                <VBox style={boxShadow}></VBox>
            </VBox>
        </HBox>
    );
};
function App() {
    return (
        <AutoSize viewPort={true}>
            <Contents color="blue">
                <Contents color="black">
                    <Contents color="green">
                        <Contents color="orange">
                            <Contents color="black">
                                <Contents color="gray">
                                    <Contents color="black">
                                        <Contents color="green">
                                            <Contents color="orange">
                                                <Contents color="black">
                                                    <Contents color="gray">
                                                        <Contents color="blue">
                                                            <Contents color="black">
                                                                <Contents color="green">
                                                                    <Contents color="orange">
                                                                        <Contents color="black">
                                                                            <Contents color="gray">
                                                                                <Contents color="black">
                                                                                    <Contents color="green">
                                                                                        <Contents color="orange">
                                                                                            <Contents color="black">
                                                                                                <Contents color="gray"></Contents>
                                                                                            </Contents>
                                                                                        </Contents>
                                                                                    </Contents>
                                                                                </Contents>
                                                                            </Contents>
                                                                        </Contents>
                                                                    </Contents>
                                                                </Contents>
                                                            </Contents>
                                                        </Contents>
                                                    </Contents>
                                                </Contents>
                                            </Contents>
                                        </Contents>
                                    </Contents>
                                </Contents>
                            </Contents>
                        </Contents>
                    </Contents>
                </Contents>
            </Contents>
        </AutoSize>
    );
}

export default App;
