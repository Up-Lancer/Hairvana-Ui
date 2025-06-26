import React from 'react';
import { Star, MapPin, Clock } from 'lucide-react';

interface SalonCardProps {
  salon: any;
  onViewServices: () => void;
  onBook: () => void;
  cnFallback: (...classes: (string | undefined | null | false)[]) => string;
  t: (key: string) => string;
}

const SalonCard: React.FC<SalonCardProps> = ({ salon, onViewServices, onBook, cnFallback, t }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 flex gap-4">
      <img
        src={salon.image}
        alt={salon.name}
        className="w-20 h-20 rounded-lg object-cover"
      />
      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{salon.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{salon.distance}</span>
              <span className="text-gray-400">•</span>
              <span>{salon.priceRange}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-medium">{salon.rating}</span>
            </div>
            <div className="text-sm text-gray-500">{salon.reviewCount} {t('reviews') || 'reviews'}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {salon.services.slice(0, 3).map((service: string) => (
            <span
              key={service}
              className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
            >
              {service}
            </span>
          ))}
          {salon.services.length > 3 && (
            <span className="text-xs text-gray-500 px-2 py-1">
              +{salon.services.length - 3} {t('more') || 'more'}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <Clock className="w-4 h-4 inline mr-1" />
            {salon.openHours}
          </div>
          <div className="flex gap-2">
            <button
              className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-lg font-medium"
              onClick={onViewServices}
            >
              {t('viewServices') || 'View Services'}
            </button>
            <button
              onClick={onBook}
              className="text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-lg font-medium"
            >
              {t('bookNow') || 'Book'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonCard; 