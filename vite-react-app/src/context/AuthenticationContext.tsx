import { createContext } from "react";


export const AuthenticationContext = createContext(!!localStorage.getItem("token"));
