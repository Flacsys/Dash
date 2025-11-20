import { LuShieldAlert, LuLogOut } from "react-icons/lu";

const Topbar = () => {
    const handleLogout = () => {
        console.log("Logout clicked");
    };

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4 z-50">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <LuShieldAlert className="h-8 w-8 text-blue-600" />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-sm text-gray-500">Manage participant records and modules</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    type="button"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-white hover:bg-gray-50 text-gray-900 h-9 rounded-md px-3"
                >
                    <LuLogOut className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Topbar;

