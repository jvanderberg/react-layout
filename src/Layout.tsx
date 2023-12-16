// @ts-check

import React, { MouseEventHandler, ReactNode, Suspense, useContext } from "react";
import { FlexDirection, loadYoga } from "yoga-layout";

import { Box, BoxContext, CSSDimension } from "./Box";

export let YogaPromise: ReturnType<typeof loadYoga>;
async function load() {
    YogaPromise = loadYoga();
}
load();


export interface LayoutProps {
    id?: string;
    width?: CSSDimension;
    height?: CSSDimension;
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
    style?: object;
    children?: ReactNode;
    spacing?: number;
    onClick?: MouseEventHandler;
}


const boxFactory = (flexDirection: FlexDirection) =>
// eslint-disable-next-line react/display-name
{
    const FactoryBox: React.FC<LayoutProps> = ({
        id,
        children,
        width,
        height,
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
        onClick

    }) => {
        const { parent } = useContext(BoxContext);
        let w = width;
        let h = height;
        let f;
        if (parent?.getFlexDirection() === FlexDirection.Column) {
            w = w ?? "100%";
            if (typeof h === "undefined") {
                f = 1;
            }
        }
        if (parent?.getFlexDirection() === FlexDirection.Row) {

            h = h ?? "100%";
            if (typeof w === "undefined") {
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
                    centered={centered}
                    spacing={spacing}
                    onClick={onClick}
                >

                    {children}
                </Box>
            </Suspense>
        );
    };
    return FactoryBox;
};

export const VBox = boxFactory(FlexDirection.Column);
export const HBox = boxFactory(FlexDirection.Row);

