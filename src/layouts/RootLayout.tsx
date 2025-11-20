import { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Topbar from './Topbar.tsx';


const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const RootLayout = () => {
    // const { isAuthenticated, tokenExpiryTime } = useAppSelector((state) => state.auth);
    // const { handleLogout } = useLogout();

    // useEffect(() => {
    //     if (!tokenExpiryTime) return;

    //     const expiryDate = new Date(tokenExpiryTime).getTime();
    //     const now = Date.now();
    //     const delay = expiryDate - now;

    //     if (delay <= 0) {
    //         handleLogout();
    //     } else {
    //         const timeout = setTimeout(() => {
    //             handleLogout();
    //         }, delay);

    //         return () => clearTimeout(timeout);
    //     }
    // }, [tokenExpiryTime, handleLogout]);

    // if (!isAuthenticated) {
    //     return <Navigate to="/login" replace />;
    // }

    return (
        <div className="w-full flex flex-col bg-[#F7F9FC] h-screen overflow-hidden">
            <ScrollToTop />
            <Topbar />
            <section
                id="scrollable-section"
                className="grow overflow-scroll py-4 md:py-6 px-4 md:px-8 lg:px-44"
            >
                <Outlet />
            </section>
        </div>
    );
};

export default RootLayout;