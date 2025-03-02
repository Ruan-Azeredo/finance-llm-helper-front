import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LayoutContainer from "./LayoutContainer";
import AddTransactions from "./pages/AddTransactions";
import Login from "./pages/Login";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/Auth";
import AllTransactions from "./pages/AllTransactions";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";

const RouterManager = () => {

    const { isAuthenticated, instance } = useContext(AuthContext)
    console.log(isAuthenticated)

    const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
        if(isAuthenticated !== undefined && isAuthenticated === true) {
            return children
        } else if(isAuthenticated !== undefined && isAuthenticated === false) return <Navigate to="/login" />
    }

    const AuthRoute = ({ children }: { children: JSX.Element }) => {
        if(isAuthenticated !== undefined && isAuthenticated === false) {
            return children
        } else if(isAuthenticated !== undefined && isAuthenticated === true) return <Navigate to="/" />;
    }

    const protectedRoutes = [
        { path: "/", element: <AddTransactions/> },
        { path: "/transactions", element: <AllTransactions/> },
        { path: "/dashboard", element: <Dashboard/> }
    ];

    useEffect(() => {
        console.log('isAuthenticated ', isAuthenticated)
        console.log('instance.defaults.headers.common["Authorization"] ', instance.defaults.headers.common["Authorization"])
    }, [isAuthenticated])

    return (
        <BrowserRouter>
            <Routes>
                {/* Protected Routes inside LayoutContainer */}
                <Route element={<LayoutContainer />}>
                    {protectedRoutes.map(({ path, element }) => (
                        <Route key={path} path={path} element={<ProtectedRoute>{element}</ProtectedRoute>} />
                    ))}
                </Route>

                {/* Public Routes */}
                <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />

                {/* Catch-All Route for 404 */}
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouterManager