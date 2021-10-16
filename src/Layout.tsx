// @ts-check

import useResizeObserver from "@react-hook/resize-observer";
import React, { ReactNode } from "react";
import { useContext } from "react";
import yoga from "yoga-layout-prebuilt";
import { Box, BoxContext } from "./Box";

interface BoxProps {
  displayName?: string;
  children?: ReactNode;
  width?: number | string;
  height?: number | string;
  flex?: number;
  style?: object;
}

const boxFactory =
  (flexDirection: yoga.YogaFlexDirection) =>
  ({
    displayName = "",
    children,
    width,
    height,
    flex,
    style,
  }: BoxProps): JSX.Element => {
    const { parent } = useContext(BoxContext);
    let w = width;
    let h = height;
    let f = flex;
    if (parent?.getFlexDirection() === yoga.FLEX_DIRECTION_COLUMN) {
      w = "100%";
      if (!h && !flex) {
        f = 1;
      }
    }
    if (parent?.getFlexDirection() === yoga.FLEX_DIRECTION_ROW) {
      h = "100%";
      if (!w && !flex) {
        f = 1;
      }
    }

    return (
      <Box
        displayName={displayName}
        flexDirection={flexDirection}
        flex={f}
        width={w}
        height={h}
        style={style}
      >
        {children}
      </Box>
    );
  };

export const VBox = boxFactory(yoga.FLEX_DIRECTION_COLUMN);
export const HBox = boxFactory(yoga.FLEX_DIRECTION_ROW);
