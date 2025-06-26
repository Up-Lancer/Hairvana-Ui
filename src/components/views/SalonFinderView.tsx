import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import SalonCard from '../cards/SalonCard';

interface SalonFinderViewProps {
  t: (key: string) => string;
  defaultSalons: any[];
  defaultStylists: any[];
  setActiveView: (view: 'home' | 'ar' | 'gallery' | 'booking' | 'profile' | 'chat' | 'evaluation' | 'bookAppointment' | 'payment' | 'favorites' | 'salons' | 'paymentDetails' | 'history' | 'salonDetails' | 'styleDetails' | 'settings' | 'bookingHistory') => void;
  setSelectedSalon: (salon: any) => void;
  setSelectedSalonForDetails: (salon: any) => void;
  setSelectedAppointmentStylist: (stylist: any) => void;
  setSelectedAppointmentStyle: (style: any) => void;
  selectedStyle: any;
  defaultHairstyles: any[];
  salonViewMode: 'list' | 'map';
  setSalonViewMode: (mode: 'list' | 'map') => void;
  cnFallback: (...classes: (string | undefined | null | false)[]) => string;
}

const SalonFinderView: React.FC<SalonFinderViewProps> = ({
  t,
  defaultSalons,
  defaultStylists,
  setActiveView,
  setSelectedSalon,
  setSelectedSalonForDetails,
  setSelectedAppointmentStylist,
  setSelectedAppointmentStyle,
  selectedStyle,
  defaultHairstyles,
  salonViewMode,
  setSalonViewMode,
  cnFallback,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t('view.salons')}</h2>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSalonViewMode('list')}
            className={cnFallback(
              'px-3 py-1 rounded-md text-sm font-medium transition-colors',
              salonViewMode === 'list' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600'
            )}
          >
            {t('listView') || 'List View'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSalonViewMode('map')}
            className={cnFallback(
              'px-3 py-1 rounded-md text-sm font-medium transition-colors',
              salonViewMode === 'map' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600'
            )}
          >
            {t('mapView') || 'Map View'}
          </motion.button>
        </div>
      </div>
      {/* Map View */}
      {salonViewMode === 'map' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-200 rounded-xl h-64 flex items-center justify-center relative overflow-hidden"
        >
          {/* Simulated Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100"></div>
          <div className="relative z-10 text-center space-y-2">
            <MapPin className="w-8 h-8 text-purple-600 mx-auto" />
            <p className="text-gray-600 font-medium">Interactive Map View</p>
            <p className="text-sm text-gray-500">Showing {defaultSalons.length} salons nearby</p>
          </div>
          {/* Simulated Map Pins */}
          <div className="absolute top-16 left-12 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
            1
          </div>
          <div className="absolute top-24 right-16 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce" style={{ animationDelay: '0.2s' }}>
            2
          </div>
          <div className="absolute bottom-20 left-20 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce" style={{ animationDelay: '0.4s' }}>
            3
          </div>
          <div className="absolute bottom-16 right-12 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce" style={{ animationDelay: '0.6s' }}>
            4
          </div>
        </motion.div>
      )}
      {/* Salon List */}
      <div className="space-y-4">
        {defaultSalons.map((salon: any, index: number) => (
          <SalonCard
            key={salon.id}
            salon={salon}
            onViewServices={() => {
              setSelectedSalonForDetails(salon);
              setActiveView('salonDetails');
            }}
            onBook={() => {
              setSelectedSalon(salon);
              setSelectedAppointmentStylist(defaultStylists[0]);
              setSelectedAppointmentStyle(selectedStyle || defaultHairstyles[0]);
              setActiveView('bookAppointment');
            }}
            cnFallback={cnFallback}
            t={t}
          />
        ))}
      </div>
      {/* Quick Filters */}
      <div className="space-y-3">
        <h3 className="font-semibold">{t('quickFilters') || 'Quick Filters'}</h3>
        <div className="flex flex-wrap gap-2">
          {['Nearby', 'Highly Rated', 'Open Now', 'Budget Friendly', 'Luxury'].map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-sm bg-purple-100 text-purple-700 px-3 py-2 rounded-full font-medium"
              onClick={() => setActiveView('salons')}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SalonFinderView; 