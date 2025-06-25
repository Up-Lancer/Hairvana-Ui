import React from 'react';
import { Star } from 'lucide-react';

interface HairstyleCardProps {
  style: {
    id: string;
    name: string;
    image: string;
    aiMatch: number;
    category: string;
    trending?: boolean;
    difficulty?: string;
  };
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  t?: (key: string) => string;
}

const HairstyleCard: React.FC<HairstyleCardProps> = ({ style, onClick, children, className = '', t }) => {
  return (
    <div
      className={`relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer ${className}`}
      onClick={onClick}
    >
      <img
        src={style.image}
        alt={style.name}
        className="w-full h-32 object-cover"
      />
      <div className="p-3">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-sm">{style.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs text-purple-600 font-medium">{style.aiMatch}%</span>
          </div>
        </div>
        <p className="text-xs text-gray-500">{style.category}</p>
      </div>
      {style.trending && t && (
        <div className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full">
          {t('trending')}
        </div>
      )}
      {children}
    </div>
  );
};

export default HairstyleCard; 