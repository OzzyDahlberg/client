import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import isTokenValid from "../utils/token.verify.js";
import ChangePassword from "./admin/change.password.route.jsx";
import Dashboard from "./admin/dashboard.route.jsx";
import Login from "./auth/login.route.jsx";
import Register from "./auth/register.route.jsx";
import Home from "./home.route.jsx";

const routes = [
  {
    id: 1,
    path: "/login",
    element: <Login />,
    protected: false, // Unprotected (guest-only)
    guestOnly: true,
  },
  {
    id: 2,
    path: "/register",
    element: <Register />,
    protected: false, // Unprotected (guest-only)
    guestOnly: true,
  },
  {
    id: 3,
    path: "/",
    element: <Home />,
    protected: true,
  },
  {
    id: 4,
    path: "/admin/dashboard",
    element: <Dashboard />,
    protected: true,
  },
  {
    id: 5,
    path: "/admin/password",
    element: <ChangePassword />,
    protected: true,
  },
];

const AppRoutes = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // > If the user exists but has an invalid token, navigate to /login
  useEffect(() => {
    if (user && !isTokenValid(user.token)) {
      navigate("/login", { replace: true });
    }

    // > Debugging
    if (user && isTokenValid(user.token)) console.log("Token is valid");
    if (user && !isTokenValid(user.token)) console.log("Token is invalid");
  }, [user, navigate]);

  return (
    <Routes>
      {routes.map((route) => {
        // > For unprotected (guest-only) routes (login/register)
        if (!route.protected) {
          return (
            <Route
              key={route.id}
              path={route.path}
              element={
                user && isTokenValid(user.token) ? (
                  // > If the user is logged in, redirect them away from login/register pages
                  <Navigate
                    to="/"
                    replace
                  />
                ) : (
                  route.element
                )
              }
            />
          );
        }

        // For all protected routes
        return (
          <Route
            key={route.id}
            path={route.path}
            element={
              user && isTokenValid(user.token) ? (
                route.element
              ) : (
                <Navigate
                  to="/login"
                  replace
                />
              )
            }
          />
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
