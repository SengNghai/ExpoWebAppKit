import { useEffect } from "react";

/**
 * 禁用滚动
 * @param disable 是否禁用滚动
 */
export function useDisableScroll(disable = true) {
  useEffect(() => {
    if (disable && typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overscrollBehavior = "none";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overscrollBehavior = "auto";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overscrollBehavior = "auto";
    };
  }, [disable]);
}
