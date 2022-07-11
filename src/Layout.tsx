// @ts-check

import React, { ReactNode } from "react";
import { useContext } from "react";
import yoga from "yoga-layout-prebuilt";
import { Box, BoxContext } from "./Box";

interface BoxProps {
    id?: string;
    width?: number | string;
    height?: number | string;
    flex?: number;
    margin?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    padding?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    minHeight?: number;
    minWidth?: number;
    border?: number;
    style?: object;
    centered?: boolean;
    spacing?: number | string;
    displayName?: string;
    children?: ReactNode;
}
interface SpacerProps {
    width?: number | string;
    height?: number | string;
    size?: number | string;
    flex?: number;
    style?: object;
}

const boxFactory = (flexDirection: yoga.YogaFlexDirection) =>
// eslint-disable-next-line react/display-name
{
    const FactoryBox: React.FC<BoxProps> = ({
        id,
        children,
        width,
        height,
        flex,
        style,
        margin,
        marginLeft,
        marginBottom,
        marginRight,
        marginTop,
        padding,
        paddingLeft,
        paddingBottom,
        paddingRight,
        paddingTop,
        centered,
        spacing,
        displayName
    }) => {
        let alignItems;
        let justifyContent;
        const { parent } = useContext(BoxContext);
        let w = width;
        let h = height;
        let f = flex;
        if (parent?.getFlexDirection() === yoga.FLEX_DIRECTION_COLUMN) {
            w = w ?? "100%";
            if (typeof h === "undefined" && !flex) {
                f = 1;
            }
        }
        if (parent?.getFlexDirection() === yoga.FLEX_DIRECTION_ROW) {
            h = h ?? "100%";
            if (typeof w === "undefined" && !flex) {
                f = 1;
            }
        }
        if (centered) {
            justifyContent = yoga.JUSTIFY_CENTER;
        }

        const pl = paddingLeft ?? padding;
        const pr = paddingRight ?? padding;
        const pt = paddingTop ?? padding;
        const pb = paddingBottom ?? padding;
        const ml = marginLeft ?? margin;
        const mr = marginRight ?? margin;
        const mt = marginTop ?? margin;
        const mb = marginBottom ?? margin;

        return (
            <Box
                id={id}
                flexDirection={flexDirection}
                flex={f}
                width={w}
                height={h}
                style={style}
                marginLeft={ml}
                marginRight={mr}
                marginBottom={mb}
                marginTop={mt}
                paddingLeft={pl}
                paddingRight={pr}
                paddingBottom={pb}
                paddingTop={pt}
                alignItems={alignItems}
                justifyContent={justifyContent}
                displayName={displayName}
            >
                {spacing &&
                    React.Children.map(children, (child, i) => (
                        <>
                            {i > 0 && <Spacer width={spacing}></Spacer>}
                            {child}
                        </>
                    ))}
                {typeof spacing === "undefined" && children}
            </Box>
        );
    };
    return FactoryBox;
};

export const VBox = boxFactory(yoga.FLEX_DIRECTION_COLUMN);
export const HBox = boxFactory(yoga.FLEX_DIRECTION_ROW);

export const Spacer: React.FC<SpacerProps> = ({
    size,
    flex,
    width,
    height,
    style,
}) => {
    const { parent } = useContext(BoxContext);
    let w = width;
    let h = height;
    let f = flex;
    if (parent?.getFlexDirection() === yoga.FLEX_DIRECTION_COLUMN) {
        w = width ?? size ?? "100%";
        if (size) h = size;
        if (typeof h === "undefined" && !flex) {
            f = 1;
        }
    }
    if (parent?.getFlexDirection() === yoga.FLEX_DIRECTION_ROW) {
        h = "100%";
        if (size) w = size;
        if (typeof w === "undefined" && !flex) {
            f = 1;
        }
    }
    return <Box flex={f} width={w} height={h} style={style} />;
};
