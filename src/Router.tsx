import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import LayoutContainer from "./LayoutContainer";
import AddTransactions from "./pages/AddTransactions";
import Login from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./contexts/Auth";

const RouterManager = () => {

    const { isAuthenticated } = useContext(AuthContext)

    const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
        return isAuthenticated ? children : <Navigate to="/login" />;
    }

    const AuthRoute = () => {
        return !isAuthenticated ? <Outlet/> : <Navigate to="/" />;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route element={
                    <ProtectedRoute>
                        <LayoutContainer/>
                    </ProtectedRoute>
                }>
                    <Route path="/" element={<AddTransactions/>}/>
                </Route>
                <Route element={
                    <AuthRoute/>
                }>
                    <Route path="login" element={<Login/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RouterManager