import { AutoSize } from "../AutoSize";
import { HBox, VBox } from "../Layout";
const boxShadow = { boxShadow: "0px 0px 0.5px 0.5px blue" };
import React from "react";
import { useOpenClose } from "./usePropertyAnimator.js";

function App4() {
    const [sidePanelWidth, toggleSidePanel] = useOpenClose(20, 200, 300);

    const [rightPanelWidth, toggleRightPanel] = useOpenClose(20, 200, 300)
    const [topHeight, toggleTopHeight] = useOpenClose(20, 100, 300);
    const [bottomHeight, toggleBottomHeight] = useOpenClose(20, 100, 300);


    return (


        <div className="App">
            <AutoSize viewPort={true}>
                <VBox id="root">
                    <HBox id="sibling" style={boxShadow} centered={true} height={topHeight} onClick={() => toggleTopHeight()} />
                    <HBox id="parent" style={{ ...boxShadow, backgroundColor: 'red' }}>
                        <VBox id="left" style={boxShadow} width={sidePanelWidth} onClick={() => toggleSidePanel()} />
                        <VBox id="center" style={{ ...boxShadow, backgroundColor: 'green' }} onClick={() => { toggleBottomHeight(); toggleRightPanel(); toggleSidePanel(); toggleTopHeight() }} />
                        <VBox id="right" style={boxShadow} width={rightPanelWidth} onClick={() => toggleRightPanel()} />

                    </HBox>
                    <HBox id="sibling2" style={boxShadow} centered={true} height={bottomHeight} onClick={() => toggleBottomHeight()} />

                </VBox>
            </AutoSize>
        </div>

    );
}

export default App4;
