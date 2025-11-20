import type { RouteObject } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import RootLayout from "./layouts/RootLayout.tsx";

export const appRoutes: RouteObject[] = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                index: true,
                element: <Dashboard />,
            },
        ],
    },
];