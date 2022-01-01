import { useContext } from "react";
import { AuthContext } from "../Shared/AuthProdiver/AuthProvider";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;