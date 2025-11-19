import { useEffect } from 'react';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
// import { useAppSelector } from '../store/hooks';
// import { useLogout } from '../hooks/useLogout';
// import { Sidebar, Topbar } from './index';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const RootLayout = () => {
    const { isAuthenticated, tokenExpiryTime } = useAppSelector((state) => state.auth);
    const { handleLogout } = useLogout();

    useEffect(() => {
        if (!tokenExpiryTime) return;

        const expiryDate = new Date(tokenExpiryTime).getTime();
        const now = Date.now();
        const delay = expiryDate - now;

        if (delay <= 0) {
            handleLogout();
        } else {
            const timeout = setTimeout(() => {
                handleLogout();
            }, delay);

            return () => clearTimeout(timeout);
        }
    }, [tokenExpiryTime, handleLogout]);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="w-full flex bg-[#F7F9FC] h-screen overflow-hidden">
            <ScrollToTop />
            <Sidebar />
            <main className="w-full h-full relative flex-1 lg:ml-[260px] flex flex-col">
                <nav className="w-full bg-white lg:pl-[260px] pl-0 fixed top-0 left-0 z-30">
                    <Topbar />
                </nav>
                <section
                    id="scrollable-section"
                    className="grow overflow-scroll mt-[60px] p-4 max-md:py-8 md:p-6 lg:p-8"
                >
                    <Outlet />
                </section>
            </main>
        </div>
    );
};

export default RootLayout;