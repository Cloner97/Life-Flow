
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Relationships() {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/relationships/contacts');
  }, [navigate]);
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">❤️</div>
        <h1 className="text-3xl font-bold mb-4">روابط</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          مرکزی برای مراقبت از روابطت؛ ثبت اطلاعات افراد مهم، یادآوری رویدادها و مناسبت‌ها و ساختن روابط قوی و معنادار با اطرافیان.
        </p>
      </div>
    </div>
  );
}
