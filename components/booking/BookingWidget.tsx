'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Users, ChevronRight, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function BookingWidget() {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('2');

  const handleNext = () => setStep(2);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  if (step === 3) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-black/5 text-center animate-card-enter">
        <div className="w-16 h-16 bg-[#d3fbd8] rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={32} className="text-[#74bd58]" />
        </div>
        <h3 className="text-2xl mb-2 text-[#2f3e36]">Booking Request Sent!</h3>
        <p className="text-gray-600 mb-6">
          Your request for {date} at {time} for {guests} guests has been received. Our team will contact you shortly to confirm and collect the advance payment.
        </p>
        <Button onClick={() => setStep(1)} variant="outline">Book Another Slot</Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-black/5 animate-card-enter">
      <h3 className="text-2xl text-[#2f3e36] mb-6 font-heading">Book a Screening Room</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="space-y-4 animate-card-enter">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="date" 
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b76e79] focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <select 
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b76e79] appearance-none"
                  >
                    <option value="">Select...</option>
                    <option value="10:00 AM">10:00 AM - 1:00 PM</option>
                    <option value="2:00 PM">2:00 PM - 5:00 PM</option>
                    <option value="6:00 PM">6:00 PM - 9:00 PM</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <select 
                    required
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b76e79] appearance-none"
                  >
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <Button 
              type="button" 
              onClick={handleNext}
              disabled={!date || !time || !guests}
              className="w-full mt-6 bg-[#b76e79] hover:bg-[#a65d68] text-white flex justify-center gap-2"
            >
              Next Step <ChevronRight size={18} />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-card-enter">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm space-y-2 mb-6 text-gray-600">
              <p><strong className="text-[#2f3e36]">Date:</strong> {date}</p>
              <p><strong className="text-[#2f3e36]">Time:</strong> {time}</p>
              <p><strong className="text-[#2f3e36]">Guests:</strong> {guests}</p>
              <p className="text-[#b76e79] font-medium pt-2">Total Amount: ₹{guests === '2' ? '1,500' : `${parseInt(guests) * 500}`}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <input type="text" required placeholder="John Doe" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b76e79]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input type="tel" required placeholder="+91 98765 43210" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b76e79]" />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" onClick={() => setStep(1)} variant="outline" className="flex-1">Back</Button>
              <Button type="submit" className="flex-[2] bg-[#b76e79] hover:bg-[#a65d68] text-white">
                Request Booking
              </Button>
            </div>
            <p className="text-xs text-center text-gray-400 mt-4">
              * This is a demo form. No actual booking will be made.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
