import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    // Map pathnames to Turkish labels
    const routeMap = {
        "courses": "Dersler",
        "course": "Ders Detay",
        "programs": "Programlar",
        "profile": "Profil",
        "dashboard": "Panel",
        "leaderboard": "Liderlik Tablosu"
    };

    if (pathnames.length === 0) return null;

    return (
        <nav className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-gray-500 mb-6">
            <Link to="/" className="hover:text-brand-gold transition-colors flex items-center gap-1">
                <Home className="w-3 h-3" />
                <span>Ana Sayfa</span>
            </Link>
            
            {pathnames.map((name, index) => {
                let routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                let label = routeMap[name] || name;

                // Handle specifically the 'course' segment to point to '/courses'
                if (name === "course") {
                    label = "Dersler";
                    routeTo = "/courses";
                    // If we have an ID after this, this 'Dersler' segment should NOT be 'isLast'
                }

                // If the segment is a numeric ID, label it as "Ders Detay"
                if (!isNaN(name)) {
                    label = "Ders Detay";
                }

                const isLast = index === pathnames.length - 1;

                return (
                    <div key={routeTo + index} className="flex items-center gap-2">
                        <ChevronRight className="w-3 h-3" />
                        {isLast ? (
                            <span className="text-brand-gold">{label}</span>
                        ) : (
                            <Link to={routeTo} className="hover:text-brand-gold transition-colors">
                                {label}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
