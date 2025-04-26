
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Finance() {
  const navigate = useNavigate();
  
  // Redirect to transactions page by default
  useEffect(() => {
    navigate('/finance/transactions');
  }, [navigate]);
  
  return null;
}
