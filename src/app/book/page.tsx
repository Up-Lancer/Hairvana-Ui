'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Scissors, Palette, Sparkles, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  icon: React.ReactNode;
  category: 'cut' | 'color' | 'treatment';
}

interface Stylist {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  image: string;
  experience: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const services: Service[] = [
  {
    id: '1',
    name: 'Signature Cut & Style',
    description: 'Professional haircut with personalized styling',
    duration: '45 min',
    price: 85,
    icon: <Scissors className="w-5 h-5" />,
    category: 'cut'
  },
  {
    id: '2',
    name: 'Color Transformation',
    description: 'Full color service with consultation',
    duration: '2-3 hours',
    price: 150,
    icon: <Palette className="w-5 h-5" />,
    category: 'color'
  },
  {
    id: '3',
    name: 'Highlights & Lowlights',
    description: 'Dimensional color with foil technique',
    duration: '2 hours',
    price: 120,
    icon: <Sparkles className="w-5 h-5" />,
    category: 'color'
  },
  {
    id: '4',
    name: 'Deep Conditioning Treatment',
    description: 'Intensive moisture and repair treatment',
    duration: '30 min',
    price: 45,
    icon: <Sparkles className="w-5 h-5" />,
    category: 'treatment'
  }
];

const stylists: Stylist[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    specialty: 'Color Specialist',
    rating: 4.9,
    image: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=400',
    experience: '8 years'
  },
  {
    id: '2',
    name: 'Maria Garcia',
    specialty: 'Cut & Style Expert',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    experience: '6 years'
  },
  {
    id: '3',
    name: 'Emma Wilson',
    specialty: 'Texture Specialist',
    rating: 4.9,
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    experience: '10 years'
  }
];

