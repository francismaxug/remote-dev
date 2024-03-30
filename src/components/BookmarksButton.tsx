import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useState, useEffect, useRef } from "react";

export default function BookmarksButton() {
  const [isVisible, setIsVisible] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const popOverRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.target instanceof HTMLElement &&
        !btnRef.current?.contains(event.target) &&
        !popOverRef.current?.contains(event.target)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);
  return (
    <section>
      <button ref={btnRef} onClick={() => setIsVisible((p) => !p)} className="bookmarks-btn">
        Bookmarks <TriangleDownIcon />
      </button>
      {isVisible && <BookmarksPopover ref={popOverRef} />}
    </section>
  );
}
