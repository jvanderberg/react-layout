// @ts-check

import useResizeObserver from "@react-hook/resize-observer";
import React, { ReactNode } from "react";
import { useContext } from "react";
import yoga from "yoga-layout-prebuilt";
import { Box, BoxContext } from "./Box";

interface BoxProps {
  displayName?: string;
  children?: any;
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
}
interface SpacerProps {
  displayName?: string;
  children?: ReactNode;
  width?: number | string;
  height?: number | string;
  size?: number | string;
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
  }: BoxProps): JSX.Element => {
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

    return (
      <Box
        displayName={displayName}
        flexDirection={flexDirection}
        flex={f}
        width={w}
        height={h}
        style={style}
        marginLeft={marginLeft}
        marginRight={marginRight}
        marginBottom={marginBottom}
        marginTop={marginTop}
        paddingLeft={pl}
        paddingRight={pr}
        paddingBottom={pb}
        paddingTop={pt}
        alignItems={alignItems}
        justifyContent={justifyContent}
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

export const VBox = boxFactory(yoga.FLEX_DIRECTION_COLUMN);
export const HBox = boxFactory(yoga.FLEX_DIRECTION_ROW);

export const Spacer = ({
  displayName = "",
  size,
  flex,
  width,
  height,
  style,
}: SpacerProps): JSX.Element => {
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
  return (
    <Box
      displayName={displayName}
      flex={f}
      width={w}
      height={h}
      style={style}
    />
  );
};
