import { useContext } from "react";
import AuthContext from "../components/context/AuthContext";

const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;