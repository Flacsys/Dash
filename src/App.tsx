import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css"
import { appRoutes } from "./router";

const App = () => {
    const routes = createBrowserRouter([...appRoutes]);

    return (
        <main className="leading-normal">
            <RouterProvider router={routes} />
            {/* <Toaster position="bottom-right" toastOptions={{
        duration: 3000,
        style: {
          background: "#E1781F",
          width: "fit-content !important",
          color: "#fff",
          borderRadius: "10px",
          padding: "16px",
          fontSize: "14px",
          fontWeight: "500",
          lineHeight: "20px",
          letterSpacing: "0.02em",
          textWrap: "nowrap",
          whiteSpace: "nowrap",
        },
      }} /> */}
        </main>
    )
};

export default App;