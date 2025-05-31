// /src/hooks/useDocumentTitle.js
import { useEffect } from "react";

// Custom hook to dynamically update the HTML document's title
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

