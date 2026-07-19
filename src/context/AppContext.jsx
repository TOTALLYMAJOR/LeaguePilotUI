import { createContext, useContext, useState } from "react";
import { DEMO_USER, TEAM } from "../data/demo.js";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(DEMO_USER);
  const [team] = useState(TEAM);

  function switchRole(role) {
    if (user.roles.includes(role)) {
      setUser((u) => ({ ...u, activeRole: role }));
    }
  }

  return (
    <AppContext.Provider value={{ user, team, switchRole }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
