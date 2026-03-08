import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pagesConfig } from "../pages.config";

export default function NavigationTracker() {
  const location = useLocation();
  const { Pages, mainPage } = pagesConfig;
  const mainPageKey = mainPage ?? Object.keys(Pages)[0];

  useEffect(() => {
    const pathname = location.pathname;
    let pageName;

    if (pathname === "/" || pathname === "") {
      pageName = mainPageKey;
    } else {
      const pathSegment = pathname.replace(/^\//, "").split("/")[0];

      const pageKeys = Object.keys(Pages);
      const matchedKey = pageKeys.find(
        (key) => key.toLowerCase() === pathSegment.toLowerCase()
      );

      pageName = matchedKey || null;
    }

    // Optional console log instead of Base44 logging
    if (pageName) {
      console.log("User navigated to:", pageName);
    }
  }, [location, Pages, mainPageKey]);

  return null;
}