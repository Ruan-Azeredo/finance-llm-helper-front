import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LayoutContainer from "./LayoutContainer";
import AddTransactions from "./pages/AddTransactions";
import Login from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./contexts/Auth";
import AllTransactions from "./pages/AllTransactions";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";

const RouterManager = () => {

    const { isAuthenticated, accessToken } = useContext(AuthContext)
    console.log(isAuthenticated)

    const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
        if(accessToken) {
            return children
        } else return <Navigate to="/login" />
    }

    const AuthRoute = ({ children }: { children: JSX.Element }) => {
        if(!accessToken) {
            return children
        } else return <Navigate to="/" />;
    }

    const protectedRoutes = [
        { path: "/", element: <AddTransactions/> },
        { path: "/transactions", element: <AllTransactions/> },
        { path: "/dashboard", element: <Dashboard/> }
    ];

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
                <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />

                {/* Catch-All Route for 404 */}
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouterManager