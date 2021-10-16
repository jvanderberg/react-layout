import { Fragment } from "react";
import "./App.css";
import { HBox, VBox } from "./Layout";
const boxShadow = { boxShadow: "0px 0px 0.5px 0.5px blue" };

const Contents = ({ children, color }) => {
  const boxShadow = { boxShadow: "0px 0px 0.5px 0.5px " + color };

  return (
    <Fragment>
      <HBox>
        <VBox flex={1} style={boxShadow} displayName="Child1">
          <VBox style={boxShadow} displayName="Child1"></VBox>
          <VBox style={boxShadow} displayName="Child1"></VBox>
          <VBox style={boxShadow} displayName="Child1"></VBox>
        </VBox>
        <VBox flex={3} style={boxShadow} displayName="Child1">
          <VBox flex={1} style={boxShadow} displayName="Child1"></VBox>
          <VBox flex={3} style={boxShadow} displayName="Child1">
            {children}
          </VBox>
          <VBox flex={1} style={boxShadow} displayName="Child1"></VBox>
        </VBox>
        <VBox flex={1} style={boxShadow} displayName="Child1">
          <VBox style={boxShadow} displayName="Child1"></VBox>
          <VBox style={boxShadow} displayName="Child1"></VBox>
          <VBox style={boxShadow} displayName="Child1"></VBox>
        </VBox>
      </HBox>
    </Fragment>
  );
};
function App() {
  return (
    <div className="App">
      <HBox
        displayName="Root"
        style={{
          width: "100vw",
          height: "100vh",
          outline: "0.5px solid red",
        }}
      >
        <Contents color="red">
          <Contents color="blue">
            <Contents color="green">
              <Contents color="orange">
                <Contents color="black">
                  <Contents color="gray">
                    <Contents color="magenta">
                      <Contents color="cyan"></Contents>
                    </Contents>
                  </Contents>
                </Contents>
              </Contents>
            </Contents>
          </Contents>
        </Contents>
      </HBox>
      {/* <Box
        displayName="Root"
        flexDirection={2}
        style={{
          width: "100vw",
          height: "100vh",
          outline: "0.5px solid red",
        }}
      >
        <Box
          flex={1}
          height={"100%"}
          displayName="Child1"
          flexDirection={0}
          style={boxShadow}
        >
          <Box
            height={"50%"}
            width={"100%"}
            style={boxShadow}
          ></Box>
          <Box
            height={"50%"}
            width={"100%"}
            style={boxShadow}
          ></Box>
        </Box>
        <Box
          displayName="child2"
          flex={3}
          height={"100%"}
          flexDirection={0}
          style={boxShadow}
        >
          <Box
            flex={2}
            width={"100%"}
            style={boxShadow}
          ></Box>
          <Box
            flex={8}
            width={"100%"}
            style={boxShadow}
          >
            <Box displayName="Root2" flexDirection={2} height={"100%"}>
              <Box
                flex={1}
                height={"100%"}
                displayName="Child1"
                flexDirection={0}
                style={boxShadow}
              >
                <Box
                  height={"50%"}
                  width={"100%"}
                  style={boxShadow}
                ></Box>
                <Box
                  height={"50%"}
                  width={"100%"}
                  style={boxShadow}
                ></Box>
              </Box>
              <Box
                displayName="child2"
                flex={3}
                height={"100%"}
                flexDirection={0}
                style={boxShadow}
              >
                <Box
                  flex={2}
                  width={"100%"}
                  style={boxShadow}
                ></Box>
                <Box
                  flex={8}
                  width={"100%"}
                  style={boxShadow}
                >
                  <div>
                    <Box
                      displayName="Root2"
                      flexDirection={2}
                      width={"100%"}
                      height={"100%"}
                    >
                      <Box
                        flex={1}
                        height={"100%"}
                        displayName="Child1"
                        flexDirection={0}
                        style={boxShadow}
                      >
                        <Box
                          height={"50%"}
                          width={"100%"}
                          style={boxShadow}
                        ></Box>
                        <Box
                          height={"50%"}
                          width={"100%"}
                          style={boxShadow}
                        ></Box>
                      </Box>
                      <Box
                        displayName="child2"
                        flex={1}
                        height={"100%"}
                        flexDirection={0}
                        style={boxShadow}
                      >
                        <Box
                          flex={2}
                          width={"100%"}
                          style={boxShadow}
                        ></Box>
                        <Box
                          flex={8}
                          width={"100%"}
                          style={boxShadow}
                        >
                          <Box
                            displayName="Roo2t"
                            flexDirection={2}
                            width={"100%"}
                            height={"100%"}
                          >
                            <Box
                              flex={1}
                              height={"100%"}
                              displayName="Child1"
                              flexDirection={0}
                              style={boxShadow}
                            >
                              <Box
                                height={"50%"}
                                width={"100%"}
                                style={{
                                  boxShadow: "0px 0px 0.5px 0.5px red",
                                }}
                              ></Box>
                              <Box
                                height={"50%"}
                                width={"100%"}
                                style={{
                                  boxShadow: "0px 0px 0.5px 0.5px red",
                                }}
                              ></Box>
                            </Box>
                            <Box
                              displayName="child2"
                              flex={3}
                              height={"100%"}
                              flexDirection={0}
                              style={boxShadow}
                            >
                              <Box
                                flex={2}
                                width={"100%"}
                                style={{
                                  boxShadow: "0px 0px 0.5px 0.5px red",
                                }}
                              ></Box>
                              <Box
                                flex={8}
                                width={"100%"}
                                style={{
                                  boxShadow: "0px 0px 0.5px 0.5px red",
                                }}
                              >
                                <Box
                                  displayName="Root2"
                                  flexDirection={2}
                                  height={"100%"}
                                >
                                  <Box
                                    flex={1}
                                    height={"100%"}
                                    displayName="Child1"
                                    flexDirection={0}
                                    style={{
                                      boxShadow: "0px 0px 0.5px 0.5px red",
                                    }}
                                  >
                                    <Box
                                      height={"50%"}
                                      width={"100%"}
                                      style={{
                                        boxShadow: "0px 0px 0.5px 0.5px red",
                                      }}
                                    ></Box>
                                    <Box
                                      height={"50%"}
                                      width={"100%"}
                                      style={{
                                        boxShadow: "0px 0px 0.5px 0.5px red",
                                      }}
                                    ></Box>
                                  </Box>
                                  <Box
                                    displayName="child2"
                                    flex={3}
                                    height={"100%"}
                                    flexDirection={0}
                                    style={{
                                      boxShadow: "0px 0px 0.5px 0.5px red",
                                    }}
                                  >
                                    <Box
                                      flex={2}
                                      width={"100%"}
                                      style={{
                                        boxShadow: "0px 0px 0.5px 0.5px red",
                                      }}
                                    ></Box>
                                    <Box
                                      flex={8}
                                      width={"100%"}
                                      style={{
                                        boxShadow: "0px 0px 0.5px 0.5px red",
                                      }}
                                    >
                                      <div>
                                        <Box
                                          displayName="Root2"
                                          flexDirection={2}
                                          width={"100%"}
                                          height={"100%"}
                                        >
                                          <Box
                                            flex={1}
                                            height={"100%"}
                                            displayName="Child1"
                                            flexDirection={0}
                                            style={{
                                              boxShadow:
                                                "0px 0px 0.5px 0.5px red",
                                            }}
                                          >
                                            <Box
                                              height={"50%"}
                                              width={"100%"}
                                              style={{
                                                boxShadow:
                                                  "0px 0px 0.5px 0.5px red",
                                              }}
                                            ></Box>
                                            <Box
                                              height={"50%"}
                                              width={"100%"}
                                              style={{
                                                boxShadow:
                                                  "0px 0px 0.5px 0.5px red",
                                              }}
                                            ></Box>
                                          </Box>
                                          <Box
                                            displayName="child2"
                                            flex={1}
                                            height={"100%"}
                                            flexDirection={0}
                                            style={{
                                              boxShadow:
                                                "0px 0px 0.5px 0.5px red",
                                            }}
                                          >
                                            <Box
                                              flex={2}
                                              width={"100%"}
                                              style={{
                                                boxShadow:
                                                  "0px 0px 0.5px 0.5px red",
                                              }}
                                            ></Box>
                                            <Box
                                              flex={8}
                                              width={"100%"}
                                              style={{
                                                boxShadow:
                                                  "0px 0px 0.5px 0.5px red",
                                              }}
                                            ></Box>
                                            <Box
                                              flex={2}
                                              width={"100%"}
                                              style={{
                                                boxShadow:
                                                  "0px 0px 0.5px 0.5px red",
                                              }}
                                            ></Box>
                                          </Box>

                                          <Box
                                            displayName="child3"
                                            flex={1}
                                            height={"100%"}
                                            flexDirection={0}
                                            style={{
                                              boxShadow:
                                                "0px 0px 0.5px 0.5px red",
                                            }}
                                          >
                                            <Box
                                              height={"50%"}
                                              width={"100%"}
                                              style={{
                                                boxShadow:
                                                  "0px 0px 0.5px 0.5px red",
                                              }}
                                            ></Box>
                                            <Box
                                              height={"50%"}
                                              width={"100%"}
                                              style={{
                                                boxShadow:
                                                  "0px 0px 0.5px 0.5px red",
                                              }}
                                            ></Box>
                                          </Box>
                                        </Box>
                                      </div>
                                    </Box>
                                    <Box
                                      flex={2}
                                      width={"100%"}
                                      style={{
                                        boxShadow: "0px 0px 0.5px 0.5px red",
                                      }}
                                    ></Box>
                                  </Box>

                                  <Box
                                    displayName="child3"
                                    flex={1}
                                    height={"100%"}
                                    flexDirection={0}
                                    style={{
                                      boxShadow: "0px 0px 0.5px 0.5px red",
                                    }}
                                  >
                                    <Box
                                      height={"50%"}
                                      width={"100%"}
                                      style={{
                                        boxShadow: "0px 0px 0.5px 0.5px red",
                                      }}
                                    ></Box>
                                    <Box
                                      height={"50%"}
                                      width={"100%"}
                                      style={{
                                        boxShadow: "0px 0px 0.5px 0.5px red",
                                      }}
                                    ></Box>
                                  </Box>
                                </Box>
                              </Box>
                              <Box
                                flex={2}
                                width={"100%"}
                                style={{
                                  boxShadow: "0px 0px 0.5px 0.5px red",
                                }}
                              ></Box>
                            </Box>

                            <Box
                              displayName="child3"
                              flex={1}
                              height={"100%"}
                              flexDirection={0}
                              style={boxShadow}
                            >
                              <Box
                                height={"50%"}
                                width={"100%"}
                                style={{
                                  boxShadow: "0px 0px 0.5px 0.5px red",
                                }}
                              ></Box>
                              <Box
                                height={"50%"}
                                width={"100%"}
                                style={{
                                  boxShadow: "0px 0px 0.5px 0.5px red",
                                }}
                              ></Box>
                            </Box>
                          </Box>
                        </Box>
                        <Box
                          flex={2}
                          width={"100%"}
                          style={boxShadow}
                        ></Box>
                      </Box>

                      <Box
                        displayName="child3"
                        flex={1}
                        height={"100%"}
                        flexDirection={0}
                        style={boxShadow}
                      >
                        <Box
                          height={"50%"}
                          width={"100%"}
                          style={boxShadow}
                        ></Box>
                        <Box
                          height={"50%"}
                          width={"100%"}
                          style={boxShadow}
                        ></Box>
                      </Box>
                    </Box>
                  </div>
                </Box>
                <Box
                  flex={2}
                  width={"100%"}
                  style={boxShadow}
                ></Box>
              </Box>

              <Box
                displayName="child3"
                flex={1}
                height={"100%"}
                flexDirection={0}
                style={boxShadow}
              >
                <Box
                  height={"50%"}
                  width={"100%"}
                  style={boxShadow}
                ></Box>
                <Box
                  height={"50%"}
                  width={"100%"}
                  style={boxShadow}
                ></Box>
              </Box>
            </Box>
          </Box>
          <Box
            flex={2}
            width={"100%"}
            style={boxShadow}
          ></Box>
        </Box>

        <Box
          displayName="child3"
          flex={1}
          height={"100%"}
          flexDirection={0}
          style={boxShadow}
        >
          <Box
            height={"50%"}
            width={"100%"}
            style={boxShadow}
          ></Box>
          <Box
            height={"50%"}
            width={"100%"}
            style={boxShadow}
          ></Box>
        </Box>
      </Box> */}
    </div>
  );
}

export default App;
