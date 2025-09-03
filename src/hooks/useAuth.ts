import AuthContextExports from "@/context/AuthContext";
import { useContext } from "react";

const useAuth = () => useContext(AuthContextExports.AuthContext);

export default useAuth;
