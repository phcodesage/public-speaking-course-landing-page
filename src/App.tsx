import { Mic, Calendar, Clock, DollarSign } from 'lucide-react';
import { useState } from 'react';

function App() {
  const [selectedImage] = useState<string>('/images/public-speaking.jpg');

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

        <main className="py-12">
          <div className="rounded-3xl shadow-2xl overflow-hidden" style={{ backgroundColor: '#f7e0e0' }}>
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
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <a
                    href="https://buy.stripe.com/7sYeV6g8Iawi0hz50ndfG02"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-full font-semibold text-white text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    style={{ backgroundColor: '#ca3433' }}
                  >
                    Enroll Now
                  </a>
                </div>
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
                <h3 className="text-2xl font-bold mb-8" style={{ color: '#0e1f3e' }}>
                  Course Details
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0e1f3e' }}>
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1" style={{ color: '#0e1f3e' }}>
                        Schedule
                      </h4>
                      <p className="text-gray-700">
                        Nov 23, 30, Dec 7 & 14
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0e1f3e' }}>
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1" style={{ color: '#0e1f3e' }}>
                        Time
                      </h4>
                      <p className="text-gray-700">
                        10AM - 12 NOON
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#ca3433' }}>
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1" style={{ color: '#0e1f3e' }}>
                        Investment
                      </h4>
                      <p className="text-2xl font-bold" style={{ color: '#ca3433' }}>
                        $359
                      </p>
                      <p className="text-sm text-gray-600">Full course</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="py-8 text-center text-gray-600 text-sm">
          <p>© 2024 Public Speaking Excellence. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
