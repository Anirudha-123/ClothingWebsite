import { createContext, useContext, useState } from "react";

const LoginModalContext = createContext();

export const useLoginModal = () => useContext(LoginModalContext);

export const LoginModalProvider = ({ children }) => {
const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <LoginModalContext.Provider value={{ isLoginModalOpen, setLoginModalOpen }}>
      {children}
    </LoginModalContext.Provider>
  );
};
