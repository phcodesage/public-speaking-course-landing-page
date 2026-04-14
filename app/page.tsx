"use client";

import { useState, useRef } from 'react';
import { Calendar, Clock, DollarSign, Award, TrendingUp, Crown, MapPin, Video, Zap, Phone, Mail, Send, Loader2, CheckCircle2 } from 'lucide-react';
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

  const scrollToInquiry = (courseName?: string) => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (courseName) {
      // We'll handle setting the course in the InquiryForm component itself or via a more React-friendly way
      // For now, let's keep it simple as the user might want to select it manually
    }
  };

  const courseLevels: CourseLevel[] = [
    {
      title: 'Level 1',
      level: 'Public Speaking',
      icon: <Award className="w-8 h-8 text-white" />,
      description: 'Focuses on building foundational confidence and a grounded stage presence.',
      color: '#0e1f3e',
      price: '$439',
      stripeLink: 'https://buy.stripe.com/7sY5kwcWw9se6FXfF1dfG04',
      showDate: true,
      dates: 'April 12, 2026',
      time: '12:00 PM – 2:00 PM',
      crashCourse: {
        dates: 'June 1, 2026',
        time: '2:00 PM – 5:00 PM',
        price: '$139',
        stripeLink: 'https://buy.stripe.com/7sY8wI4q0gUGaWd2SfdfG0i',
        showDate: true,
      }
    },
    {
      title: 'Level 2',
      level: 'Public Speaking',
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      description: 'Mastery of storytelling, audience engagement, and persuasive speaking.',
      color: '#ca3433',
      price: '$439',
      stripeLink: 'https://buy.stripe.com/7sY5kwcWw9se6FXfF1dfG04',
      showDate: true,
      dates: 'April 12, 2026',
      time: '2:30 PM – 4:30 PM',
      crashCourse: {
        dates: 'June 14, 2026',
        time: '2:00 PM – 5:00 PM',
        price: '$139',
        stripeLink: 'https://buy.stripe.com/7sY8wI4q0gUGaWd2SfdfG0i',
        showDate: true,
      }
    },
    {
      title: 'Level 3',
      level: 'Public Speaking',
      icon: <Crown className="w-8 h-8 text-white" />,
      description: 'Achieve mastery in public speaking. Command any room with executive presence and professional polish.',
      color: '#0e1f3e',
      price: '$439',
      stripeLink: 'https://buy.stripe.com/7sY5kwcWw9se6FXfF1dfG04',
      showDate: false,
      crashCourse: {
        dates: 'June 28, 2026',
        time: '2:00 PM – 5:00 PM',
        price: '$139',
        stripeLink: 'https://buy.stripe.com/7sY8wI4q0gUGaWd2SfdfG0i',
        showDate: true,
      }
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageTracker />
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
                  {/* Investment */}
                  <div className="flex items-center gap-4 px-2">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: '#ca3433' }}>
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[17px] leading-tight mb-1" style={{ color: '#0e1f3e', fontFamily: 'Montserrat, sans-serif' }}>
                        Investment Per Level
                      </h4>
                      <p className="text-2xl font-bold leading-none mb-1" style={{ color: '#ca3433' }}>
                        $439
                      </p>
                      <p className="text-[13px] text-gray-500 leading-none">Per course level</p>
                    </div>
                  </div>

                  {/* Bundle Offer */}
                  <div className="p-5 rounded-xl border-[1.5px] border-dashed border-[#ca3433]/70 flex flex-col gap-4 relative" style={{ backgroundColor: 'rgba(202, 52, 51, 0.04)' }}>
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
                      Enroll in All 3 Levels - $1,200
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── CRASH COURSE Section ── */}
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

          <div className="grid md:grid-cols-3 gap-8 mb-14">
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
                        Enroll in Crash Course
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

          {/* ── PUBLIC SPEAKING CLASSES Section ── */}
          <div className="mb-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px" style={{ backgroundColor: '#0e1f3e', opacity: 0.3 }}></div>
              <div className="flex items-center gap-3 px-6 py-3 rounded-full shadow-md" style={{ backgroundColor: '#0e1f3e' }}>
                <Award className="w-5 h-5 text-white" />
                <h3 className="text-xl font-extrabold text-white tracking-widest uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  PUBLIC SPEAKING CLASSES
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
                      Enroll Now
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

          {/* ── 2-Column Grid: Summer Course & Bundle ── */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 mb-12">
            
            {/* Summer Course Section */}
            <div className="rounded-3xl overflow-hidden shadow-xl border-2 h-full flex flex-col" style={{ borderColor: '#ca3433', backgroundColor: '#fcf8f8' }}>
              <div className="px-8 py-10 lg:px-12 text-center flex-1 flex flex-col justify-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto" style={{ backgroundColor: '#ca3433' }}>
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0e1f3e', fontFamily: 'Montserrat, sans-serif' }}>
                  Public Speaking Summer Course
                </h3>
                <p className="text-xl font-semibold mb-6" style={{ color: '#ca3433' }}>
                  FULL COURSE PROGRAMS FOR TEENS ONLY
                </p>
                
                <div className="flex flex-col xl:flex-row items-center justify-center gap-6 xl:gap-8 mb-8">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 flex-shrink-0" style={{ color: '#ca3433' }} />
                    <div className="text-left">
                      <p className="font-semibold text-base sm:text-lg" style={{ color: '#0e1f3e' }}>Starts June 30</p>
                      <p className="text-sm sm:text-base text-gray-600">Tue & Thu (8 Weeks)</p>
                      <p className="text-sm sm:text-base text-gray-600">Ends August 20</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 flex-shrink-0" style={{ color: '#ca3433' }} />
                    <div className="text-left">
                      <p className="font-semibold text-base sm:text-lg" style={{ color: '#0e1f3e' }}>Time</p>
                      <p className="text-sm sm:text-base text-gray-600">3:00 PM – 5:00 PM</p>
                    </div>
                  </div>
                </div>

                <a
                  href="#inquiry"
                  onClick={(e) => { e.preventDefault(); scrollToInquiry(); }}
                  className="inline-block px-10 py-4 rounded-full font-bold text-white text-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
                  style={{ backgroundColor: '#0e1f3e', fontFamily: 'Montserrat, sans-serif' }}
                >
                  Inquire &amp; Enroll
                </a>
              </div>
            </div>

            {/* All 3 Levels Bundle CTA */}
            <div className="mt-8 lg:mt-0 flex flex-col justify-center">
              <div className="rounded-3xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-xl h-full flex flex-col justify-center transition-all duration-300 hover:shadow-2xl p-1 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shine z-0"></div>
                <button
                  onClick={() => { setSelectedSchedule("bundle"); setIsModalOpen(true); }}
                  className="relative z-10 flex flex-col items-center justify-center w-full h-full px-8 py-12 rounded-[22px] font-bold text-white text-center appearance-none border-none cursor-pointer"
                  style={{ backgroundColor: '#0e1f3e', fontFamily: 'Montserrat, sans-serif' }}
                >
                  <Crown className="w-16 h-16 text-yellow-400 mb-6 drop-shadow-lg mx-auto" />
                  <h3 className="text-3xl md:text-4xl lg:text-3xl xl:text-4xl mb-4 leading-tight">
                    Avail All 3 Courses
                  </h3>
                  <div className="text-4xl md:text-5xl text-yellow-400 drop-shadow-md mb-6">
                    $1,200
                  </div>
                  <div className="inline-block px-6 py-2 rounded-full border border-yellow-400/30 bg-yellow-400/10">
                    <p className="text-sm md:text-base font-medium text-gray-200 font-sans tracking-wide">
                      Save $117 when you enroll in all 3 levels
                    </p>
                  </div>
                </button>
              </div>
            </div>
            
          </div>

          {/* ── INQUIRY FORM Section ── */}
          <div ref={formRef} id="inquiry" className="scroll-mt-20 mb-20">
            <InquiryForm />
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

            {/* Email */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left group">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#e63e3d] shadow-lg shadow-black/20" style={{ backgroundColor: '#cf3736', border: '2px solid rgba(255,255,255,0.1)' }}>
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-gray-400 font-bold tracking-widest text-[10px] uppercase pt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>Email Us</h4>
              </div>
              <a 
                href="mailto:teenprograms@exceedlearningcenterny.com" 
                className="text-white font-bold text-sm sm:text-base lg:text-lg hover:text-red-400 transition-all duration-300 break-all md:break-words decoration-red-500/30 hover:decoration-red-500 underline underline-offset-8"
              >
                teenprograms@exceedlearningcenterny.com
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
