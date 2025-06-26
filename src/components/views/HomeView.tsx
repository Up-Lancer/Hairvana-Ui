import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Camera, MessageCircle, ArrowRight, Star, BookOpen } from 'lucide-react';
import HairstyleCard from '../cards/HairstyleCard';

interface HomeViewProps {
  t: (key: string) => string;
  defaultHairstyles: any[];
  styleSuggestions: any[];
  setActiveView: (view: 'home' | 'ar' | 'gallery' | 'booking' | 'profile' | 'chat' | 'evaluation' | 'bookAppointment' | 'payment' | 'favorites' | 'salons' | 'paymentDetails' | 'history' | 'salonDetails' | 'styleDetails' | 'settings' | 'bookingHistory') => void;
  setSelectedStyle: (style: any) => void;
  cnFallback: (...classes: (string | undefined | null | false)[]) => string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
};

const HomeView: React.FC<HomeViewProps> = ({
  t,
  defaultHairstyles,
  styleSuggestions,
  setActiveView,
  setSelectedStyle,
  cnFallback,
}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants} className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-8 h-8 text-purple-500" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            {t('appName')}
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          {t('personalStyleCompanion')}
        </p>
      </motion.div>
      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveView('ar')}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-lg"
        >
          <Camera className="w-8 h-8 mx-auto mb-2" />
          <h3 className="font-semibold">{t('nav.ar')}</h3>
          <p className="text-sm opacity-90">{t('seeStylesOnYou')}</p>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveView('chat')}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-2xl shadow-lg"
        >
          <MessageCircle className="w-8 h-8 mx-auto mb-2" />
          <h3 className="font-semibold">{t('nav.coach')}</h3>
          <p className="text-sm opacity-90">{t('getPersonalizedAdvice')}</p>
        </motion.button>
      </motion.div>
      {/* AI Suggestions */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <h2 className="text-xl font-semibold">{t('aiSuggestionsForYou')}</h2>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {styleSuggestions.slice(0, 2).map((suggestion, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100 cursor-pointer"
              onClick={() => setActiveView('chat')}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                  {suggestion.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{suggestion.label}</h3>
                  <p className="text-sm text-gray-600">{suggestion.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-purple-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* Trending Styles */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{t('trendingStyles')}</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveView('gallery')}
            className="text-purple-600 text-sm font-medium"
          >
            {t('viewAll')}
          </motion.button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {defaultHairstyles.slice(0, 2).map((style) => (
            <HairstyleCard
              key={style.id}
              style={style}
              onClick={() => setSelectedStyle(style)}
              t={t}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HomeView; 