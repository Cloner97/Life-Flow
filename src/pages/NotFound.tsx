
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="ios-card p-8 text-center max-w-lg animate-fade-in">
        <h1 className="text-6xl font-bold text-lifeos-primary mb-6">404</h1>
        <p className="text-xl text-gray-700 mb-6">صفحه مورد نظر یافت نشد</p>
        <p className="text-gray-600 mb-8">
          مسیری که به دنبال آن هستید ممکن است تغییر کرده یا حذف شده باشد
        </p>
        <Button asChild className="bg-lifeos-primary hover:bg-lifeos-secondary">
          <Link to="/">بازگشت به صفحه اصلی</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
