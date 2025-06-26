import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar } from 'lucide-react';

interface ProfileViewProps {
  t: (key: string) => string;
  favoriteStyles: any[];
  setActiveView: (view: 'home' | 'ar' | 'gallery' | 'booking' | 'profile' | 'chat' | 'evaluation' | 'bookAppointment' | 'payment' | 'favorites' | 'salons' | 'paymentDetails' | 'history' | 'salonDetails' | 'styleDetails' | 'settings' | 'bookingHistory') => void;
  cnFallback: (...classes: (string | undefined | null | false)[]) => string;
}

const ProfileView: React.FC<ProfileViewProps> = ({ t, favoriteStyles, setActiveView, cnFallback }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Profile Header */}
      <div className="text-center space-y-4">
        <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold">
          A
        </div>
        <div>
          <h2 className="text-2xl font-bold">Alex Johnson</h2>
          <p className="text-gray-600">Hair enthusiast since 2023</p>
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-purple-50 rounded-xl">
          <div className="text-2xl font-bold text-purple-600">12</div>
          <div className="text-sm text-gray-600">Styles Tried</div>
        </div>
        <div className="text-center p-4 bg-pink-50 rounded-xl">
          <div className="text-2xl font-bold text-pink-600">5</div>
          <div className="text-sm text-gray-600">Salon Visits</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-xl">
          <div className="text-2xl font-bold text-blue-600">{favoriteStyles.length}</div>
          <div className="text-sm text-gray-600">Saved Looks</div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveView('favorites')}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl shadow-lg"
        >
          <Heart className="w-6 h-6 mx-auto mb-2" />
          <h3 className="font-semibold">Favorites</h3>
          <p className="text-sm opacity-90">{favoriteStyles.length} saved styles</p>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveView('bookingHistory')}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-xl shadow-lg"
        >
          <Calendar className="w-6 h-6 mx-auto mb-2" />
          <h3 className="font-semibold">Bookings</h3>
          <p className="text-sm opacity-90">Your appointments</p>
        </motion.button>
      </div>
      {/* Recent Activity */}
      <div className="space-y-4">
        <h3 className="font-semibold">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: "Tried AR with Curtain Bangs", time: "2 hours ago", icon: Heart },
            { action: "Saved Beach Waves style", time: "1 day ago", icon: Heart },
            { action: "Booked appointment with Sarah", time: "3 days ago", icon: Calendar },
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
            >
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <activity.icon className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Settings Button */}
      <div className="pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveView('settings')}
          className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium flex items-center justify-center gap-2"
        >
          <span className="text-lg">⚙️</span>
          Settings
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProfileView; 