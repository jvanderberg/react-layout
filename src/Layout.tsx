// @ts-check

import React, { Suspense, useContext } from "react";
import { FlexDirection, loadYoga } from "yoga-layout";

import { Box, BoxContext, BoxProps, CSSDimension } from "./Box";

export let YogaPromise: ReturnType<typeof loadYoga>;
async function load() {
    YogaPromise = loadYoga();
}
load();


interface SpacerProps {
    width?: CSSDimension;
    height?: CSSDimension;
    size?: CSSDimension;
    flex?: number;
    style?: object;
}

const boxFactory = (flexDirection: FlexDirection) =>
// eslint-disable-next-line react/display-name
{
    const FactoryBox: React.FC<BoxProps & { spacing?: CSSDimension }> = ({
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

    }) => {
        let alignItems;
        const { parent } = useContext(BoxContext);
        let w = width;
        let h = height;
        let f = flex;
        if (parent?.getFlexDirection() === FlexDirection.Column) {
            w = w ?? "100%";
            if (typeof h === "undefined" && !flex) {
                f = 1;
            }
        }
        if (parent?.getFlexDirection() === FlexDirection.Row) {
            h = h ?? "100%";
            if (typeof w === "undefined" && !flex) {
                f = 1;
            }
        }


        return (
            <Suspense fallback={<div></div>}>
                <Box
                    id={id}
                    flexDirection={flexDirection}
                    flex={f}
                    width={w}
                    height={h}
                    style={style}
                    marginLeft={marginLeft}
                    marginRight={marginRight}
                    marginBottom={marginBottom}
                    marginTop={marginTop}
                    margin={margin}
                    paddingLeft={paddingLeft}
                    paddingRight={paddingRight}
                    paddingBottom={paddingBottom}
                    paddingTop={paddingTop}
                    padding={padding}
                    alignItems={alignItems}
                    centered={centered}
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
            </Suspense>
        );
    };
    return FactoryBox;
};

export const VBox = boxFactory(FlexDirection.Column);
export const HBox = boxFactory(FlexDirection.Row);

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
    if (parent?.getFlexDirection() === FlexDirection.Column) {
        w = width ?? size ?? "100%";
        if (size) h = size;
        if (typeof h === "undefined" && !flex) {
            f = 1;
        }
    }
    if (parent?.getFlexDirection() === FlexDirection.Row) {
        h = "100%";
        if (size) w = size;
        if (typeof w === "undefined" && !flex) {
            f = 1;
        }
    }
    return <Box flex={f} width={w} height={h} style={style} />;
};
