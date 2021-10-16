// @ts-check

import useResizeObserver from "@react-hook/resize-observer";
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
  ReactChildren,
  ReactNode,
} from "react";
import { createContext, useContext } from "react";
import yoga, { Node } from "yoga-layout-prebuilt";

const NO_CONTEXT: Symbol = Symbol("NO_CONTEXT");

interface BoxContext {
  root: yoga.YogaNode | Symbol;
  parent: yoga.YogaNode | null;
  changed: () => void;
}
const defaultContext: BoxContext = {
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
export const BoxContext = createContext(defaultContext);

const useSize = (
  target: React.RefObject<HTMLDivElement>
): DOMRect | undefined => {
  const [size, setSize] = useState<DOMRect | undefined>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    toJSON: () => {},
  });
  const handler = () => {
    // console.log("SET SIZE", target?.current?.getBoundingClientRect());
    setSize(target?.current?.getBoundingClientRect());
  };

  useResizeObserver(target, handler);
  return size;
};

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
  const { root, parent, changed } = useContext<BoxContext>(BoxContext);

  const [node, setNode] = useState<yoga.YogaNode | null>(null);
  const [observedSize, setObservedSize] = useState<DOMRect | undefined>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    toJSON: () => {},
  });

  let size = observedSize;
  // console.log(
  //   //@ts-ignore
  //   "Render " + displayName + " parent: " + parent?.displayName,
  //   size
  // );
  const [childRenders, setChildRenders] = useState<number>(0);
  const target = useRef<HTMLDivElement>(null);
  let rootNode = root;
  if (root === NO_CONTEXT) {
    //We are root
    //eslint-disable-next-line
    size = useSize(target);
    //eslint-disable-next-line
    useLayoutEffect(() => setObservedSize(size));
    // console.log("Calc size", displayName, size, observedSize);
    if (node === null) {
      // console.log("Creating root " + displayName);
      const cfg = yoga.Config.create();
      cfg.setPointScaleFactor(0);
      const n = Node.createWithConfig(cfg);
      //@ts-ignore
      n.displayName = displayName;
      n.setDisplay(yoga.DISPLAY_FLEX);
      setNode(n);
      rootNode = n;
    } else {
      rootNode = node;
    }
  }

  useLayoutEffect(() => {
    if (parent !== null) {
      // console.log("Creating node " + displayName);
      const cfg = yoga.Config.create();
      cfg.setPointScaleFactor(0);
      /** @type {yoga.YogaNode} */
      const n = Node.createWithConfig(cfg);

      n.setDisplay(yoga.DISPLAY_FLEX);
      //@ts-ignore
      n.displayName = displayName;
      const index = parent.getChildCount();
      // console.log(
      //   "Adding child " +
      //     displayName +
      //     " to " +
      //     //@ts-ignore

      //     parent.displayName +
      //     " at " +
      //     index
      // );
      parent.insertChild(n, index);

      setNode(n);
      changed();
    }

    return () => {
      if (parent !== null) {
        // try {
        if (node) {
          parent.removeChild(node);
        }
        // } catch (e) {
        // } finally {
        // }
        //
        //changed();
      }
    };
  }, [parent]);

  useLayoutEffect(() => {
    if (node) {
      const w: number | string | undefined = width || size?.width;
      const h: number | string | undefined = height || size?.height;
      // console.log("Set size", displayName, w, h, size);

      node.setWidth(w || "100%");
      node.setHeight(h || "100%");
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
      // console.log(node.getWidth());
      // console.log(
      //   displayName,
      //   "Calc computed layout after sizing",
      //   w,
      //   h,
      //   node.getChildCount()
      // );
      if (root === NO_CONTEXT) {
        node.calculateLayout(
          typeof w === "string" ? undefined : w,
          typeof h === "string" ? undefined : h,
          yoga.DIRECTION_LTR
        );
      }

      changed();
    }
  }, [
    node,
    width,
    size?.width,
    size?.height,
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
      // console.log(
      //   displayName,
      //   "Calc computed layout in child render trigger",
      //   node.getWidth().value || size?.width,
      //   node.getHeight().value || size?.height,
      //   node.getChildCount()
      // );
      // if (root === NO_CONTEXT) {
      node.calculateLayout(
        node.getWidth().value || size?.width,
        node.getHeight().value || size?.height,
        yoga.DIRECTION_LTR
      );
    }
    // }
  }, [childRenders]);
  // console.log(node?.getComputedLayout());
  const computedLayout = node?.getComputedLayout() || {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  };
  let layout = computedLayout;
  //@ts-ignore
  // console.log(displayName, layout, node?.displayName);
  const contextValue = useMemo(
    () => ({
      parent: node,
      root: rootNode,
      changed: () => {
        // console.log("changed!");
        setChildRenders(Math.random());
      },
    }),
    [
      node,
      rootNode,
      setChildRenders,
      layout.width,
      layout.height,
      layout.top,
      layout.left,
      layout.bottom,
      layout.right,
    ]
  );
  return (
    <BoxContext.Provider value={contextValue}>
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
