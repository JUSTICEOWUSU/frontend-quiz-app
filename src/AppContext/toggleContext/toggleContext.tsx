import { createContext, useState } from "react";

interface ToggleContextType {
  toggleState: string;
  setToggleState: React.Dispatch<React.SetStateAction<string>>;
}

// default values for the context
const initialValue: ToggleContextType = {
  toggleState: "",
  setToggleState: () => {},
};

// Context for the toggle switch
export const ToggleContext = createContext(initialValue);

export default function ToggleContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toggleState, setToggleState] = useState<string>("");

  return (
    <ToggleContext.Provider value={{ toggleState, setToggleState }}>
      {children}
    </ToggleContext.Provider>
  );
}
