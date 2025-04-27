
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Finance() {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/finance/transactions');
  }, [navigate]);
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">💰</div>
        <h1 className="text-3xl font-bold mb-4">مدیریت مالی</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          ابزاری برای رصد درآمدها، هزینه‌ها، بودجه‌بندی و برنامه‌ریزی مالی هوشمند تا بتونی با آرامش روی رشد و موفقیت شخصی‌ت تمرکز کنی.
        </p>
      </div>
    </div>
  );
}