const timeSlots: TimeSlot[] = [
  { time: '9:00 AM', available: true },
  { time: '9:30 AM', available: false },
  { time: '10:00 AM', available: true },
  { time: '10:30 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '11:30 AM', available: true },
  { time: '12:00 PM', available: true },
  { time: '12:30 PM', available: true },
  { time: '1:00 PM', available: false },
  { time: '1:30 PM', available: true },
  { time: '2:00 PM', available: true },
  { time: '2:30 PM', available: true },
  { time: '3:00 PM', available: true },
  { time: '3:30 PM', available: false },
  { time: '4:00 PM', available: true },
  { time: '4:30 PM', available: true }
];

export default function BookingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedStylist, setSelectedStylist] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const steps = ['Services', 'Stylist', 'Date & Time', 'Details'];

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const getTotalPrice = () => {
    return services
      .filter(service => selectedServices.includes(service.id))
      .reduce((total, service) => total + service.price, 0);
  };

  const getTotalDuration = () => {
    const selectedServicesList = services.filter(service => selectedServices.includes(service.id));
    if (selectedServicesList.length === 0) return '0 min';
    
    // Simple duration calculation - in reality you'd want more sophisticated logic
    const totalMinutes = selectedServicesList.reduce((total, service) => {
      const duration = service.duration;
      if (duration.includes('hour')) {
        const hours = parseFloat(duration.match(/(\d+(?:\.\d+)?)/)?.[0] || '0');
        return total + (hours * 60);
      } else {
        const minutes = parseInt(duration.match(/(\d+)/)?.[0] || '0');
        return total + minutes;
      }
    }, 0);

    if (totalMinutes >= 60) {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return minutes > 0 ? `${hours}h ${minutes}min` : `${hours}h`;
    }
    return `${totalMinutes}min`;
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 0: return selectedServices.length > 0;
      case 1: return selectedStylist !== '';
      case 2: return selectedDate !== '' && selectedTime !== '';
      case 3: return customerInfo.name && customerInfo.email && customerInfo.phone;
      default: return true;
    }
  };

  const handleBooking = () => {
    // Store booking data in localStorage for the rating page
    const bookingData = {
      services: selectedServices.map(id => services.find(s => s.id === id)),
      stylist: stylists.find(s => s.id === selectedStylist),
      date: selectedDate,
      time: selectedTime,
      customer: customerInfo,
      totalPrice: getTotalPrice(),
      totalDuration: getTotalDuration()
    };
    
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    
    // Navigate to rating page
    router.push('/rating');
  };

  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        })
      });
    }
    return dates;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                Book Your Appointment
              </h1>
              <p className="text-gray-600 text-sm mt-1">Step {currentStep + 1} of {steps.length}</p>
            </div>
            <div className="flex items-center space-x-2">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300",
                    index <= currentStep
                      ? "bg-gradient-to-r from-rose-500 to-purple-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  )}
                >
                  {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* Step 0: Services */}
          {currentStep === 0 && (
            <motion.div
              key="services"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Services</h2>
                <p className="text-gray-600">Select the services you'd like to book</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300",
                      selectedServices.includes(service.id)
                        ? "border-rose-300 bg-gradient-to-br from-rose-50 to-purple-50 shadow-lg"
                        : "border-gray-200 bg-white hover:border-rose-200 hover:shadow-md"
                    )}
                    onClick={() => toggleService(service.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={cn(
                        "p-3 rounded-xl",
                        selectedServices.includes(service.id)
                          ? "bg-gradient-to-r from-rose-500 to-purple-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      )}>
                        {service.icon}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">${service.price}</div>
                        <div className="text-sm text-gray-500">{service.duration}</div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </motion.div>
                ))}
              </div>

              {selectedServices.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 border border-rose-200 shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Services</h3>
                  <div className="space-y-2 mb-4">
                    {services
                      .filter(service => selectedServices.includes(service.id))
                      .map(service => (
                        <div key={service.id} className="flex justify-between items-center">
                          <span className="text-gray-700">{service.name}</span>
                          <span className="font-medium">${service.price}</span>
                        </div>
                      ))}
                  </div>
                  <div className="border-t pt-4 flex justify-between items-center">
                    <div>
                      <div className="text-lg font-bold text-gray-900">Total: ${getTotalPrice()}</div>
                      <div className="text-sm text-gray-500">Duration: {getTotalDuration()}</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 1: Stylist */}
          {currentStep === 1 && (
            <motion.div
              key="stylist"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Stylist</h2>
                <p className="text-gray-600">Select your preferred hair professional</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {stylists.map((stylist) => (
                  <motion.div
                    key={stylist.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 text-center",
                      selectedStylist === stylist.id
                        ? "border-rose-300 bg-gradient-to-br from-rose-50 to-purple-50 shadow-lg"
                        : "border-gray-200 bg-white hover:border-rose-200 hover:shadow-md"
                    )}
                    onClick={() => setSelectedStylist(stylist.id)}
                  >
                    <div className="relative mb-4">
                      <img
                        src={stylist.image}
                        alt={stylist.name}
                        className="w-20 h-20 rounded-full mx-auto object-cover"
                      />
                      {selectedStylist === stylist.id && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{stylist.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{stylist.specialty}</p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <span>⭐ {stylist.rating}</span>
                      <span>•</span>
                      <span>{stylist.experience}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Date & Time */}
          {currentStep === 2 && (
            <motion.div
              key="datetime"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Date & Time</h2>
                <p className="text-gray-600">Choose your preferred appointment slot</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Date Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Select Date
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {generateDateOptions().map((date) => (
                      <motion.button
                        key={date.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "p-3 rounded-xl border-2 text-sm font-medium transition-all duration-300",
                          selectedDate === date.value
                            ? "border-rose-300 bg-gradient-to-r from-rose-500 to-purple-500 text-white"
                            : "border-gray-200 bg-white hover:border-rose-200 text-gray-700"
                        )}
                        onClick={() => setSelectedDate(date.value)}
                      >
                        {date.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Select Time
                  </h3>
                  <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                    {timeSlots.map((slot) => (
                      <motion.button
                        key={slot.time}
                        whileHover={slot.available ? { scale: 1.02 } : {}}
                        whileTap={slot.available ? { scale: 0.98 } : {}}
                        disabled={!slot.available}
                        className={cn(
                          "p-3 rounded-xl border-2 text-sm font-medium transition-all duration-300",
                          !slot.available
                            ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                            : selectedTime === slot.time
                            ? "border-rose-300 bg-gradient-to-r from-rose-500 to-purple-500 text-white"
                            : "border-gray-200 bg-white hover:border-rose-200 text-gray-700"
                        )}
                        onClick={() => slot.available && setSelectedTime(slot.time)}
                      >
                        {slot.time}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Customer Details */}
          {currentStep === 3 && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Details</h2>
                <p className="text-gray-600">Please provide your contact information</p>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl p-8 border border-rose-200 shadow-lg">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-300 focus:ring-2 focus:ring-rose-200 transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-300 focus:ring-2 focus:ring-rose-200 transition-all duration-300"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-300 focus:ring-2 focus:ring-rose-200 transition-all duration-300"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Notes (Optional)
                      </label>
                      <textarea
                        value={customerInfo.notes}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-300 focus:ring-2 focus:ring-rose-200 transition-all duration-300 resize-none"
                        placeholder="Any special requests or notes for your stylist..."
                      />
                    </div>
                  </div>
                </div>

                {/* Booking Summary */}
                <div className="bg-white rounded-2xl p-6 border border-rose-200 shadow-lg mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Services:</span>
                      <div className="text-right">
                        {services
                          .filter(service => selectedServices.includes(service.id))
                          .map(service => (
                            <div key={service.id} className="text-gray-900">{service.name}</div>
                          ))}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stylist:</span>
                      <span className="text-gray-900">{stylists.find(s => s.id === selectedStylist)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date & Time:</span>
                      <span className="text-gray-900">
                        {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })} at {selectedTime}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                      <span className="font-semibold text-gray-900">Total:</span>
                      <span className="font-bold text-xl text-gray-900">${getTotalPrice()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300",
              currentStep === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            )}
            onClick={() => currentStep > 0 && setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "flex items-center px-8 py-3 rounded-xl font-medium transition-all duration-300",
              canProceedToNext()
                ? "bg-gradient-to-r from-rose-500 to-purple-500 text-white hover:shadow-lg"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
            onClick={() => {
              if (currentStep === 3) {
                handleBooking();
              } else if (canProceedToNext()) {
                setCurrentStep(prev => prev + 1);
              }
            }}
            disabled={!canProceedToNext()}
          >
            {currentStep === 3 ? 'Confirm Booking' : 'Next'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}