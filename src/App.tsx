import { Calendar, Clock, DollarSign, Award, TrendingUp, Crown, MapPin, Video, Zap } from 'lucide-react';
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

function App() {
  const [selectedImage] = useState<string>('/images/public-speaking.jpg');

  const courseLevels: CourseLevel[] = [
    {
      title: 'Level 1',
      level: 'Public Speaking',
      icon: <Award className="w-8 h-8 text-white" />,
      description: 'An intensive introduction to public speaking. Build your foundational confidence, vocal power, and stage presence.',
      color: '#0e1f3e',
      price: '$139',
      stripeLink: 'https://buy.stripe.com/7sY8wI4q0gUGaWd2SfdfG0i',
      showDate: false,
      crashCourse: {
        dates: 'March 22, 2026',
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
      description: 'Enhance your skills with advanced techniques. Master storytelling, audience engagement, and persuasive speaking.',
      color: '#ca3433',
      price: '$139',
      stripeLink: 'https://buy.stripe.com/14A3co1dO1ZM9S950ndfG0b',
      showDate: false,
      crashCourse: {
        dates: 'March 29, 2026',
        time: '2:00 PM – 5:00 PM',
        price: '$139',
        stripeLink: 'https://buy.stripe.com/14A3co1dO1ZM9S950ndfG0b',
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
      stripeLink: 'https://buy.stripe.com/14A3co1dO1ZM9S950ndfG0b',
      showDate: false,
      crashCourse: {
        dates: 'Coming Soon',
        time: '2:00 PM – 4:00 PM',
        price: '$139',
        stripeLink: 'https://buy.stripe.com/14A3co1dO1ZM9S950ndfG0b',
        showDate: false,
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
          <div className="rounded-3xl shadow-2xl overflow-hidden mb-12" style={{ backgroundColor: '#f7e0e0' }}>
            <div className="lg:grid lg:grid-cols-2 lg:gap-0">
              <div className="px-8 py-12 lg:px-12 lg:py-16 relative" style={{ backgroundColor: '#0e1f3e' }}>
                <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Find Your Voice: Public Speaking Course
                </h2>
                <div className="w-20 h-1 mb-8" style={{ backgroundColor: '#ca3433' }}></div>
                <p className="text-lg text-white leading-relaxed mb-6">
                  Gain the confidence and practical skills to deliver engaging and impactful presentations.
                </p>
                <p className="text-lg text-white leading-relaxed mb-8">
                  Learn to manage nerves, structure your message, and effectively{' '}
                  <span className="font-semibold" style={{ color: '#f7e0e0' }}>
                    Ignite Your Brilliance
                  </span>{' '}
                  every time you step up to speak.
                </p>
                <p className="text-white text-lg mb-4">
                  <span className="font-semibold">Choose your level below</span> — from foundational skills to mastery!
                </p>
              </div>

              <div className="px-8 py-12 lg:px-12 lg:py-16 flex flex-col justify-center">
                <div className="mb-8">
                  <div className="relative">
                    <img
                      src={selectedImage}
                      alt="Public Speaking"
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                </div>

                {/* Pricing Options */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#ca3433' }}>
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1" style={{ color: '#0e1f3e', fontFamily: 'Montserrat, sans-serif' }}>
                        Investment Per Level
                      </h4>
                      <p className="text-2xl font-bold" style={{ color: '#ca3433' }}>
                        $439
                      </p>
                      <p className="text-sm text-gray-600">Per course level</p>
                    </div>
                  </div>

                  {/* Bundle Offer */}
                  <div className="mt-6 p-4 rounded-xl border-2 border-dashed" style={{ borderColor: '#ca3433', backgroundColor: 'rgba(202, 52, 51, 0.05)' }}>
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-500">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg" style={{ color: '#0e1f3e', fontFamily: 'Montserrat, sans-serif' }}>
                          🎉 SIGNUP ALL 3 FOR $1,200!
                        </h4>
                        <p className="text-sm text-gray-600">Save $117 when you enroll in all levels</p>
                      </div>
                    </div>
                    <a
                      href="https://buy.stripe.com/14A3co1dO1ZM9S950ndfG0b"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full mt-4 px-6 py-4 rounded-full font-bold text-white text-center text-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
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
                    </div>

                    <a
                      href={course.stripeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-6 py-4 rounded-full font-semibold text-white text-center text-lg transition-all duration-300 hover:shadow-lg hover:opacity-90"
                      style={{ backgroundColor: course.color }}
                    >
                      Enroll Now
                    </a>
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

          {/* Podcast Video Section */}
          <div className="mb-12 rounded-3xl overflow-hidden shadow-xl" style={{ backgroundColor: '#0e1f3e' }}>
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                🎙️ Listen to the Podcast with the Trainer
              </h3>
              <p className="text-white/80 mb-6">Get inspired and hear insights from our expert instructor</p>
              <div className="max-w-3xl mx-auto aspect-video rounded-xl overflow-hidden shadow-2xl">
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
          <div className="mb-12 rounded-3xl overflow-hidden shadow-xl" style={{ backgroundColor: '#f7e0e0' }}>
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#0e1f3e', fontFamily: 'Montserrat, sans-serif' }}>
                🎬 Public Speaking Sneak Peek
              </h3>
              <p className="mb-6" style={{ color: '#0e1f3e' }}>Get a preview of what you'll learn in our course</p>
              <div className="max-w-md mx-auto rounded-xl overflow-hidden shadow-2xl">
                <video
                  className="w-full h-auto"
                  controls
                  preload="metadata"
                >
                  <source src="/videos/Public Speaking Sneak Peek.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </main>

        <footer className="py-8 text-center text-gray-600 text-sm">
          <p>© 2026 Exceed Learning Center. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
