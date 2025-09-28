"use client";

import Lottie from "lottie-react";
import fliesAnimation from "./flies.json" assert { type: "json" };

interface LottieFliesProps {
  className?: string;
}

export function LottieFlies({ className = "" }: LottieFliesProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Lottie
        animationData={fliesAnimation}
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
