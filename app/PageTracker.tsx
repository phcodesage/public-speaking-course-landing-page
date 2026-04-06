"use client";

import { useEffect } from "react";

export default function PageTracker() {
  useEffect(() => {
    fetch("/api/visits", { method: "POST" }).catch(() => {});
  }, []);
  return null;
}
