// @ts-check

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { createContext, useContext } from "react";
import yoga, { Node, YogaNode } from "yoga-layout-prebuilt";
import { AutoSizeContext, DefaultAutoSizeContext } from "./AutoSize";

const NO_CONTEXT = Symbol("NO_CONTEXT");

interface BoxContextType {
    root: yoga.YogaNode | symbol | null;
    parent: yoga.YogaNode | null;
    changed: () => void;
}

const defaultContext: BoxContextType = {
    root: NO_CONTEXT,
    parent: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    changed: () => { },
};

export const BoxContext = createContext<BoxContextType>(defaultContext);
interface Size {
    width: number | undefined;
    height: number | undefined;
}

interface BoxProps {
    id?: string;
    width?: number | string;
    height?: number | string;
    flex?: number;
    flexDirection?: yoga.YogaFlexDirection;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    minHeight?: number;
    minWidth?: number;
    border?: number;
    justifyContent?: yoga.YogaJustifyContent;
    alignItems?: yoga.YogaAlign;
    style?: object;
    displayName?: string;
    children?: ReactNode;
}
export const Box: React.FC<BoxProps> = ({
    id,
    width,
    height,
    children,
    flex,
    flexDirection = yoga.FLEX_DIRECTION_ROW,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    minHeight = 0,
    minWidth = 0,
    border = 0,
    justifyContent = yoga.JUSTIFY_FLEX_START,
    alignItems = yoga.ALIGN_FLEX_START,
    style,
    displayName
}) => {
    const { root, parent, changed } = useContext<BoxContextType>(BoxContext);
    const isRoot = root === NO_CONTEXT;

    const [requestLayout, setRequestLayout] = useState(() => changed);

    const [, setLayoutRequests] = useState<number>(0);
    const [rootNode, setRootNode] = useState<YogaNode | null>(null);
    const [node, setNode] = useState<YogaNode | null>(null);
    const [addedToParent, setAddedToParent] = useState(false);
    const contextSize = useContext(AutoSizeContext);
    const measuredSize: Size = { width: 0, height: 0 };

    measuredSize.width =
        typeof contextSize.width === "symbol" ? undefined : contextSize.width;
    measuredSize.height =
        typeof contextSize.height === "symbol" ? undefined : contextSize.height;

    const w = width ?? measuredSize?.width;
    const h = height ?? measuredSize?.height;
    useEffect(() => {

        if (!node) {
            //Create our node
            const cfg = yoga.Config.create();
            //Use sub-pixel sizing
            cfg.setPointScaleFactor(0);
            const n: YogaNode | null = Node.createWithConfig(cfg);

            if (parent && !addedToParent) {
                const index = parent.getChildCount();
                parent.insertChild(n, index);
                setAddedToParent(true);
            }
            setNode(n);
            if (isRoot) {
                setRootNode(n);

                setRequestLayout(() => () => {
                    setLayoutRequests((val) => val + 1);
                });
            }
        }

        if (node) {

            if (parent && !addedToParent) {
                const index = parent.getChildCount();
                parent.insertChild(node, index);
                setAddedToParent(true);
            }

        }
    });

    let layout: any = {};
    if (node) {

        //Set our layout from props
        if (w !== null && typeof w !== "undefined") node.setWidth(w);
        if (h !== null && typeof h !== "undefined") node.setHeight(h);
        node.setFlex(flex ?? 0);

        node.setFlexDirection(flexDirection);
        marginBottom && node.setMargin(yoga.EDGE_BOTTOM, marginBottom);
        marginTop && node.setMargin(yoga.EDGE_TOP, marginTop);
        marginLeft && node.setMargin(yoga.EDGE_LEFT, marginLeft);
        marginRight && node.setMargin(yoga.EDGE_RIGHT, marginRight);
        paddingBottom && node.setPadding(yoga.EDGE_BOTTOM, paddingBottom);
        paddingTop && node.setPadding(yoga.EDGE_TOP, paddingTop);
        paddingLeft && node.setPadding(yoga.EDGE_LEFT, paddingLeft);
        paddingRight && node.setPadding(yoga.EDGE_RIGHT, paddingRight);

        node.setMinHeight(minHeight);

        node.setMinWidth(minWidth);
        node.setBorder(yoga.EDGE_ALL, border);
        node.setJustifyContent(justifyContent);
        node.setAlignItems(alignItems);
        if (isRoot) {
            node.calculateLayout(
                typeof w === "number" ? w : undefined,
                typeof h === "number" ? h : undefined,
                yoga.DIRECTION_LTR
            );
        }
        //Get our computed CSS layout
        const computedLayout = node.getComputedLayout();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        layout = computedLayout || {
            width: 0,
            height: 0,
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
        };

        for (const key of Object.keys(layout)) {
            if (Number.isNaN(layout[key])) {
                delete layout[key];
            }
        }
    }


    //Notify root if there are any changes to us from our props, or if we were just created.
    useEffect(() => {
        changed();
    }, [
        width,
        height,
        flex,
        flexDirection,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        minHeight,
        minWidth,
        border,
        justifyContent,
        alignItems,
        node,
        w,
        h
    ]);
    useEffect(() => {
        return () => {
            if (node && parent) {
                parent.removeChild(node);
                if (isRoot) {
                    node.freeRecursive();
                }
            }
        };
    }, []);
    return (
        //We always create a new empty auto size context, to kill the scope if there is a wrapping context
        <AutoSizeContext.Provider value={DefaultAutoSizeContext}>
            <BoxContext.Provider
                value={{
                    parent: node,
                    root: rootNode,
                    changed: requestLayout,
                }}
            >
                <div
                    id={id}
                    data-testid={id}
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
