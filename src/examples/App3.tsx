import { AutoSize } from "../AutoSize";
import { HBox, VBox } from "../Layout";
const boxShadow = { boxShadow: "0px 0px 0.5px 0.5px blue" };
import React from "react";

function App3() {
    return (

        <div className="App">
            <AutoSize viewPort={true}>
                <VBox >
                    <HBox style={boxShadow} centered={true} >
                        <VBox style={boxShadow} centered={true} spacing={20} width="50%">
                            <VBox height="20%" style={boxShadow}></VBox>
                            <VBox height="20%" style={boxShadow}></VBox>
                            <VBox height="20%" style={boxShadow}></VBox>
                        </VBox>

                    </HBox>
                </VBox>
            </AutoSize>
        </div>

    );
}

export default App3;
