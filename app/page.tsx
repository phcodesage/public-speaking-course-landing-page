"use client";

import { useState, useRef } from 'react';
import { Calendar, Clock, DollarSign, Award, TrendingUp, Crown, MapPin, Video, Zap, Phone, Mail, Send, Loader2, CheckCircle2, Globe } from 'lucide-react';
import PageTracker from './PageTracker';
import Announcement from './Announcement';
import InquiryForm from './InquiryForm';
import RegistrationModal from './RegistrationModal';

interface CrashCourse {
  dates: string;
  time: string;
  price: string;
  stripeLink: string;
  showDate: boolean;
}

interface CourseLevel {
  title: string;
  level: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  price: string;
  stripeLink: string;
  showDate: boolean;
  schedule?: string;
  dates?: string;
  time?: string;
  crashCourse: CrashCourse;
}

export default function Home() {
  const [selectedImage] = useState<string>('/images/public-speaking.jpg');
  const formRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState("level-1-regular");
  const [inquiryCourse, setInquiryCourse] = useState("General Inquiry");
  const [activeTab, setActiveTab] = useState<'crash' | 'regular' | 'summer'>('crash');

  const scrollToInquiry = (courseName?: string) => {
    if (courseName) {
      setInquiryCourse(courseName);
    }
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCourseOptions = () => {
    document.getElementById('course-options')?.scrollIntoView({ behavior: 'smooth' });
  };

  const courseLevels: CourseLevel[] = [
    {
      title: 'Level 1',
      level: 'Public Speaking',
      icon: <Award className="w-8 h-8 text-white" />,
      description: 'Finding Your Voice — overcoming anxiety, body language, and the basics of confident delivery.',
      color: '#0e1f3e',
      price: '$439',
      stripeLink: 'https://buy.stripe.com/7sY5kwcWw9se6FXfF1dfG04',
      showDate: true,
      dates: 'October 4th, 2026',
      crashCourse: {
        dates: 'September 6, 2026',
        time: '10:00 AM – 12:00 PM',
        price: '$139',
        stripeLink: 'https://buy.stripe.com/7sY8wI4q0gUGaWd2SfdfG0i',
        showDate: true,
      }
    },
    {
      title: 'Level 2',
      level: 'Public Speaking',
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      description: 'Mastering the Message — structuring impactful speeches and connecting deeply with any audience.',
      color: '#ca3433',
      price: '$439',
      stripeLink: 'https://buy.stripe.com/7sY5kwcWw9se6FXfF1dfG04',
      showDate: true,
      dates: 'November 1st, 2026',
      crashCourse: {
        dates: 'September 6, 2026',
        time: '12:00 PM – 2:00 PM',
        price: '$139',
        stripeLink: 'https://buy.stripe.com/7sY8wI4q0gUGaWd2SfdfG0i',
        showDate: true,
      }
    },
    {
      title: 'Level 3',
      level: 'Public Speaking',
      icon: <Crown className="w-8 h-8 text-white" />,
      description: 'The Persuasive Leader — advanced storytelling, debate skills, and inspiring action through words.',
      color: '#0e1f3e',
      price: '$439',
      stripeLink: 'https://buy.stripe.com/7sY5kwcWw9se6FXfF1dfG04',
      showDate: true,
      dates: 'December 6th, 2026',
      crashCourse: {
        dates: 'September 6, 2026',
        time: '2:00 PM – 4:00 PM',
        price: '$139',
        stripeLink: 'https://buy.stripe.com/7sY8wI4q0gUGaWd2SfdfG0i',
        showDate: true,
      }
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageTracker />
      {/* Top Enroll Bar — always the first element on the page */}
      <div className="w-full py-3 px-4" style={{ backgroundColor: '#0e1f3e' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-between gap-3">
          <p className="hidden sm:block text-white/90 text-sm font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Find Your Voice: Public Speaking Course
          </p>
          <button
            onClick={scrollToCourseOptions}
            className="px-6 py-2.5 rounded-full font-bold text-sm text-white text-center transition-transform duration-300 hover:scale-105 shadow-sm appearance-none border-none cursor-pointer"
            style={{ backgroundColor: '#ca3433', fontFamily: 'Montserrat, sans-serif' }}
          >
            Enroll Now
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Centered Logo */}
        <header className="pt-8 pb-6">
          <div className="flex flex-col items-center justify-center">
            <img
              src="/images/exceed-logo.png"
              alt="Exceed Learning Center"
              className="h-32 w-auto mb-4"
            />
            <h1 className="text-3xl font-bold text-center" style={{ color: '#0e1f3e', fontFamily: 'Montserrat, sans-serif' }}>
              Public Speaking Excellence
            </h1>
            <p className="text-center text-sm tracking-wider mt-2" style={{ color: '#ca3433' }}>
              Education Opens Up The Mind
            </p>
          </div>
        </header>

        <main className="py-6">
          {/* Class Format Note */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-red-50 border border-gray-200">
              <MapPin className="w-5 h-5" style={{ color: '#ca3433' }} />
              <span className="text-base font-medium" style={{ color: '#0e1f3e' }}>
                All classes are <strong>in person</strong>, but a <strong>virtual option</strong> is available
              </span>
              <Video className="w-5 h-5" style={{ color: '#0e1f3e' }} />
            </div>
          </div>

          <Announcement />

          {/* Hero Section */}
          <div className="rounded-3xl shadow-2xl overflow-hidden mb-12" style={{ backgroundColor: '#fbeceb' }}>
            <div className="lg:grid lg:grid-cols-2 lg:gap-0">
              {/* Left Column */}
              <div className="p-8 lg:p-12 relative flex flex-col justify-center" style={{ backgroundColor: '#0e1f3e' }}>
                <h2 className="text-[2.75rem] lg:text-[3.25rem] font-extrabold text-white leading-[1.1] mb-6 tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Find Your Voice:<br/>Public Speaking<br/>Course
                </h2>
                <div className="w-16 h-1 mb-10" style={{ backgroundColor: '#ca3433' }}></div>
                
                <div className="space-y-6">
                  <p className="text-base lg:text-lg text-white/95 leading-relaxed">
                    Gain the confidence and practical skills to deliver engaging and impactful presentations.
                  </p>
                  <p className="text-base lg:text-lg text-white/95 leading-relaxed">
                    Learn to manage nerves, structure your message, and effectively{' '}
                    <span className="font-bold text-white">
                      Ignite Your Brilliance
                    </span>{' '}
                    every time you step up to speak.
                  </p>
                  <p className="text-white font-bold text-base lg:text-lg pt-2 tracking-wide">
                    Choose your level below <span className="font-normal">— from foundational skills to mastery!</span>
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="p-8 lg:p-10 flex flex-col justify-between gap-6">
                <div>
                  <img
                    src={selectedImage}
                    alt="Public Speaking"
                    className="w-full h-auto rounded-xl shadow-md object-cover"
                    style={{ maxHeight: '420px', objectPosition: 'center 20%' }}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  {/* Dynamic Pricing / Info based on activeTab */}
                  {activeTab === 'crash' && (
                    <>
                      {/* Investment */}
                      <div className="flex items-center gap-4 px-2 animate-in fade-in duration-300">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-sm bg-red-600">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-[17px] leading-tight mb-1" style={{ color: '#0e1f3e', fontFamily: 'Montserrat, sans-serif' }}>
                            Investment Per Level (Crash Course)
                          </h4>
                          <p className="text-2xl font-bold leading-none mb-1 text-red-600">
                            $139
                          </p>
                          <p className="text-[13px] text-gray-500 leading-none">Per course level</p>
                        </div>
                      </div>

                      {/* Bundle Offer */}
                      <div className="p-5 rounded-xl border-[1.5px] border-dashed border-red-600/70 flex flex-col gap-4 relative animate-in fade-in duration-300" style={{ backgroundColor: 'rgba(239, 68, 68, 0.04)' }}>
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm bg-[#ffd700]">
                            <Crown className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex flex-col">
                            <h4 className="font-extrabold text-[#0e1f3e] text-sm sm:text-base leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                              🎉 SIGNUP ALL 3 FOR $499!
                            </h4>
                            <p className="text-[13px] text-gray-500 leading-tight mt-1">Enroll in all 3 crash course levels</p>
                          </div>
                        </div>
                        <button
                          onClick={() => { setSelectedSchedule("crash-bundle"); setIsModalOpen(true); }}
                          className="w-full py-3.5 rounded-xl font-bold text-white text-center text-[17px] transition-transform duration-300 hover:scale-[1.02] shadow-sm appearance-none border-none cursor-pointer bg-red-600"
                          style={{ fontFamily: 'Montserrat, sans-serif' }}
                        >
                          Select All 3 Levels - $499
                        </button>
                      </div>
                    </>
                  )}

                  {activeTab === 'regular' && (
                    <>
                      {/* Investment */}
                      <div className="flex items-center gap-4 px-2 animate-in fade-in duration-300">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-sm bg-[#0e1f3e]">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-[17px] leading-tight mb-1" style={{ color: '#0e1f3e', fontFamily: 'Montserrat, sans-serif' }}>
                            Investment Per Level (Full Course)
                          </h4>
                          <p className="text-2xl font-bold leading-none mb-1 text-red-600">
                            $439
                          </p>
                          <p className="text-[13px] text-gray-500 leading-none">Per course level</p>
                        </div>
                      </div>

                      {/* Bundle Offer */}
                      <div className="p-5 rounded-xl border-[1.5px] border-dashed border-[#ca3433]/70 flex flex-col gap-4 relative animate-in fade-in duration-300" style={{ backgroundColor: 'rgba(202, 52, 51, 0.04)' }}>
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm bg-[#ffd700]">
                            <Crown className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex flex-col">
                            <h4 className="font-extrabold text-[#0e1f3e] text-sm sm:text-base leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                              🎉 SIGNUP ALL 3 FOR $1,200!
                            </h4>
                            <p className="text-[13px] text-gray-500 leading-tight mt-1">Save $117 when you enroll in all levels</p>
                          </div>
                        </div>
                        <button
                          onClick={() => { setSelectedSchedule("bundle"); setIsModalOpen(true); }}
                          className="w-full py-3.5 rounded-xl font-bold text-white text-center text-[17px] transition-transform duration-300 hover:scale-[1.02] shadow-sm appearance-none border-none cursor-pointer"
                          style={{ backgroundColor: '#ca3433', fontFamily: 'Montserrat, sans-serif' }}
                        >
                          Select All 3 Levels - $1,200
                        </button>
                      </div>
                    </>
                  )}

                  {activeTab === 'summer' && (
                    <>
                      {/* Investment */}
                      <div className="flex items-center gap-4 px-2 animate-in fade-in duration-300">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-sm bg-amber-500">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-[17px] leading-tight mb-1" style={{ color: '#0e1f3e', fontFamily: 'Montserrat, sans-serif' }}>
                            Summer Program (8 Weeks)
                          </h4>
                          <p className="text-2xl font-bold leading-none mb-1 text-amber-500">
                            TBD
                          </p>
                          <p className="text-[13px] text-gray-500 leading-none">Next intake: Summer 2027</p>
                        </div>
                      </div>

                      {/* Waitlist / Inquiry */}
                      <div className="p-5 rounded-xl border-[1.5px] border-dashed border-amber-500/70 flex flex-col gap-4 relative animate-in fade-in duration-300" style={{ backgroundColor: 'rgba(245, 158, 11, 0.04)' }}>
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm bg-amber-500">
                            <Calendar className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex flex-col">
                            <h4 className="font-extrabold text-[#0e1f3e] text-sm sm:text-base leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                              ☀️ SUMMER 2027 WAITLIST
                            </h4>
                            <p className="text-[13px] text-gray-500 leading-tight mt-1">Be the first to get scheduled dates &amp; early bird pricing</p>
                          </div>
                        </div>
                        <button
                          onClick={() => scrollToInquiry("Summer 2027 Course Inquiry")}
                          className="w-full py-3.5 rounded-xl font-bold text-white text-center text-[17px] transition-transform duration-300 hover:scale-[1.02] shadow-sm appearance-none border-none cursor-pointer bg-amber-500 hover:bg-amber-600"
                          style={{ fontFamily: 'Montserrat, sans-serif' }}
                        >
                          Inquire for Summer 2027
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── COURSE FORMAT SELECTOR ── */}
          <div id="course-options" className="mb-12 text-center scroll-mt-24">
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#0e1f3e', fontFamily: 'Montserrat, sans-serif' }}>
              Select Course Option
            </h3>
            <div className="inline-flex p-1.5 rounded-2xl bg-gray-100 border border-gray-200 shadow-sm max-w-full overflow-x-auto">
              <button
                onClick={() => { setActiveTab('crash'); setSelectedSchedule('level-1-crash'); }}
                className={`px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 whitespace-nowrap cursor-pointer border-none ${
                  activeTab === 'crash'
                    ? 'bg-[#ca3433] text-white shadow-md'
                    : 'text-gray-600 hover:text-[#0e1f3e] hover:bg-gray-200/50'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                ⚡ Crash Course
              </button>
              <button
                onClick={() => { setActiveTab('regular'); setSelectedSchedule('level-1-regular'); }}
                className={`px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 whitespace-nowrap cursor-pointer border-none ${
                  activeTab === 'regular'
                    ? 'bg-[#0e1f3e] text-white shadow-md'
                    : 'text-gray-600 hover:text-[#0e1f3e] hover:bg-gray-200/50'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                🎓 Full Course
              </button>
              <button
                onClick={() => setActiveTab('summer')}
                className={`px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 whitespace-nowrap cursor-pointer border-none ${
                  activeTab === 'summer'
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-[#0e1f3e] hover:bg-gray-200/50'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                ☀️ Summer Course
              </button>
            </div>
          </div>

          {/* ── CRASH COURSE Section ── */}
          {activeTab === 'crash' && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px" style={{ backgroundColor: '#ca3433', opacity: 0.3 }}></div>
                  <div className="flex items-center gap-3 px-6 py-3 rounded-full shadow-md" style={{ backgroundColor: '#ca3433' }}>
                    <Zap className="w-5 h-5 text-white" />
                    <h3 className="text-xl font-extrabold text-white tracking-widest uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      CRASH COURSE
                    </h3>
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 h-px" style={{ backgroundColor: '#ca3433', opacity: 0.3 }}></div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-10">
                {courseLevels.map((course, index) => (
                  <div
                    key={`crash-${index}`}
                    className="rounded-2xl shadow-lg overflow-hidden border-2 transition-transform duration-300 hover:scale-105"
                    style={{ borderColor: course.color, backgroundColor: '#fff' }}
                  >
                    {/* Crash Course Header */}
                    <div
                      className="px-5 py-4 flex items-center gap-3"
                      style={{ backgroundColor: course.color + '15' }}
                    >
                      <div
                        className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: course.color }}
                      >
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: course.color }}>
                          {course.title}
                        </p>
                        <h5 className="text-base font-bold" style={{ color: '#0e1f3e', fontFamily: 'Montserrat, sans-serif' }}>
                          CRASH COURSE
                        </h5>
                      </div>
                      <div className="ml-auto">
                        <span
                          className="text-lg font-extrabold"
                          style={{ color: course.color }}
                        >
                          {course.crashCourse.price}
                        </span>
                      </div>
                    </div>

                    {/* Crash Course Body */}
                    <div className="px-5 py-4 space-y-3">
                      {course.crashCourse.showDate ? (
                        <>
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 flex-shrink-0" style={{ color: course.color }} />
                            <div>
                              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Date</p>
                              <p className="font-semibold text-sm" style={{ color: '#0e1f3e' }}>
                                {course.crashCourse.dates}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 flex-shrink-0" style={{ color: course.color }} />
                            <div>
                              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Time</p>
                              <p className="font-semibold text-sm" style={{ color: '#0e1f3e' }}>
                                {course.crashCourse.time}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => { setSelectedSchedule(`level-${index + 1}-crash`); setIsModalOpen(true); }}
                            className="block w-full mt-2 px-4 py-3 rounded-full font-semibold text-white text-center text-sm transition-all duration-300 hover:shadow-md hover:opacity-90 appearance-none border-none cursor-pointer"
                            style={{ backgroundColor: course.color }}
                          >
                            Select Crash Course
                          </button>
                        </>
                      ) : (
                        <div className="py-2 text-center">
                          <p className="text-sm text-gray-500 italic">Date coming soon — stay tuned!</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Crash Course Bundle Offer Card */}
              <div className="max-w-xl mx-auto mb-14">
                <div className="rounded-3xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-xl p-1 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shine z-0"></div>
                  <button
                    onClick={() => { setSelectedSchedule("crash-bundle"); setIsModalOpen(true); }}
                    className="relative z-10 flex flex-col items-center justify-center w-full px-8 py-10 rounded-[22px] font-bold text-white text-center appearance-none border-none cursor-pointer"
                    style={{ backgroundColor: '#0e1f3e', fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <Crown className="w-12 h-12 text-yellow-400 mb-4 drop-shadow-lg mx-auto" />
                    <h3 className="text-2xl md:text-3xl mb-2 leading-tight">
                      Select All 3 Crash Course Levels
                    </h3>
                    <div className="text-4xl text-yellow-400 drop-shadow-md mb-4">
                      $499
                    </div>
                    <div className="inline-block px-6 py-2 rounded-full border border-yellow-400/30 bg-yellow-400/10">
                      <p className="text-sm font-medium text-gray-200 font-sans tracking-wide">
                        Enroll in all 3 crash levels!
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── REGULAR/FULL COURSE Section ── */}
          {activeTab === 'regular' && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px" style={{ backgroundColor: '#0e1f3e', opacity: 0.3 }}></div>
                  <div className="flex items-center gap-3 px-6 py-3 rounded-full shadow-md" style={{ backgroundColor: '#0e1f3e' }}>
                    <Award className="w-5 h-5 text-white" />
                    <h3 className="text-xl font-extrabold text-white tracking-widest uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      PUBLIC SPEAKING CLASSES (FULL COURSE)
                    </h3>
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 h-px" style={{ backgroundColor: '#0e1f3e', opacity: 0.3 }}></div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {courseLevels.map((course, index) => (
                  <div key={`regular-${index}`} className="rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105" style={{ backgroundColor: '#fff' }}>
                    {/* Card Header */}
                    <div
                      className="px-6 py-8 text-center"
                      style={{ backgroundColor: course.color }}
                    >
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-4">
                        {course.icon}
                      </div>
                      <h4 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>{course.title}</h4>
                      <p className="text-white/80 text-base">{course.level}</p>
                    </div>

                    {/* Card Body */}
                    <div className="px-6 py-8">
                      <p className="text-gray-600 mb-6 text-lg">
                        {course.description}
                      </p>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-3">
                          <DollarSign className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: course.color }} />
                          <div>
                            <p className="font-semibold text-base" style={{ color: '#0e1f3e' }}>Investment</p>
                            <p className="font-bold text-xl" style={{ color: '#ca3433' }}>{course.price}</p>
                          </div>
                        </div>

                        {course.showDate && course.dates ? (
                          <>
                            {course.schedule ? (
                              <div className="flex items-start gap-3">
                                <Calendar className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: course.color }} />
                                <div>
                                  <p className="font-semibold text-base" style={{ color: '#0e1f3e' }}>Schedule</p>
                                  <p className="text-sm text-gray-600">{course.schedule}</p>
                                </div>
                              </div>
                            ) : null}

                            <div className="flex items-start gap-3">
                              <Calendar className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: course.color }} />
                              <div>
                                <p className="font-semibold text-base" style={{ color: '#0e1f3e' }}>Dates</p>
                                <p className="text-sm text-gray-600">{course.dates}</p>
                              </div>
                            </div>

                            {course.time ? (
                              <div className="flex items-start gap-3">
                                <Clock className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: course.color }} />
                                <div>
                                  <p className="font-semibold text-base" style={{ color: '#0e1f3e' }}>Time</p>
                                  <p className="text-sm text-gray-600">{course.time}</p>
                                </div>
                              </div>
                            ) : null}
                          </>
                        ) : null}
                      </div>

                      {course.showDate ? (
                        <button
                          onClick={() => { setSelectedSchedule(`level-${index + 1}-regular`); setIsModalOpen(true); }}
                          className="block w-full px-6 py-4 rounded-full font-semibold text-white text-center text-lg transition-all duration-300 hover:shadow-lg hover:opacity-90 appearance-none border-none cursor-pointer"
                          style={{ backgroundColor: course.color }}
                        >
                          Select Level Option
                        </button>
                      ) : (
                        <div
                          className="block w-full px-6 py-4 rounded-full font-semibold text-white text-center text-lg cursor-not-allowed opacity-70"
                          style={{ backgroundColor: course.color }}
                        >
                          Coming Soon
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Regular Bundle Card */}
              <div className="max-w-xl mx-auto mb-14">
                <div className="rounded-3xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-xl p-1 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shine z-0"></div>
                  <button
                    onClick={() => { setSelectedSchedule("bundle"); setIsModalOpen(true); }}
                    className="relative z-10 flex flex-col items-center justify-center w-full px-8 py-10 rounded-[22px] font-bold text-white text-center appearance-none border-none cursor-pointer"
                    style={{ backgroundColor: '#0e1f3e', fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <Crown className="w-12 h-12 text-yellow-400 mb-4 drop-shadow-lg mx-auto" />
                    <h3 className="text-2xl md:text-3xl mb-2 leading-tight">
                      Enroll in All 3 Full Course Levels
                    </h3>
                    <div className="text-4xl text-yellow-400 drop-shadow-md mb-4">
                      $1,200
                    </div>
                    <div className="inline-block px-6 py-2 rounded-full border border-yellow-400/30 bg-yellow-400/10">
                      <p className="text-sm font-medium text-gray-200 font-sans tracking-wide">
                        Save $117 when you enroll in all 3 levels
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── SUMMER COURSE Section ── */}
          {activeTab === 'summer' && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px" style={{ backgroundColor: '#0e1f3e', opacity: 0.3 }}></div>
                  <div className="flex items-center gap-3 px-6 py-3 rounded-full shadow-md bg-gradient-to-r from-[#0e1f3e] to-[#1e345e]">
                    <Calendar className="w-5 h-5 text-white animate-pulse" />
                    <h3 className="text-xl font-extrabold text-white tracking-widest uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      SUMMER PUBLIC SPEAKING PROGRAM
                    </h3>
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 h-px" style={{ backgroundColor: '#0e1f3e', opacity: 0.3 }}></div>
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden shadow-2xl border-2 mb-14 bg-gradient-to-br from-white to-gray-50/50" style={{ borderColor: '#0e1f3e' }}>
                <div className="lg:grid lg:grid-cols-12 lg:gap-0">
                  {/* Left Side - Details */}
                  <div className="lg:col-span-7 p-8 lg:p-12">
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-amber-500">
                      Summer 2027 (TBD)
                    </span>
                    <h3 className="text-3xl lg:text-4xl font-extrabold mt-4 mb-6 text-[#0e1f3e]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Summer Public Speaking Course (2027)
                    </h3>
                    <p className="text-gray-600 text-base lg:text-lg mb-8 leading-relaxed">
                      Our comprehensive 8-week summer program is designed to help participants build lasting confidence, structure powerful arguments, and refine their presentation skills through active practice and personalized guidance.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6 mb-4">
                      <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                        <Clock className="w-6 h-6 flex-shrink-0 text-[#ca3433]" />
                        <div>
                          <h4 className="font-bold text-[#0e1f3e] text-base mb-0.5">Course Schedule</h4>
                          <p className="text-sm text-gray-500">4 hours a week</p>
                          <p className="text-sm font-semibold text-[#0e1f3e]">Twice a week (8 weeks)</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                        <Calendar className="w-6 h-6 flex-shrink-0 text-[#ca3433]" />
                        <div>
                          <h4 className="font-bold text-[#0e1f3e] text-base mb-0.5">Session Times</h4>
                          <p className="text-sm text-gray-500">Every Tue &amp; Thu</p>
                          <p className="text-sm font-semibold text-[#0e1f3e]">TBD</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                        <MapPin className="w-6 h-6 flex-shrink-0 text-[#ca3433]" />
                        <div>
                          <h4 className="font-bold text-[#0e1f3e] text-base mb-0.5">Class Format</h4>
                          <p className="text-sm text-gray-500">In-Person Classes</p>
                          <p className="text-sm font-semibold text-[#0e1f3e]">Virtual option available</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                        <TrendingUp className="w-6 h-6 flex-shrink-0 text-[#ca3433]" />
                        <div>
                          <h4 className="font-bold text-[#0e1f3e] text-base mb-0.5">Starts &amp; Ends</h4>
                          <p className="text-sm text-gray-500">Summer Term</p>
                          <p className="text-sm font-semibold text-[#0e1f3e]">TBD</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Call to Action */}
                  <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center text-center text-white relative" style={{ backgroundColor: '#0e1f3e' }}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(202,52,51,0.15),transparent_60%)] pointer-events-none"></div>
                    <div className="relative z-10">
                      <Award className="w-16 h-16 text-[#ca3433] mx-auto mb-6 animate-pulse" />
                      <h4 className="text-2xl font-extrabold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Join the Waitlist
                      </h4>
                      <p className="text-white/80 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
                        Secure your interest early. Join the waitlist for the Summer 2027 cohort to receive updates first.
                      </p>
                      
                      <button
                        onClick={() => scrollToInquiry("Summer 2027 Course Inquiry")}
                        className="w-full px-8 py-4 rounded-full font-bold text-white text-center text-lg transition-all duration-300 hover:scale-[1.03] shadow-lg cursor-pointer bg-[#ca3433] hover:bg-[#b02d2c] border-none"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        Inquire &amp; Join Waitlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summer Intensive Schedule details */}
              <div className="rounded-3xl overflow-hidden shadow-xl border-2 mb-14 p-8 lg:p-12 flex flex-col justify-center text-center" style={{ borderColor: '#ca3433', backgroundColor: '#fcf8f8' }}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto bg-amber-500">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-[#0e1f3e]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Summer Intensive Schedule
                </h3>
                <p className="text-xl font-semibold mb-6" style={{ color: '#ca3433' }}>
                  Public Speaking Intensive — Summer 2027 (TBD)
                </p>

                <div className="space-y-5 mb-8 text-left max-w-3xl mx-auto w-full">
                  <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                    <p className="font-semibold text-lg text-[#0e1f3e] mb-2">Level 1: Finding Your Voice</p>
                    <p className="text-sm text-gray-600 mb-1">📅 TBD</p>
                    <p className="text-sm text-gray-600">Focus: Overcoming anxiety, body language, and the basics of confident delivery.</p>
                  </div>
                  <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                    <p className="font-semibold text-lg text-[#0e1f3e] mb-2">Level 2: Mastering the Message</p>
                    <p className="text-sm text-gray-600 mb-1">📅 TBD</p>
                    <p className="text-sm text-gray-600">Focus: Structuring impactful speeches and connecting deeply with any audience.</p>
                  </div>
                  <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                    <p className="font-semibold text-lg text-[#0e1f3e] mb-2">Level 3: The Persuasive Leader</p>
                    <p className="text-sm text-gray-600 mb-1">📅 TBD</p>
                    <p className="text-sm text-gray-600">Focus: Advanced storytelling, debate skills, and inspiring action through words.</p>
                  </div>
                </div>

                <div className="text-sm text-gray-500 mb-8">
                  <p>📍 Exceed Learning Center</p>
                  <p className="mt-2">DM us or fill out the form below to secure a spot!</p>
                </div>

                <button
                  onClick={() => scrollToInquiry("Summer 2027 Course Inquiry")}
                  className="inline-block px-10 py-4 rounded-full font-bold text-white text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 border-none cursor-pointer mx-auto"
                  style={{ backgroundColor: '#0e1f3e', fontFamily: 'Montserrat, sans-serif' }}
                >
                  Inquire &amp; Enroll
                </button>
              </div>
            </div>
          )}

          {/* ── INQUIRY FORM Section ── */}
          <div ref={formRef} id="inquiry" className="scroll-mt-20 mb-20">
            <InquiryForm initialCourse={inquiryCourse} />
          </div>

          {/* ── 2-Column Grid: Videos ── */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 mb-12">
            
            {/* Podcast Video Section */}
            <div className="rounded-3xl overflow-hidden shadow-xl flex flex-col mb-8 lg:mb-0" style={{ backgroundColor: '#0e1f3e' }}>
              <div className="p-8 text-center flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  🎙️ Listen to the Podcast
                </h3>
                <p className="text-white/80 mb-6 font-medium">Hear insights from our expert instructor</p>
                <div className="w-full mt-auto aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/uLMzJ9cTHHg"
                    title="Public Speaking Podcast"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Public Speaking Sneak Peek Video */}
            <div className="rounded-3xl overflow-hidden shadow-xl flex flex-col" style={{ backgroundColor: '#f7e0e0' }}>
              <div className="p-8 text-center flex-1 flex flex-col">
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#0e1f3e', fontFamily: 'Montserrat, sans-serif' }}>
                  🎬 Course Sneak Peek
                </h3>
                <p className="mb-6 font-medium" style={{ color: '#0e1f3e' }}>Get a preview of the public speaking course</p>
                <div className="w-full mt-auto aspect-video rounded-xl overflow-hidden shadow-2xl bg-black flex items-center justify-center relative">
                  <video
                    className="w-full h-full object-cover absolute inset-0"
                    controls
                    preload="metadata"
                  >
                    <source src="/videos/Public Speaking Sneak Peek.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
            
          </div>
          <RegistrationModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            defaultSchedule={selectedSchedule} 
          />
        </main>
      </div>

      <footer className="w-full mt-auto" style={{ backgroundColor: '#0e1f3e', borderTop: '4px solid #ca3433' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-12 items-start">
            {/* Phone */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left group">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#e63e3d] shadow-lg shadow-black/20" style={{ backgroundColor: '#cf3736', border: '2px solid rgba(255,255,255,0.1)' }}>
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-gray-400 font-bold tracking-widest text-[10px] uppercase pt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>Call Us</h4>
              </div>
              <p className="text-white font-bold text-lg tracking-wide group-hover:text-red-400 transition-colors">+1 (516) 226-3114</p>
            </div>

            {/* Location */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left border-y md:border-y-0 border-white/5 py-8 md:py-0 group">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#e63e3d] shadow-lg shadow-black/20" style={{ backgroundColor: '#cf3736', border: '2px solid rgba(255,255,255,0.1)' }}>
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-gray-400 font-bold tracking-widest text-[10px] uppercase pt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>Visit Us</h4>
              </div>
              <p className="text-white text-base font-medium tracking-wide leading-relaxed group-hover:text-red-400 transition-colors">
                1360 Willis Ave.<br/>Albertson NY 11507
              </p>
            </div>

            {/* Website */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left group">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#e63e3d] shadow-lg shadow-black/20" style={{ backgroundColor: '#cf3736', border: '2px solid rgba(255,255,255,0.1)' }}>
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-gray-400 font-bold tracking-widest text-[10px] uppercase pt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>Website</h4>
              </div>
              <a 
                href="https://www.exceedlearningcenterny.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-bold text-sm sm:text-base lg:text-lg hover:text-red-400 transition-all duration-300 break-all md:break-words decoration-red-500/30 hover:decoration-red-500 underline underline-offset-8"
              >
                www.exceedlearningcenterny.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full py-6 border-t border-white/5" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img src="/images/exceed-logo.png" alt="Exceed Logo" className="h-6 w-auto opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
              <p className="text-gray-500 text-[11px] font-medium tracking-wider uppercase">
                &copy; {new Date().getFullYear()} Exceed Learning Center. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
              <span className="text-gray-400 text-[11px] font-bold tracking-[0.2em] uppercase cursor-default">Ignite Your Brilliance</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
