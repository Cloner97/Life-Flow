
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Health() {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/health/sleep');
  }, [navigate]);
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">💪</div>
        <h1 className="text-3xl font-bold mb-4">سلامتی</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          این بخش کمک می‌کنه فعالیت‌های ورزشی، تغذیه، خواب و سلامت روانت رو ثبت و مدیریت کنی تا همیشه از نظر جسمی و ذهنی در بهترین حالت باشی.
        </p>
      </div>
    </div>
  );
}
