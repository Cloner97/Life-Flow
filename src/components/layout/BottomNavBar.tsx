
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, List, User, Home, Settings, ArrowLeft } from "lucide-react";

const navItems = [
  {
    label: "داشبورد",
    icon: Home,
    path: "/"
  },
  {
    label: "پروژه‌ها",
    icon: List,
    path: "/projects"
  },
  {
    label: "امور مالی",
    icon: LayoutDashboard,
    path: "/finance"
  },
  {
    label: "سلامتی",
    icon: User,
    path: "/health"
  },
  {
    label: "رشد فردی",
    icon: Settings,
    path: "/growth"
  },
  {
    label: "روابط",
    icon: ArrowLeft,
    path: "/relationships"
  }
];

export function BottomNavBar() {
  const location = useLocation();

  return (
    <nav className="fixed inset-x-0 bottom-0 bg-white border-t z-50 flex justify-around items-center py-2 md:hidden shadow whitespace-nowrap">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={
              isActive
                ? "flex flex-col items-center gap-1 text-lifeos-primary font-bold"
                : "flex flex-col items-center gap-1 text-gray-500 hover:text-lifeos-primary"
            }
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
