"use client";

import * as React from "react";

const LOCAL_STORAGE_PREFIX = "panel_";

interface SidebarState {
  isOpen: boolean;
}

interface SidebarContextValue {
  getSidebarState: (id: string) => SidebarState;
  toggleSidebar: (id: string) => void;
  isLoading: boolean;
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(
  undefined,
);

export function useSidebar(id: string) {
  const context = React.useContext(SidebarContext);

  if (!context) {
    console.warn("useSidebar must be used within a SidebarProvider");
    return {
      isSidebarOpen: false,
      toggleSidebar: () => {},
      isLoading: true,
    };
  }

  return {
    isSidebarOpen: context.getSidebarState(id).isOpen,
    toggleSidebar: () => context.toggleSidebar(id),
    isLoading: context.isLoading,
  };
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [sidebarStates, setSidebarStates] = React.useState<
    Record<string, SidebarState>
  >({});
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;

    try {
      const storedStates: Record<string, SidebarState> = {};
      for (let index = 0; index < localStorage.length; index += 1) {
        const key = localStorage.key(index);
        if (key?.startsWith(LOCAL_STORAGE_PREFIX)) {
          const id = key.slice(LOCAL_STORAGE_PREFIX.length);
          storedStates[id] = JSON.parse(localStorage.getItem(key) || "{}");
        }
      }

      if (isMounted) {
        setSidebarStates(storedStates);
      }
    } catch (error) {
      console.error("Failed to load sidebar states:", error);
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const getSidebarState = React.useCallback(
    (id: string): SidebarState => sidebarStates[id] || { isOpen: false },
    [sidebarStates],
  );

  const toggleSidebar = React.useCallback(
    (id: string) => {
      setSidebarStates((prevStates) => {
        const current = prevStates[id] || { isOpen: false };
        const nextState = {
          ...prevStates,
          [id]: { isOpen: !current.isOpen },
        };

        try {
          localStorage.setItem(
            `${LOCAL_STORAGE_PREFIX}${id}`,
            JSON.stringify(nextState[id]),
          );
        } catch (error) {
          console.error("Failed to save sidebar state:", error);
        }

        return nextState;
      });
    },
    [],
  );

  return (
    <SidebarContext.Provider value={{ getSidebarState, toggleSidebar, isLoading }}>
      {children}
    </SidebarContext.Provider>
  );
}