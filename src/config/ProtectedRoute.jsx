import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { auth, loading } = useContext(AuthContext);

  
    if (loading) return <h1>Loading...</h1>;

  
    if (!auth) return <Navigate to="/login" />;

    return children;
};

export default ProtectedRoute;