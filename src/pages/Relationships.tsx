
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Relationships() {
  const navigate = useNavigate();
  
  // Redirect to contacts page by default
  useEffect(() => {
    navigate('/relationships/contacts');
  }, [navigate]);
  
  return null;
}
