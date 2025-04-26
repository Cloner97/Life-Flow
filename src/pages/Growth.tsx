
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Growth() {
  const navigate = useNavigate();
  
  // Redirect to today page by default
  useEffect(() => {
    navigate('/growth/today');
  }, [navigate]);
  
  return null;
}
