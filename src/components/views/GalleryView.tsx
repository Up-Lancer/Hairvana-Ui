import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import HairstyleCard from '../cards/HairstyleCard';

interface GalleryViewProps {
  t: (key: string) => string;
  defaultHairstyles: any[];
  handleAddToFavorites: (style: any) => void;
  setActiveView: (view: 'home' | 'ar' | 'gallery' | 'booking' | 'profile' | 'chat' | 'evaluation' | 'bookAppointment' | 'payment' | 'favorites' | 'salons' | 'paymentDetails' | 'history' | 'salonDetails' | 'styleDetails' | 'settings' | 'bookingHistory') => void;
  setSelectedStyle: (style: any) => void;
  setSelectedAppointmentStyle: (style: any) => void;
  defaultSalons: any[];
  cnFallback: (...classes: (string | undefined | null | false)[]) => string;
  isStyleFavorited: (id: string) => boolean;
}

const GalleryView: React.FC<GalleryViewProps> = ({
  t,
  defaultHairstyles,
  handleAddToFavorites,
  setActiveView,
  setSelectedStyle,
  setSelectedAppointmentStyle,
  defaultSalons,
  cnFallback,
  isStyleFavorited,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Gallery Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t('view.gallery')}</h2>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => alert('Search functionality coming soon!')}
            className="p-2 bg-gray-100 rounded-lg"
          >
            <Search className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => alert('Filter functionality coming soon!')}
            className="p-2 bg-gray-100 rounded-lg"
          >
            <Filter className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
      {/* Style Grid */}
      <div className="grid grid-cols-2 gap-4">
        {defaultHairstyles.map((style: any) => (
          <HairstyleCard
            key={style.id}
            style={style}
            onClick={() => {
              setSelectedStyle(style);
              setActiveView('ar');
            }}
            t={t}
            className="cursor-pointer"
          >
            <div className="flex gap-2 mt-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={e => {
                  e.stopPropagation();
                  handleAddToFavorites(style);
                  setActiveView('favorites');
                }}
                className={cnFallback(
                  'p-1 rounded-full',
                  isStyleFavorited(style.id) ? 'text-red-500' : 'text-gray-400'
                )}
              >
                {/* Heart icon is in HairstyleCard or can be added here if needed */}
                ♥
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={e => {
                  e.stopPropagation();
                  setSelectedAppointmentStyle(style);
                  setActiveView('bookAppointment');
                }}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg text-xs font-medium"
              >
                {t('bookNow') || 'Book'}
              </motion.button>
            </div>
          </HairstyleCard>
        ))}
      </div>
    </motion.div>
  );
};

export default GalleryView; 