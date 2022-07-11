# react-layout - Programmatic layout for web applications

## VBox and HBox for the web

react-layout uses the 'yoga' flex layout engine to provide predictable, programmatic layout to web applications. What's 'programmatic' layout? In this context it means using absolute CSS positioning that's calculated in JS.

Though react-layout does use CSS under the hood, the CSS it uses is boiled down to absolute layout, top, left, width, height, all the positional calculations are done in JS.

### Why would you do this?

Mostly because I can, but also because I think this fits a niche. I know we've had flexbox for quite some time, but I've never been satisfied with a pure CSS approach to controlling the layout of a web application.

CSS was designed to create responsive, re-flowable documents and I've never felt was a great fit for complex application layouts, layouts that need _some_ flexibility, but don't need to be 100% responsive.

### That's crazy, why don't you just absolutely positive everything in your 'apps' and be done with it?

Absolute positing is far too inflexible because you can't deliver your app with a fixed viewport size (unless you've got a time machine to 1999). Between a fixed viewport and a purely responsive web application, there's a nice medium where you have a large, desktop sized viewport, and you want your content to adapt to the size of the viewport, _within reason_.

This implementation of VBox and HBox sits squarely in that goldilocks zone, providing fast, predictible and responsive layout for desktop sized viewports.

### Why not just use flexbox?

react-layout uses 'yoga', a C++ implementation of the flexbox layout engine (compiled down to asm.js). But that's not really the point here. How easily have you ever been able to just create a flexbox layout that does what you want it to do? Is it align-items? Or is it justify-content. flex-grow? flex-shrink?

The flexbox CSS api is complex, and it's overkill in many situations. VBox and HBox prefers composition and nesting to complex configuration. With just a few properties and nested VBox/HBox layouts you can accomplish highly complex layouts that adapt and change as the available space changes.

Let's start with an example

```javascript
<AutoSize viewPort={true}>
    <VBox centered={true}>
        <HBox centered={true} spacing="10%" height="75%">
            <VBox width="20%" style={boxShadow}></VBox>
            <VBox width="20%" style={boxShadow}></VBox>
            <VBox width="20%" style={boxShadow}></VBox>
        </HBox>
    </VBox>
</AutoSize>
```

Here's two versions of that layout with different viewport aspect ratios:

![Wide](/wide.png)

![Wide](/narrow.png)

The wrapping tag is a centered VBox, this means it will layout its children vertically within itself, splitting any left over space the children do not consume equally above and below the children.

Its only child is an HBox, which is also centered. Its height is 75%, meaning it will always consume 75% of the height of its parent.

The HBox itself is centered, so its children will be layed out horizontally and centered. The HBox also has spacing set to "10%", this means space will be injected between elements, taking up 10% of the available width for each spacer.

This is one of the benefits of programmatic layout, as this is very difficult to accomplish with pure CSS.

### Ok, that's kind nice, but isn't this incredibly slow?

No, not really. Run `npm run start` to see the torture test example. This has a deeply nested complex layout that's bound to the size of the viewpoint. Every time that viewport says changes, the entire layout is recalculated and every single child Box is re-rendered.

# Usage

There must be an anchor to the layout, either 'AutoSize' at the root, set to viewport=true, or some other means of passing width and height properties to the root HBox or VBox.

HBox and VBox support the following properties:

```typescript
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
}
```

To set the flex direction, you use VBox and HBox, to set the 'flex' of children, you can set the flex property directly, or use width and height, which support percentages, for example width="20%".

You can also set the width or the height to a fixed number. This will always be respected by the layout engine. For example width={10}.

 In a VBox, children without a width will flex to fill 100% of the width, in an HBox children without a height will flex to fill 100% of the height.

 ## Spacing

 If you specify 'spacing' either as a percentage or a fixed number of pixels, a spacer Box will be injected into the layout between the items in the parent HBox or VBox.

 ## Setting styles

 You can set styles on an HBox or VBox and they will be passed through to the underlying html. Avoid setting any style having to do with layout, the results will be unpredictable.

 The layout engine sets width, height, left, top, bottom, right, position, and box-sizing, so you don't want to set those. It's recommended that you stick to purely visual styling elements.

 ## Margin and Padding

 The layout supports 'margin' and 'padding' properties, in pixels - these will set the margin and padding on all sides to the same value. If you want to set them invididually use marginLeft, marginRight, marginTop, marginBottom and the same for padding.

# Tips on layout

Flexbox and the newer CSS grid eschew nesting, preferring complicated configuration to generate incredibly flexible layouts. Nesting can be a barrier to flexibility, but it can also be a way to build complex layouts from simpler parts.

VBox and HBox virtually require nesting to get anything complicated done.

Remember this example:

```javascript
<AutoSize viewPort={true}>
    <VBox centered={true}>
        <HBox centered={true} spacing="10%" height="75%">
            <VBox width="20%" style={boxShadow}></VBox>
            <VBox width="20%" style={boxShadow}></VBox>
            <VBox width="20%" style={boxShadow}></VBox>
        </HBox>
    </VBox>
</AutoSize>
```

Two centered nested boxes with opposite directions get us centering in both directions, which is relatively simple to follow compared to flexbox solutions.

# Responsiveness

The way HBox and VBox nest, there's going to be limits to the level of responsiveness you can achieve if you use HBox/VBox exclusively for layout. You aren't going to be able to entirely reflow a layout between desktop and mobile.

The target of this library is specifically complicated desktop-like applications, so responsiveness wasn't a design goal.

But there are some things you can do to improve responsiveness:
1. Use 'flex' or percentage widths/height as much as possible.
2. Use a responsive layout system for the root of your layout hierarchy, and use HBox/VBox to layout the details in the leaf nodes.
3. Use multiple layouts with break points. Use useWindowSize or similar to detect changes to the viewport size, and toggle between different layouts.




