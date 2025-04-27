
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Growth() {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/growth/today');
  }, [navigate]);
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">🌱</div>
        <h1 className="text-3xl font-bold mb-4">رشد فردی</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          اینجا فضاییه برای تعیین اهداف، ساختن عادت‌های خوب، و پیگیری روند یادگیری‌ت؛ جایی برای ساختن نسخه‌ی بهتر از خودت هر روز.
        </p>
      </div>
    </div>
  );
}
