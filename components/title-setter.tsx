"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function niceTitleFromPath(path: string) {
  if (!path || path === "/") return "Home";
  // remove leading/trailing slashes and split
  const segments = path.replace(/(^\/|\/$)/g, "").split("/");
  // take last segment as page name and convert to Title Case
  const last = segments[segments.length - 1] || "";
  const words = last.split(/[-_]/).map(w => w.charAt(0).toUpperCase() + w.slice(1));
  return words.join(" ");
}

export default function TitleSetter() {
  const pathname = usePathname();

  useEffect(() => {
    const page = niceTitleFromPath(pathname || "/");
    document.title = `SCC — ${page}`;
  }, [pathname]);

  return null;
}
