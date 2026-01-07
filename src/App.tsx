import { Mic, Calendar, Clock, DollarSign, Award, TrendingUp, Crown } from 'lucide-react';
import { useState } from 'react';

interface CourseLevel {
  title: string;
  level: string;
  icon: React.ReactNode;
  schedule: string;
  time: string;
  description: string;
  color: string;
}

function App() {
  const [selectedImage] = useState<string>('/images/public-speaking.jpg');

  const courseLevels: CourseLevel[] = [
    {
      title: 'Beginner',
      level: 'Level 1',
      icon: <Award className="w-8 h-8 text-white" />,
      schedule: 'Starts Jan 18 • 4 Sundays (Jan 18, 25, Feb 1, 8)',
      time: '2:00 PM - 4:00 PM',
      description: 'Build your foundation in public speaking. Perfect for those new to presenting or looking to overcome stage fright.',
      color: '#0e1f3e'
    },
    {
      title: 'Intermediate',
      level: 'Level 2',
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      schedule: 'Starts March 1 • Sundays',
      time: '2:00 PM - 4:00 PM',
      description: 'Enhance your skills with advanced techniques. Learn storytelling, audience engagement, and persuasive speaking.',
      color: '#ca3433'
    },
    {
      title: 'Master',
      level: 'Level 3',
      icon: <Crown className="w-8 h-8 text-white" />,
      schedule: 'April 12, 19, 26 & May 3',
      time: '2:00 PM - 4:00 PM',
      description: 'Achieve mastery in public speaking. Command any room with executive presence and professional polish.',
      color: '#0e1f3e'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="pt-12 pb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Mic className="w-10 h-10" style={{ color: '#ca3433' }} />
            <h1 className="text-2xl font-bold" style={{ color: '#0e1f3e' }}>
              Public Speaking Excellence
            </h1>
          </div>
          <p className="text-center text-sm tracking-wider" style={{ color: '#ca3433' }}>
            Education Opens Up The Mind
          </p>
        </header>

        <main className="py-8">
          {/* Hero Section */}
          <div className="rounded-3xl shadow-2xl overflow-hidden mb-12" style={{ backgroundColor: '#f7e0e0' }}>
            <div className="lg:grid lg:grid-cols-2 lg:gap-0">
              <div className="px-8 py-12 lg:px-12 lg:py-16 relative" style={{ backgroundColor: '#0e1f3e' }}>
                <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
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
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#ca3433' }}>
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1" style={{ color: '#0e1f3e' }}>
                      Investment Per Level
                    </h4>
                    <p className="text-2xl font-bold" style={{ color: '#ca3433' }}>
                      $439
                    </p>
                    <p className="text-sm text-gray-600">Per course level</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Levels Section */}
          <h3 className="text-3xl font-bold text-center mb-8" style={{ color: '#0e1f3e' }}>
            Choose Your Level
          </h3>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {courseLevels.map((course, index) => (
              <div
                key={index}
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
                  <h4 className="text-3xl font-bold text-white mb-2">{course.title}</h4>
                  <p className="text-white/80 text-base">{course.level}</p>
                </div>

                {/* Card Body */}
                <div className="px-6 py-8">
                  <p className="text-gray-600 mb-6 min-h-[72px] text-lg">
                    {course.description}
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: course.color }} />
                      <div>
                        <p className="font-semibold text-base" style={{ color: '#0e1f3e' }}>Schedule</p>
                        <p className="text-gray-600 text-base">{course.schedule}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: course.color }} />
                      <div>
                        <p className="font-semibold text-base" style={{ color: '#0e1f3e' }}>Time</p>
                        <p className="text-gray-600 text-base">{course.time}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: course.color }} />
                      <div>
                        <p className="font-semibold text-base" style={{ color: '#0e1f3e' }}>Investment</p>
                        <p className="font-bold text-xl" style={{ color: '#ca3433' }}>$439</p>
                      </div>
                    </div>
                  </div>

                  <a
                    href="https://buy.stripe.com/7sY5kwcWw9se6FXfF1dfG04"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-6 py-4 rounded-full font-semibold text-white text-center text-lg transition-all duration-300 hover:shadow-lg hover:opacity-90"
                    style={{ backgroundColor: course.color }}
                  >
                    Enroll Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </main>

        <footer className="py-8 text-center text-gray-600 text-sm">
          <p>© 2026 Public Speaking Excellence. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
