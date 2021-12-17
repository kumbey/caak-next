import { createContext, useContext, useMemo, useState } from "react";

const WrapperContext = createContext();

function useWrapper() {
  const context = useContext(WrapperContext);
  if (!context) {
    throw new Error(`useWrapper must be used within a WrapperProvider`);
  }

  return context;
}

function WrapperProvider(props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationMenu, setIsNotificationMenu] = useState(false);
  const [feedSortType, setFeedSortType] = useState("DEFAULT");

  const value = useMemo(
    () => ({ isMobileMenuOpen, setIsMobileMenuOpen, isNotificationMenu, setIsNotificationMenu, feedSortType, setFeedSortType }),
    [isMobileMenuOpen, isNotificationMenu, feedSortType]
  );
  return <WrapperContext.Provider value={value} {...props} />;
}

export { WrapperProvider, useWrapper };
