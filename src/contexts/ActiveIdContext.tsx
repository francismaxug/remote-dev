import { createContext } from "react";

import { useActiveId } from "../hooks/useActiveId";

type BkMark = {
  activeId: number | null;
};

export const ActiveIdContext = createContext<BkMark | null>(null);

export default function ActiveIdsContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeId = useActiveId();
  return (
    <ActiveIdContext.Provider
      value={{
        activeId,
      }}
    >
      {children}
    </ActiveIdContext.Provider>
  );
}
