import { useEffect } from "react";

const useDynamicTitle = (pageTitle: string) => {
  useEffect(() => {
    const originalTitle = pageTitle;
    const attentionMessage = "Still Thinking? 👀";

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = attentionMessage;
      } else {
        document.title = originalTitle;
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pageTitle]);
};

export default useDynamicTitle;