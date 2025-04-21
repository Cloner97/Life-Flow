
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './button';

export function BackButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      className="mb-4"
      asChild
    >
      <Link to="/">
        <ChevronLeft className="w-4 h-4 ml-1" />
        <span>بازگشت به صفحه اصلی</span>
      </Link>
    </Button>
  );
}
