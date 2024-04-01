import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useState, useRef } from "react";
import { useOnClickOutside } from "../hooks/useJobItems";

export default function BookmarksButton() {
  const [isVisible, setIsVisible] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const popOverRef = useRef<HTMLDivElement>(null);
  useOnClickOutside([btnRef, popOverRef], () => setIsVisible(false));
  console.log(isVisible);
  return (
    <section>
      <button
        ref={btnRef}
        onClick={() => setIsVisible((p) => !p)}
        className="bookmarks-btn"
      >
        Bookmarks <TriangleDownIcon />
      </button>
      {isVisible && <BookmarksPopover ref={popOverRef} />}
    </section>
  );
}
