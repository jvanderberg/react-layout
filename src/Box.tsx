// @ts-check

import React, { ReactNode, useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { Node, FlexDirection, Justify, Align, Edge, Direction, Gutter } from "yoga-layout";
import { AutoSizeContext, DefaultAutoSizeContext } from "./AutoSize";
import { YogaPromise } from "./Layout.js";
import { suspend } from "suspend-react";



const NO_CONTEXT = Symbol("NO_CONTEXT");

interface BoxContextType {
    root: Node | symbol | null;
    parent: Node | null;
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
export type CSSDimension = number | `${number}%`
export interface BoxProps {
    id?: string;
    width?: CSSDimension;
    height?: CSSDimension;
    flex?: number;
    flexDirection?: FlexDirection;
    margin?: CSSDimension;
    marginTop?: CSSDimension;
    marginBottom?: CSSDimension;
    marginLeft?: CSSDimension;
    marginRight?: CSSDimension;
    padding?: CSSDimension;
    paddingTop?: CSSDimension;
    paddingBottom?: CSSDimension;
    paddingLeft?: CSSDimension;
    paddingRight?: CSSDimension;
    minHeight?: CSSDimension;
    minWidth?: CSSDimension;
    border?: number;
    centered?: boolean;
    alignItems?: Align;
    style?: object;
    children?: ReactNode;
    spacing?: number;
    onClick?: React.MouseEventHandler;
}
export const Box: React.FC<BoxProps> = ({
    id,
    width,
    height,
    children,
    flex,
    flexDirection = FlexDirection.Row,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    padding,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    minHeight = 0,
    minWidth = 0,
    border = 0,
    centered = true,
    spacing,
    style,
    onClick
}) => {
    // Wait for the Yoga library to load, as it uses async WASM
    // In future react will support use(YogaPromise) directly.
    const Yoga = suspend(YogaPromise) as Awaited<typeof YogaPromise>;
    const { root, parent, changed } = useContext<BoxContextType>(BoxContext);
    const isRoot = root === NO_CONTEXT;
    const [requestLayout, setRequestLayout] = useState(() => changed)


    const [, setLayoutRequests] = useState<number>(0);
    const [rootNode, setRootNode] = useState<Node | null>(null);
    const [node, setNode] = useState<Node | null>(null);
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
            const cfg = Yoga.Config.create();
            //Use sub-pixel sizing
            cfg.setPointScaleFactor(0);
            const n: Node | null = Yoga.Node.createWithConfig(cfg);

            if (parent && !addedToParent) {
                const index = parent.getChildCount();
                parent.insertChild(n, index);
                setAddedToParent(true);
            }
            setNode(n);
            if (isRoot) {
                setRootNode(n);

                setRequestLayout(() => () => {
                    setLayoutRequests(val => val + 1);
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let layout: any = {};
    if (node) {

        //Set our layout from props
        if (w !== null && typeof w !== "undefined") node.setWidth(w);
        if (h !== null && typeof h !== "undefined") node.setHeight(h);
        node.setFlex(flex ?? 0);
        let justifyContent = Justify.FlexStart;
        if (centered) {
            justifyContent = Justify.Center;
        }

        const pl = paddingLeft ?? padding;
        const pr = paddingRight ?? padding;
        const pt = paddingTop ?? padding;
        const pb = paddingBottom ?? padding;
        const ml = marginLeft ?? margin;
        const mr = marginRight ?? margin;
        const mt = marginTop ?? margin;
        const mb = marginBottom ?? margin;
        node.setFlexDirection(flexDirection);
        mb && node.setMargin(Edge.Bottom, mb);
        mt && node.setMargin(Edge.Top, mt);
        ml && node.setMargin(Edge.Left, ml);
        mr && node.setMargin(Edge.Right, mr);
        pb && node.setPadding(Edge.Bottom, pb);
        pt && node.setPadding(Edge.Top, pt);
        pl && node.setPadding(Edge.Left, pl);
        pr && node.setPadding(Edge.Right, pr);
        spacing && node.setGap(flexDirection == FlexDirection.Column ? Gutter.Row : Gutter.Column, spacing ?? 0);
        node.setMinHeight(minHeight);

        node.setMinWidth(minWidth);
        node.setBorder(Edge.All, border);
        node.setJustifyContent(justifyContent);

        if (isRoot) {
            node.calculateLayout(
                typeof w === "number" ? w : undefined,
                typeof h === "number" ? h : undefined,
                Direction.LTR
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
        margin,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        padding,
        paddingTop,
        paddingBottom,
        paddingRight,
        paddingLeft,
        minHeight,
        minWidth,
        border,
        centered,
        node,
        w,
        h,
        changed
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
    useEffect(() => {
        if (!isRoot && changed) {
            setRequestLayout(() => changed);
        }

    }, [changed]);
    return (
        //We always create a new empty auto size context, to kill the scope if there is a wrapping context
        <AutoSizeContext.Provider value={DefaultAutoSizeContext}>
            <BoxContext.Provider
                value={{
                    parent: node,
                    root: rootNode,
                    changed: requestLayout
                }}
            >
                <div
                    id={id}
                    data-testid={id}
                    onClick={onClick}
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
