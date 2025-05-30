
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Growth() {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/growth/routines');
  }, [navigate]);
  
  return null;
}
