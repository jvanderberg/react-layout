import useResizeObserver from "@react-hook/resize-observer";
import {
  createContext,
  ReactNode,
  useEffect,
  useLayoutEffect,
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
    toJSON: () => {},
  });
  const handler = () => {
    console.log("SET SIZE", target?.current?.getBoundingClientRect());
    setSize(target?.current?.getBoundingClientRect());
  };
  useResizeObserver(target, handler);
  console.log({ size });
  useLayoutEffect(() => {
    setTimeout(() => setSize(target?.current?.getBoundingClientRect()));
  }, [target]);

  return size;
};

interface AutoSizeProps {
  children?: ReactNode;
}
export const AutoSize = ({ children }: AutoSizeProps): JSX.Element => {
  const target = useRef<HTMLDivElement>(null);
  const size = useSize(target);
  return (
    <AutoSizeContext.Provider
      value={{ width: size?.width, height: size?.height }}
    >
      <div ref={target}>{children}</div>
    </AutoSizeContext.Provider>
  );
};
