import useResizeObserver from "@react-hook/resize-observer";
import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

export interface AutoSizeContextType {
  width: number | symbol | undefined;
  height: number | symbol | undefined;
}

export const NO_AUTOSIZE = Symbol("NO_AUTOSIZE");
export const DefaultAutoSizeContext: AutoSizeContextType = {
  width: NO_AUTOSIZE,
  height: NO_AUTOSIZE,
};

export const AutoSizeContext = createContext(DefaultAutoSizeContext);

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
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    toJSON: () => {},
  });
  const handler = () => {
    setSize(target?.current?.getBoundingClientRect());
  };
  useResizeObserver(target, handler);
  useEffect(() => {
    setTimeout(() => setSize(target?.current?.getBoundingClientRect()));
  }, [target]);

  return size;
};

interface AutoSizeProps {
  children?: ReactNode;
  viewPort?: boolean;
}
export const AutoSize = ({
  children,
  viewPort = false,
}: AutoSizeProps): JSX.Element => {
  const target = useRef<HTMLDivElement>(null);
  const size = useSize(target);
  return (
    <AutoSizeContext.Provider
      value={{ width: size?.width, height: size?.height }}
    >
      <div
        style={{ ...(viewPort ? { width: "100vw", height: "100vh" } : {}) }}
        ref={target}
      >
        {children}
      </div>
    </AutoSizeContext.Provider>
  );
};
