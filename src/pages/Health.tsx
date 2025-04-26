
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Health() {
  const navigate = useNavigate();
  
  // Redirect to sleep page by default
  useEffect(() => {
    navigate('/health/sleep');
  }, [navigate]);
  
  return null;
}
