import { AutoSize } from "../AutoSize";
import { HBox, VBox } from "../Layout";
import React, { StrictMode } from "react";
const boxShadow = { boxShadow: "0px 0px 0.5px 0.5px blue" };
const boxShadow2 = { boxShadow: "0px 0px 0.5px 0.5px red" };


function App3() {
    return (
        <StrictMode>
            <div className="App">
                <AutoSize viewPort={true}>
                    <VBox centered={true}>
                        <HBox centered={true} spacing="10%" height="75%">
                            <VBox width="20%" style={boxShadow}></VBox>
                            <VBox width="20%" style={boxShadow}></VBox>
                            <VBox width="20%" style={boxShadow}></VBox>
                        </HBox>
                    </VBox>
                </AutoSize>
            </div>
        </StrictMode>
    );
}

export default App3;
