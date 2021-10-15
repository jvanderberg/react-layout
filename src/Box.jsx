// @ts-check

import useResizeObserver from "@react-hook/resize-observer";
import { useEffect, useLayoutEffect, useRef, useState, useMemo } from "react";
import { createContext, useContext } from "react";
import yoga, { Node, YogaConfig } from "yoga-layout-prebuilt";

/** @type {YogaConfig} */
/** @typedef {yoga.YogaNode} YogaNode */
/**
 * @typedef {Object} BoxContextValue
 * @property {yoga.YogaNode} parent - The parent node
 * @property {yoga.YogaNode|Symbol} root - The root node
 * @property {Function} changed - Tell the parent something has changed
 *
 */

const NO_CONTEXT = Symbol("NO_CONTEXT");
/** @type {BoxContextValue} */
const defaultContext = {
  root: NO_CONTEXT,
  parent: null,
  changed: () => {},
};

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
const BoxContext = createContext(defaultContext);
const useSize = (target) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const handler = () => {
    console.log("SET SIZE", target.current.getBoundingClientRect());
    setSize(target.current.getBoundingClientRect());
  };

  // Where the magic happens
  useResizeObserver(target, handler);
  return size;
};

export const Box = ({
  displayName = "",
  children,
  width = null,
  height = null,
  flex = 2,
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
}) => {
  const { root, parent, changed } = useContext(BoxContext);
  /** @type [YogaNode,any] */
  const [node, setNode] = useState(null);
  const [observedSize, setObservedSize] = useState({ width: 0, height: 0 });
  const rt = useRef(null);
  let size = observedSize;
  console.log(
    "Render " + displayName + " parent: " + parent?.displayName,
    size
  );
  const [childRenders, setChildRenders] = useState();
  const target = useRef(null);
  let rootNode = root;
  if (root === NO_CONTEXT) {
    //We are root
    //eslint-disable-next-line
    size = useSize(target);
    //eslint-disable-next-line
    useLayoutEffect(() => setObservedSize(size));
    console.log("Calc size", displayName, size, observedSize);
    if (node === null) {
      console.log("Creating root " + displayName);

      const n = Node.create();
      n.displayName = displayName;
      n.setDisplay(yoga.DISPLAY_FLEX);
      setNode(n);
      rootNode = n;
      rt.current = n;
    } else {
      rootNode = node;
    }
  }

  useLayoutEffect(() => {
    if (parent !== null) {
      console.log("Creating node " + displayName);
      /** @type {yoga.YogaNode} */
      const n = Node.create();
      n.setDisplay(yoga.DISPLAY_FLEX);
      n.displayName = displayName;
      const index = parent.getChildCount();
      console.log(
        "Adding child " +
          displayName +
          " to " +
          parent.displayName +
          " at " +
          index
      );
      parent.insertChild(n, index);

      setNode(n);
      changed();
    }

    return () => {
      if (parent !== null) {
        parent.removeChild(node);
        changed();
      }
    };
  }, [parent]);

  useLayoutEffect(() => {
    if (node) {
      const w = width || size.width;
      const h = height || size.height;
      console.log("Set size", displayName, w, h, size);

      node.setWidth(w);
      node.setHeight(h);
      node.setFlex(flex);
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
      console.log(node.getWidth());
      console.log(
        displayName,
        "Calc computed layout after sizing",
        w,
        h,
        node.getChildCount()
      );
      if (root === NO_CONTEXT) {
        node.calculateLayout(w, h, yoga.DIRECTION_LTR);
      }

      changed();
    }
  }, [
    node,
    width,
    size.width,
    size.height,
    flex,
    flexDirection,
    margin,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    minWidth,
    minHeight,
    height,
    justifyContent,
    alignItems,
  ]);

  useEffect(() => {
    if (node) {
      console.log(
        displayName,
        "Calc computed layout in child render trigger",
        node.getWidth().value || size.width,
        node.getHeight().value || size.height,
        node.getChildCount()
      );
      // if (root === NO_CONTEXT) {
      node.calculateLayout(
        node.getWidth().value || size.width,
        node.getHeight().value || size.height,
        yoga.DIRECTION_LTR
      );
    }
    // }
  }, [childRenders]);
  const layout = node?.getComputedLayout();
  console.log(displayName, layout, node?.displayName);
  const contextValue = {
    parent: node,
    root: rootNode,
    changed: () => {
      console.log("changed!");
      setChildRenders(Math.random());
    },
  };
  //   ),
  //   [node, rootNode, setChildRenders]
  // );
  return (
    <BoxContext.Provider
      value={{
        parent: node,
        root: rootNode,
        changed: () => {
          console.log("changed!");
          setChildRenders(Math.random());
        },
      }}
    >
      <div
        style={{
          boxSizing: "border-box",
          position: root === NO_CONTEXT ? "relative" : "absolute",
          ...layout,
          ...style,
        }}
        ref={target}
      >
        {children}
      </div>
    </BoxContext.Provider>
  );
};
