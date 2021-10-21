// @ts-check

import useResizeObserver from "@react-hook/resize-observer";
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
  ReactNode,
} from "react";
import { createContext, useContext } from "react";
import yoga, { Node } from "yoga-layout-prebuilt";
import {
  AutoSizeContext,
  AutoSizeContextType,
  DefaultAutoSizeContext,
} from "./AutoSize";
import { YogaNode } from "./Old";

const NO_CONTEXT: Symbol = Symbol("NO_CONTEXT");

interface BoxContextType {
  root: yoga.YogaNode | Symbol | null;
  parent: yoga.YogaNode | null;
  changed: () => void;
}
const defaultContext: BoxContextType = {
  root: NO_CONTEXT,
  parent: null,
  changed: () => {},
};

const debounce = (func: Function, timeout: number = 300) => {
  let timer: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};
export const BoxContext = createContext<BoxContextType>(defaultContext);
interface Size {
  width: number | undefined;
  height: number | undefined;
}
interface BoxState {
  node: YogaNode | null;
  parent: YogaNode | null;
  childRenders: number;
}
interface BoxProps {
  displayName?: string;
  children?: ReactNode;
  width?: number | string;
  height?: number | string;
  flex?: number;
  flexDirection?: yoga.YogaFlexDirection;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  minHeight?: number;
  minWidth?: number;
  border?: number;
  justifyContent?: yoga.YogaJustifyContent;
  alignItems?: yoga.YogaAlign;
  style?: object;
}
export const Box = ({
  displayName = "",
  children,
  width,
  height,
  flex,
  flexDirection = yoga.FLEX_DIRECTION_ROW,
  margin = 0,
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  minHeight = 0,
  minWidth = 0,
  border = 0,
  justifyContent = yoga.JUSTIFY_FLEX_START,
  alignItems = yoga.ALIGN_FLEX_START,
  style,
}: BoxProps): JSX.Element => {
  const { root, parent, changed } = useContext<BoxContextType>(BoxContext);
  let requestLayout = changed;
  console.log(
    "Context",
    displayName,
    width,
    height,
    flex,
    parent?.getComputedLayout()
  );

  const state = useRef<BoxState>({ node: null, parent: null, childRenders: 0 });

  let size: Size = { width: 0, height: 0 };

  const [layoutRequests, setLayoutRequests] = useState<number>(0);
  let rootNode = root;
  if (root === NO_CONTEXT) {
    //We are root
    //eslint-disable-next-line
    const contextSize = useContext(AutoSizeContext);
    //If we have no wrapping context, the size must be undefined.
    size.width =
      typeof contextSize.width === "symbol" ? undefined : contextSize.width;
    size.height =
      typeof contextSize.height === "symbol" ? undefined : contextSize.height;

    if (state.current.node === null) {
      const cfg = yoga.Config.create();
      cfg.setPointScaleFactor(0);
      const n = Node.createWithConfig(cfg);
      //@ts-ignore
      n.displayName = displayName;
      state.current.node = n;
      rootNode = n;
    } else {
      rootNode = state.current.node;
    }
    requestLayout = () => {
      setLayoutRequests((val) => val + 1);
    };
  }

  if (parent !== null && parent !== state.current.parent) {
    console.log("Creating node " + displayName);
    const cfg = yoga.Config.create();
    cfg.setPointScaleFactor(0);
    /** @type {yoga.YogaNode} */
    const n = Node.createWithConfig(cfg);

    n.setDisplay(yoga.DISPLAY_FLEX);
    //@ts-ignore
    n.displayName = displayName;
    const index = parent.getChildCount();
    console.log(
      "****** Adding child " +
        displayName +
        " to " +
        //@ts-ignore

        parent.displayName +
        " at " +
        index
    );

    parent.insertChild(n, index);

    state.current.node = n;
  }

  useEffect(() => {
    changed();
  }, [state.current.node]);

  if (state.current.node) {
    const node = state.current.node;
    const w: number | string | undefined = width || size?.width;
    const h: number | string | undefined = height || size?.height;
    console.log("Set size", displayName, width, height, w, h, size);

    if (w) node.setWidth(w);
    if (h) node.setHeight(h);
    if (flex) {
      node.setFlex(flex);
    }
    node.setFlexDirection(flexDirection);
    node.setMargin(yoga.EDGE_ALL, margin);
    node.setMargin(yoga.EDGE_BOTTOM, marginBottom);
    node.setMargin(yoga.EDGE_TOP, marginTop);
    node.setMargin(yoga.EDGE_LEFT, marginLeft);
    node.setMargin(yoga.EDGE_RIGHT, marginRight);
    node.setMinHeight(minHeight);
    node.setMinWidth(minWidth);
    node.setBorder(yoga.EDGE_ALL, border);
    node.setJustifyContent(justifyContent);
    node.setAlignItems(alignItems);
  }

  const computedLayout = state.current.node?.getComputedLayout();
  console.log(
    displayName,
    "computedLayout",
    state.current.node?.getComputedLayout()
  );

  let layout = computedLayout || {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  };
  for (let key of Object.keys(layout)) {
    //@ts-ignore
    if (Number.isNaN(layout[key])) {
      //@ts-ignore
      layout[key] = 0;
    }
  }

  if (root === NO_CONTEXT) {
    const w: number | string | undefined = width || size?.width;
    const h: number | string | undefined = height || size?.height;

    state.current.node?.calculateLayout(
      typeof w === "number" && w > 0 ? w : undefined,
      typeof h === "number" && h > 0 ? h : undefined,
      yoga.DIRECTION_LTR
    );
    if (state.current.node) {
      layout = state.current.node?.getComputedLayout();
    }
  }

  state.current.parent = parent;
  return (
    //We always create a new empty auto size context, to kill the scope if there is a wrapping context
    <AutoSizeContext.Provider value={DefaultAutoSizeContext}>
      <BoxContext.Provider
        value={{
          parent: state.current.node,
          root: rootNode,
          changed: requestLayout,
        }}
      >
        <div
          style={{
            boxSizing: "border-box",
            position: root === NO_CONTEXT ? "relative" : "absolute",
            ...layout,
            ...style,
          }}
        >
          {children}
        </div>
      </BoxContext.Provider>
    </AutoSizeContext.Provider>
  );
};
