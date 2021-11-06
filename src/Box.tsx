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
  const isRoot = root === NO_CONTEXT;

  //Pass on the reference we got from our parent
  let requestLayout = changed;

  const state = useRef<BoxState>({ node: null, parent: null, childRenders: 0 });
  let measuredSize: Size = { width: 0, height: 0 };

  const [layoutRequests, setLayoutRequests] = useState<number>(0);
  let rootNode = root;
  const contextSize = useContext(AutoSizeContext);

  measuredSize.width =
    typeof contextSize.width === "symbol" ? undefined : contextSize.width;
  measuredSize.height =
    typeof contextSize.height === "symbol" ? undefined : contextSize.height;

  if (state.current.node === null) {
    //Create our node
    const cfg = yoga.Config.create();
    //Use sub-pixel sizing
    cfg.setPointScaleFactor(0);
    const n = Node.createWithConfig(cfg);
    //@ts-ignore
    n.displayName = displayName;
    state.current.node = n;
  }

  //If parent set and parent has changed add us as a child
  if (parent !== null && parent !== state.current.parent) {
    const index = parent.getChildCount();
    parent.insertChild(state.current.node, index);
  }

  const node = state.current.node;

  // measuredSize will be undefined if not root
  const w = width ?? measuredSize?.width;
  const h = height ?? measuredSize?.height;

  //Set our layout from props
  if (w !== null && typeof w !== "undefined") node.setWidth(w);
  if (h !== null && typeof h !== "undefined") node.setHeight(h);
  if (flex) node.setFlex(flex);

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

  //Calc layout only if root
  if (isRoot) {
    state.current.node.calculateLayout(
      typeof w === "number" ? w : undefined,
      typeof h === "number" ? h : undefined,
      yoga.DIRECTION_LTR
    );
    //We are root
    rootNode = state.current.node;

    //Override the requestLayout, all must call the root
    requestLayout = () => {
      setLayoutRequests((val) => val + 1);
    };
  }

  //Get our computed CSS layout
  const computedLayout = state.current.node.getComputedLayout();

  let layout: any = computedLayout || {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  };

  for (let key of Object.keys(layout)) {
    if (Number.isNaN(layout[key])) {
      delete layout[key];
    }
  }

  state.current.parent = parent;

  //Notify root if there are any changes to us from our props, or if we were just created.
  useEffect(() => {
    changed();
  }, [
    width,
    height,
    flex,
    flexDirection,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    minHeight,
    minWidth,
    border,
    justifyContent,
    alignItems,
    state.current.node,
  ]);

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
            position: isRoot ? "relative" : "absolute",
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
