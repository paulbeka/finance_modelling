import { useEffect, useRef } from "react";
import style from "./CSS/blocks.module.css";

export default function ParallaxBlocks() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!bgRef.current) return;
      const offset = window.scrollY * 0.06;
      bgRef.current.style.transform = `translateY(${-offset}px)`;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={bgRef}
      className={style["blocks-background"]}
    />
  );
}
