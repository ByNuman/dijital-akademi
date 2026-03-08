import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function PrivateRoute() {
    const { currentUser, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#101010]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-brand-gold font-medium">
                        Yükleniyor...
                    </p>
                </div>
            </div>
        );
    }

    return currentUser ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}
