import type { RouteObject } from "react-router-dom";
import Login from "./pages/Login.tsx";

export const appRoutes: RouteObject[] = [
    {
        path: "/login",
        element: <Login />,
    }
];