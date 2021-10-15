import logo from "./logo.svg";
import "./App.css";
import { Box } from "./Box";

function App() {
  return (
    <div className="App">
      <Box
        displayName="Root"
        flexDirection={2}
        style={{
          width: "100vw",
          height: "100vh",
          outline: "1px solid blue",
        }}
      >
        <Box
          flex={1}
          height={"100%"}
          displayName="Child1"
          flexDirection={0}
          style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
        >
          <Box
            height={"50%"}
            width={"100%"}
            style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
          ></Box>
          <Box
            height={"50%"}
            width={"100%"}
            style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
          ></Box>
        </Box>
        <Box
          displayName="child2"
          flex={1}
          height={"100%"}
          flexDirection={0}
          style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
        >
          <Box
            flex={2}
            width={"100%"}
            style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
          ></Box>
          <Box
            flex={8}
            width={"100%"}
            style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
          >
            <Box displayName="Root2" flexDirection={2} height={"100%"}>
              <Box
                flex={1}
                height={"100%"}
                displayName="Child1"
                flexDirection={0}
                style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
              >
                <Box
                  height={"50%"}
                  width={"100%"}
                  style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
                ></Box>
                <Box
                  height={"50%"}
                  width={"100%"}
                  style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
                ></Box>
              </Box>
              <Box
                displayName="child2"
                flex={1}
                height={"100%"}
                flexDirection={0}
                style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
              >
                <Box
                  flex={2}
                  width={"100%"}
                  style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
                ></Box>
                <Box
                  flex={8}
                  width={"100%"}
                  style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
                >
                  <Box displayName="Root2" flexDirection={2} height={"100%"}>
                    <Box
                      flex={1}
                      height={"100%"}
                      displayName="Child1"
                      flexDirection={0}
                      style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
                    >
                      <Box
                        height={"50%"}
                        width={"100%"}
                        style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
                      ></Box>
                      <Box
                        height={"50%"}
                        width={"100%"}
                        style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
                      ></Box>
                    </Box>
                    <Box
                      displayName="child2"
                      flex={1}
                      height={"100%"}
                      flexDirection={0}
                      style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
                    >
                      <Box
                        flex={2}
                        width={"100%"}
                        style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
                      ></Box>
                      <Box
                        flex={8}
                        width={"100%"}
                        style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
                      ></Box>
                      <Box
                        flex={2}
                        width={"100%"}
                        style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
                      ></Box>
                    </Box>

                    <Box
                      displayName="child3"
                      flex={1}
                      height={"100%"}
                      flexDirection={0}
                      style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
                    >
                      <Box
                        height={"50%"}
                        width={"100%"}
                        style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
                      ></Box>
                      <Box
                        height={"50%"}
                        width={"100%"}
                        style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
                      ></Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  flex={2}
                  width={"100%"}
                  style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
                ></Box>
              </Box>

              <Box
                displayName="child3"
                flex={1}
                height={"100%"}
                flexDirection={0}
                style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
              >
                <Box
                  height={"50%"}
                  width={"100%"}
                  style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
                ></Box>
                <Box
                  height={"50%"}
                  width={"100%"}
                  style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
                ></Box>
              </Box>
            </Box>
          </Box>
          <Box
            flex={2}
            width={"100%"}
            style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
          ></Box>
        </Box>

        <Box
          displayName="child3"
          flex={1}
          height={"100%"}
          flexDirection={0}
          style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
        >
          <Box
            height={"50%"}
            width={"100%"}
            style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
          ></Box>
          <Box
            height={"50%"}
            width={"100%"}
            style={{ boxShadow: "0px 0px 3px 0.5px blue" }}
          ></Box>
        </Box>
      </Box>
    </div>
  );
}

export default App;
