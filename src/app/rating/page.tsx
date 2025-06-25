'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, ThumbsUp, MessageCircle, CheckCircle, ArrowLeft, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface BookingData {
  services: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  stylist: {
    name: string;
    specialty: string;
  };
  date: string;
  time: string;
  customer: {
    name: string;
    email: string;
  };
  totalPrice: number;
  totalDuration: string;
}

interface RatingCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  rating: number;
}

export default function RatingPage() {
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [overallRating, setOverallRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [categories, setCategories] = useState<RatingCategory[]>([
    { id: 'service', name: 'Service Quality', icon: <Star className="w-5 h-5" />, rating: 0 },
    { id: 'stylist', name: 'Stylist Performance', icon: <Heart className="w-5 h-5" />, rating: 0 },
    { id: 'atmosphere', name: 'Salon Atmosphere', icon: <ThumbsUp className="w-5 h-5" />, rating: 0 },
    { id: 'value', name: 'Value for Money', icon: <MessageCircle className="w-5 h-5" />, rating: 0 }
  ]);
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);

  useEffect(() => {
    // Get booking data from localStorage
    const storedBookingData = localStorage.getItem('bookingData');
    if (storedBookingData) {
      setBookingData(JSON.parse(storedBookingData));
    }
  }, []);

  const updateCategoryRating = (categoryId: string, rating: number) => {
    setCategories(prev => 
      prev.map(cat => 
        cat.id === categoryId ? { ...cat, rating } : cat
      )
    );
  };

  const handleSubmitRating = () => {
    const ratingData = {
      booking: bookingData,
      overallRating,
      categoryRatings: categories,
      feedback,
      wouldRecommend,
      submittedAt: new Date().toISOString()
    };

    // Here you would typically send this data to your backend
    console.log('Rating submitted:', ratingData);
    
    // Clear booking data from localStorage
    localStorage.removeItem('bookingData');
    
    setIsSubmitted(true);
  };

  const canSubmit = overallRating > 0 && categories.every(cat => cat.rating > 0) && wouldRecommend !== null;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center space-y-6 p-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank You!</h1>
            <p className="text-gray-600">Your feedback has been submitted successfully</p>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              We appreciate your time and feedback. It helps us improve our services.
            </p>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-rose-500 to-purple-500 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 inline-flex items-center"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-rose-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                Rate Your Experience
              </h1>
              <p className="text-gray-600 text-sm mt-1">Help us improve our services</p>
            </div>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Booking Confirmation */}
        {bookingData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 border border-rose-200 shadow-lg mb-8"
          >
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Booking Confirmed!</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Services Booked:</h3>
                <ul className="space-y-1">
                  {bookingData.services.map((service, index) => (
                    <li key={index} className="text-gray-600">• {service.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Appointment Details:</h3>
                <div className="space-y-1 text-gray-600">
                  <p>Stylist: {bookingData.stylist.name}</p>
                  <p>Date: {new Date(bookingData.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                  <p>Time: {bookingData.time}</p>
                  <p className="font-medium text-gray-900">Total: ${bookingData.totalPrice}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8 border border-rose-200 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Overall Experience</h2>
            
            <div className="text-center mb-8">
              <div className="flex justify-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={cn(
                      "w-12 h-12 rounded-full transition-all duration-300",
                      (hoverRating || overallRating) >= star
                        ? "text-yellow-400"
                        : "text-gray-300"
                    )}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setOverallRating(star)}
                  >
                    <Star className="w-full h-full fill-current" />
                  </motion.button>
                ))}
              </div>
              
              <div className="text-lg font-medium text-gray-700">
                {overallRating === 0 && 'Rate your overall experience'}
                {overallRating === 1 && 'Poor'}
                {overallRating === 2 && 'Fair'}
                {overallRating === 3 && 'Good'}
                {overallRating === 4 && 'Very Good'}
                {overallRating === 5 && 'Excellent'}
              </div>
            </div>

            {/* Recommendation */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Would you recommend us to friends?
              </h3>
              <div className="flex justify-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "px-6 py-3 rounded-xl font-medium transition-all duration-300",
                    wouldRecommend === true
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                      : "border-2 border-gray-300 text-gray-700 hover:border-green-300"
                  )}
                  onClick={() => setWouldRecommend(true)}
                >
                  Yes, Definitely!
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "px-6 py-3 rounded-xl font-medium transition-all duration-300",
                    wouldRecommend === false
                      ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                      : "border-2 border-gray-300 text-gray-700 hover:border-red-300"
                  )}
                  onClick={() => setWouldRecommend(false)}
                >
                  Not Really
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Category Ratings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 border border-rose-200 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Rate Each Aspect</h2>
            
            <div className="space-y-6">
              {categories.map((category) => (
                <div key={category.id} className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-rose-500 to-purple-500 rounded-lg text-white">
                      {category.icon}
                    </div>
                    <span className="font-medium text-gray-900">{category.name}</span>
                  </div>
                  
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={cn(
                          "w-8 h-8 transition-all duration-300",
                          category.rating >= star
                            ? "text-yellow-400"
                            : "text-gray-300 hover:text-yellow-300"
                        )}
                        onClick={() => updateCategoryRating(category.id, star)}
                      >
                        <Star className="w-full h-full fill-current" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Feedback Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-8 border border-rose-200 shadow-lg mt-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Feedback</h2>
          
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-300 focus:ring-2 focus:ring-rose-200 transition-all duration-300 resize-none"
            placeholder="Tell us more about your experience... What did you love? What could we improve?"
          />
          
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-500">
              Your feedback helps us provide better service to all our clients
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "px-8 py-3 rounded-xl font-medium transition-all duration-300",
                canSubmit
                  ? "bg-gradient-to-r from-rose-500 to-purple-500 text-white hover:shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
              onClick={handleSubmitRating}
              disabled={!canSubmit}
            >
              Submit Rating
            </motion.button>
          </div>
        </motion.div>

        {/* Progress Indicator */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
            <div className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              overallRating > 0 ? "bg-green-500" : "bg-gray-300"
            )} />
            <span>Overall Rating</span>
            
            <div className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              categories.every(cat => cat.rating > 0) ? "bg-green-500" : "bg-gray-300"
            )} />
            <span>Category Ratings</span>
            
            <div className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              wouldRecommend !== null ? "bg-green-500" : "bg-gray-300"
            )} />
            <span>Recommendation</span>
          </div>
        </div>
      </div>
    </div>
  );
}