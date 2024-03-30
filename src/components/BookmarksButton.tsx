import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useState } from "react";

export default function BookmarksButton() {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <section>
      <button onClick={() => setIsVisible(p=>!p)} className="bookmarks-btn">
        Bookmarks <TriangleDownIcon />
      </button>
      {isVisible && <BookmarksPopover />}
    </section>
  );
}
