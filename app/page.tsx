"use client";

import { Calendar, Clock, DollarSign, Award, TrendingUp, Crown, MapPin, Video, Zap, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

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

  const courseLevels: CourseLevel[] = [
    {
      title: 'Level 1',
      level: 'Public Speaking',
      icon: <Award className="w-8 h-8 text-white" />,
      description: 'An intensive introduction to public speaking. Build your foundational confidence, vocal power, and stage presence.',
      color: '#0e1f3e',
      price: '$439',
      stripeLink: 'https://buy.stripe.com/7sY8wI4q0gUGaWd2SfdfG0i',
      showDate: true,
      dates: 'June 14, 2026',
      crashCourse: {
        dates: 'April 12, 2026',
        time: '12:00 PM – 2:00 PM',
        price: '$139',
        stripeLink: 'https://buy.stripe.com/7sY8wI4q0gUGaWd2SfdfG0i',
        showDate: true,
      }
    },
    {
      title: 'Level 2',
      level: 'Public Speaking',
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      description: 'Enhance your skills with advanced techniques. Master storytelling, audience engagement, and persuasive speaking.',
      color: '#ca3433',
      price: '$439',
      stripeLink: 'https://buy.stripe.com/14A3co1dO1ZM9S950ndfG0b',
      showDate: true,
      dates: 'June 21, 2026',
      crashCourse: {
        dates: 'April 12, 2026',
        time: '2:30 PM – 4:30 PM',
        price: '$139',
        stripeLink: 'https://buy.stripe.com/14A3co1dO1ZM9S950ndfG0b',
        showDate: true,
      }
    },
    {
      title: 'Level 3',
      level: 'Public Speaking',
      icon: <Crown className="w-8 h-8 text-white" />,
      dates: 'June 28, 2026',
      time: '12:00 PM - 3:00 PM',
      description: 'Achieve mastery in public speaking. Command any room with executive presence and professional polish.',
      color: '#0e1f3e',
      price: '$439',
      stripeLink: 'https://buy.stripe.com/7sY5kwcWw9se6FXfF1dfG04',
      showDate: true,
      crashCourse: {
        dates: 'May 17, 2026',
        time: '1:00 PM – 4:00 PM',
        price: '$139',
        stripeLink: 'https://buy.stripe.com/14A3co1dO1ZM9S950ndfG0b',
        showDate: true,
      }
    },
  ];

  return (
    <div className="min-h-screen bg-white">
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
                    <a
                      href="https://buy.stripe.com/14A3co1dO1ZM9S950ndfG0b"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 rounded-xl font-bold text-white text-center text-[17px] transition-transform duration-300 hover:scale-[1.02] shadow-sm"
                      style={{ backgroundColor: '#ca3433', fontFamily: 'Montserrat, sans-serif' }}
                    >
                      Enroll in All 3 Levels - $1,200
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Levels Section */}
          <h3 className="text-3xl font-bold text-center mb-8" style={{ color: '#0e1f3e', fontFamily: 'Montserrat, sans-serif' }}>
            Choose Your Level
          </h3>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {courseLevels.map((course, index) => (
              <div key={index} className="flex flex-col gap-4">

                {/* ── Main Level Card ── */}
                <div
                  className="rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105"
                  style={{ backgroundColor: '#fff' }}
                >
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
                      <a
                        href={course.stripeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full px-6 py-4 rounded-full font-semibold text-white text-center text-lg transition-all duration-300 hover:shadow-lg hover:opacity-90"
                        style={{ backgroundColor: course.color }}
                      >
                        Enroll Now
                      </a>
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

                {/* ── Crash Course Sub-Card ── */}
                <div
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
                        Crash Course
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
                        <a
                          href={course.crashCourse.stripeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full mt-2 px-4 py-3 rounded-full font-semibold text-white text-center text-sm transition-all duration-300 hover:shadow-md hover:opacity-90"
                          style={{ backgroundColor: course.color }}
                        >
                          Enroll in Crash Course
                        </a>
                      </>
                    ) : (
                      <div className="py-2 text-center">
                        <p className="text-sm text-gray-500 italic">Date coming soon — stay tuned!</p>
                      </div>
                    )}
                  </div>
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
                      <p className="font-semibold text-base sm:text-lg" style={{ color: '#0e1f3e' }}>Starts June 29</p>
                      <p className="text-sm sm:text-base text-gray-600">Mon & Thu (8 Weeks)</p>
                      <p className="text-sm sm:text-base text-gray-600">Ends August 20</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 flex-shrink-0" style={{ color: '#ca3433' }} />
                    <div className="text-left">
                      <p className="font-semibold text-base sm:text-lg" style={{ color: '#0e1f3e' }}>Time</p>
                      <p className="text-sm sm:text-base text-gray-600">12:00 PM – 3:00 PM</p>
                    </div>
                  </div>
                </div>

                <a
                  href="#enroll"
                  className="inline-block px-10 py-4 rounded-full font-bold text-white text-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
                  style={{ backgroundColor: '#0e1f3e', fontFamily: 'Montserrat, sans-serif' }}
                >
                  Inquire & Enroll
                </a>
              </div>
            </div>

            {/* All 3 Levels Bundle CTA */}
            <div className="mt-8 lg:mt-0 flex flex-col justify-center">
              <div className="rounded-3xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-xl h-full flex flex-col justify-center transition-all duration-300 hover:shadow-2xl p-1 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shine z-0"></div>
                <a
                  href="https://buy.stripe.com/14A3co1dO1ZM9S950ndfG0b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 flex flex-col items-center justify-center w-full h-full px-8 py-12 rounded-[22px] font-bold text-white text-center"
                  style={{ backgroundColor: '#0e1f3e', fontFamily: 'Montserrat, sans-serif' }}
                >
                  <Crown className="w-16 h-16 text-yellow-400 mb-6 drop-shadow-lg" />
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
                </a>
              </div>
            </div>
            
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
        </main>
      </div>

      <footer className="py-12 md:py-16 w-full mt-auto" style={{ backgroundColor: '#0e1f3e' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 md:gap-4 lg:gap-8">
            {/* Phone */}
            <div className="flex items-center gap-4 lg:gap-5 justify-center md:justify-start">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#cf3736', border: '5px solid #a82928' }}>
                <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div className="text-left">
                <h4 className="text-white font-extrabold tracking-wide text-sm sm:text-base mb-1 uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>Phone Number:</h4>
                <p className="text-white font-bold text-lg sm:text-xl tracking-wide">+1 (516) 226-3114</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4 lg:gap-5 justify-center md:justify-center border-t border-b md:border-t-0 md:border-b-0 border-white/10 py-6 md:py-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#cf3736', border: '5px solid #a82928' }}>
                <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div className="text-left">
                <h4 className="text-white font-extrabold tracking-wide text-sm sm:text-base mb-1 uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>Our Location:</h4>
                <p className="text-white text-base sm:text-lg font-medium tracking-wide">1360 Willis Ave., Albertson NY 11507</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 lg:gap-5 justify-center md:justify-end">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#cf3736', border: '5px solid #a82928' }}>
                <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div className="text-left">
                <h4 className="text-white font-extrabold tracking-wide text-sm sm:text-base mb-1 uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>Email Address:</h4>
                <a href="mailto:info@exceedlearningcenter.com" className="text-white font-bold text-base sm:text-lg underline hover:text-gray-300 transition-colors tracking-wide">
                  Email us directly [+]
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
