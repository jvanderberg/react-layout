// @ts-check

import React, { ReactNode, useEffect, useState } from "react";
import { createContext, useContext } from "react";
import yoga, { Node, FlexDirection, Justify, Align } from "yoga-layout/sync";
import { AutoSizeContext, DefaultAutoSizeContext } from "./AutoSize";
import { } from "yoga-layout";


const NO_CONTEXT = Symbol("NO_CONTEXT");

interface BoxContextType {
    root: BoxProps | symbol | null;
    parent: BoxProps | null;
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
    width?: number | "auto" | `${number}%`;
    height?: number | "auto" | `${number}%`;
    flex?: number;
    flexDirection?: FlexDirection;
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
    justifyContent?: Justify;
    alignItems?: Align;
    style?: object;
    displayName?: string;
    children?: BoxProps[] | ReactNode;
    parent?: BoxProps | null;
}

const EmptyBox: BoxProps = {
    id: "",
    width: 0,
    height: 0,
    flex: 0,
    flexDirection: yoga.FLEX_DIRECTION_ROW,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: 0,
    minWidth: 0,
    border: 0,
    justifyContent: yoga.JUSTIFY_FLEX_START,
    alignItems: yoga.ALIGN_FLEX_START,
    style: {},
    displayName: "",
    children: [],
} as const;

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
    const [rootNode, setRootNode] = useState<BoxProps | null>(null);
    const [node, setNode] = useState<BoxProps | null>(null);
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
            const n: BoxProps | null = { ...EmptyBox, parent };

            if (parent && !addedToParent) {
                if (!parent.children) parent.children = [];
                (parent.children as BoxProps[]).push(n);
                setAddedToParent(true);
            }
            setNode(n);
            if (isRoot) {
                setRootNode(n);

                setRequestLayout(() => () => {
                    // This just causes a re-render
                    setLayoutRequests((val) => val + 1);
                });
            }
        }

        if (node) {

            if (parent && !addedToParent) {
                if (!parent.children) parent.children = [];
                parent.children.push(n);
                setAddedToParent(true);
            }

        }
    });

    let layout: any = {};
    if (node) {

        //Set our layout from props
        if (w !== null && typeof w !== "undefined") node.width = w;
        if (h !== null && typeof h !== "undefined") node.height = h;
        node.flex = flex ?? 0;
        node.flexDirection = flexDirection;
        node.marginBottom = marginBottom;
        node.marginTop = marginTop;
        node.alignItems = alignItems;
        node.marginLeft = marginLeft;
        node.marginRight = marginRight;
        node.paddingBottom = paddingBottom;
        node.paddingTop = paddingTop;
        node.paddingLeft = paddingLeft;
        node.paddingRight = paddingRight;
        node.minHeight = minHeight;
        node.minWidth = minWidth;
        node.border = border;
        node.justifyContent = justifyContent;
        node.alignItems = alignItems;
        node.style = style;


        if (isRoot) {
            node.calculateLayout(
                typeof w === "number" ? w : undefined,
                typeof h === "number" ? h : undefined,
                yoga.DIRECTION_LTR
            );
        }
        //Get our computed CSS layout
        const computedLayout = node.getComputedLayout();

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
                const index = parent.children?.indexOf(node);
                if (index !== undefined && index !== null) {
                    parent.children?.splice(index, 1);
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
                    {children as ReactNode}
                </div>
            </BoxContext.Provider>
        </AutoSizeContext.Provider>
    );
};
