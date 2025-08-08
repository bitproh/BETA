import React, { useState, useEffect, useRef } from 'react';

// --- Helper Components & Data ---

// Icon components (using inline SVG for a single-file solution)
const icons = {
  sos: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 16v-4"></path>
      <path d="M12 8h.01"></path>
      <path d="m15.5 15.5-3-3"></path>
      <path d="m8.5 8.5 7 7"></path>
    </svg>
  ),
  camera: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
      <circle cx="12" cy="13" r="3"></circle>
    </svg>
  ),
  brain: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v0A2.5 2.5 0 0 1 9.5 7h0A2.5 2.5 0 0 1 7 4.5v0A2.5 2.5 0 0 1 9.5 2Z"></path>
      <path d="M14.5 2A2.5 2.5 0 0 1 17 4.5v0A2.5 2.5 0 0 1 14.5 7h0A2.5 2.5 0 0 1 12 4.5v0A2.5 2.5 0 0 1 14.5 2Z"></path>
      <path d="M12 12a2.5 2.5 0 0 0-2.5 2.5v0A2.5 2.5 0 0 0 12 17h0a2.5 2.5 0 0 0 2.5-2.5v0A2.5 2.5 0 0 0 12 12Z"></path>
      <path d="M4.5 7A2.5 2.5 0 0 0 7 9.5v0A2.5 2.5 0 0 0 4.5 12h0A2.5 2.5 0 0 0 2 9.5v0A2.5 2.5 0 0 0 4.5 7Z"></path>
      <path d="M19.5 7a2.5 2.5 0 0 0 2.5 2.5v0a2.5 2.5 0 0 0-2.5 2.5h0a2.5 2.5 0 0 0-2.5-2.5v0a2.5 2.5 0 0 0 2.5-2.5Z"></path>
      <path d="M9.5 17A2.5 2.5 0 0 1 12 19.5v0a2.5 2.5 0 0 1-2.5 2.5h0A2.5 2.5 0 0 1 7 19.5v0A2.5 2.5 0 0 1 9.5 17Z"></path>
      <path d="M14.5 17A2.5 2.5 0 0 1 17 19.5v0a2.5 2.5 0 0 1-2.5 2.5h0a2.5 2.5 0 0 1-2.5-2.5v0A2.5 2.5 0 0 1 14.5 17Z"></path>
    </svg>
  ),
  reminder: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
      <path d="M12 6v6l4 2"></path>
    </svg>
  ),
  medicine: (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10"></path>
        <path d="M12 2a10 10 0 1 0-10 10"></path>
        <path d="M12 2v20"></path>
        <path d="M2 12h20"></path>
        <path d="m4.93 4.93 2.12 2.12"></path>
        <path d="m16.95 16.95 2.12 2.12"></path>
        <path d="m4.93 19.07 2.12-2.12"></path>
        <path d="m16.95 7.05 2.12-2.12"></path>
    </svg>
  ),
  back: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  )
};

// --- Page Components ---

/**
 * LoginPage Component
 * @param {function} onLogin - Callback function to handle login logic.
 */
const LoginPage = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      onLogin(name);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop')"}}>
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 text-center mb-12">
        <h1 className="text-7xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
          MyPill
        </h1>
        <p className="text-white/80 font-light mt-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Your Personal Health Companion</p>
      </div>
      <div className="relative z-10 w-full max-w-sm p-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-white/20 text-white placeholder-white/70 rounded-lg border-2 border-transparent focus:border-white focus:outline-none transition-all"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 bg-white/20 text-white placeholder-white/70 rounded-lg border-2 border-transparent focus:border-white focus:outline-none transition-all"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          />
          <button
            type="submit"
            className="w-full py-3 bg-white text-blue-900 font-bold rounded-lg shadow-lg hover:bg-gray-200 active:scale-95 transition-all duration-300 ease-in-out"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

/**
 * DashboardPage Component
 * @param {string} userName - The name of the logged-in user.
 * @param {function} onNavigate - Callback to navigate to a different page.
 */
const DashboardPage = ({ userName, onNavigate }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center p-6 bg-gradient-to-br from-gray-50 to-blue-100" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back,</h2>
      <h1 className="text-4xl font-extrabold text-blue-800 mb-12">{userName}!</h1>
      
      <div className="space-y-6">
        <div 
          onClick={() => onNavigate('patient')}
          className="p-8 bg-white rounded-2xl shadow-lg border border-gray-200 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <h3 className="text-2xl font-bold text-blue-900">PATIENT</h3>
          <p className="text-gray-500 mt-1">Access your personal health dashboard.</p>
        </div>
        
        <div
          onClick={() => alert('Caretaker features are in development and coming soon!')}
          className="p-8 bg-white rounded-2xl shadow-lg border border-gray-200 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <h3 className="text-2xl font-bold text-blue-900">CARETAKER</h3>
          <p className="text-gray-500 mt-1">Manage and assist your loved ones.</p>
        </div>
      </div>
    </div>
  );
};

/**
 * PatientPage Component
 * @param {function} onBack - Callback to navigate back to the dashboard.
 */
const PatientPage = ({ onBack }) => {
  const [healthTip, setHealthTip] = useState('');
  const [isLoadingTip, setIsLoadingTip] = useState(true);
  const [error, setError] = useState(null);

  // Fetch a health tip from Gemini API when the component mounts
  useEffect(() => {
    const fetchHealthTip = async () => {
      setIsLoadingTip(true);
      setError(null);
      
      const prompt = "Give me a short, encouraging, and easy-to-understand daily health tip. Make it sound friendly and positive.";
      const apiKey = ""; // API key will be injected by the environment
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
      
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }

        const result = await response.json();
        
        if (result.candidates && result.candidates.length > 0) {
          const text = result.candidates[0].content.parts[0].text;
          setHealthTip(text.trim());
        } else {
          throw new Error("No content received from API.");
        }
      } catch (err) {
        console.error("Failed to fetch health tip:", err);
        setError("Could not fetch a health tip right now. Please try again later.");
        setHealthTip("Remember to stay hydrated and take your medications on time!"); // Fallback tip
      } finally {
        setIsLoadingTip(false);
      }
    };

    fetchHealthTip();
  }, []);

  const features = [
    { name: 'SOS', icon: icons.sos, color: 'bg-red-500', textColor: 'text-white' },
    { name: 'Scan Medicine', icon: icons.camera, color: 'bg-white' },
    { name: 'AI Diagnosis', icon: icons.brain, color: 'bg-white' },
    { name: 'Reminder', icon: icons.reminder, color: 'bg-white' },
    { name: 'Your Medicine', icon: icons.medicine, color: 'bg-white' },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gray-50" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <header className="flex items-center p-4 bg-white shadow-sm z-10">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
          {icons.back}
        </button>
        <h1 className="text-xl font-bold text-gray-800 ml-4">Patient Dashboard</h1>
      </header>

      <main className="flex-grow p-4 overflow-y-auto">
        {/* Daily Health Tip Section */}
        <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-2">Daily Health Tip</h2>
            <div className="bg-blue-100/50 border border-blue-200 rounded-xl p-4 min-h-[80px] flex items-center justify-center">
                {isLoadingTip ? (
                    <p className="text-blue-800 animate-pulse">Generating your tip...</p>
                ) : (
                    <p className="text-blue-900 text-center text-sm leading-relaxed">{error || healthTip}</p>
                )}
            </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl shadow-md cursor-pointer aspect-square transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:scale-95 ${feature.color} ${feature.textColor || 'text-gray-700'}`}
            >
              <div className={`mb-2 ${feature.textColor || 'text-blue-600'}`}>{feature.icon}</div>
              <span className="font-semibold text-center text-sm">{feature.name}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};


/**
 * Main App Component
 * This component manages the overall state and renders the pages within a mock device frame.
 */
export default function App() {
  const [page, setPage] = useState('login'); // 'login', 'dashboard', 'patient'
  const [userName, setUserName] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const screenRef = useRef(null);

  // Function to handle smooth page transitions
  const navigate = (nextPage) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPage(nextPage);
      setIsTransitioning(false);
      if(screenRef.current) {
        screenRef.current.scrollTop = 0; // Scroll to top on page change
      }
    }, 300); // Duration matches the CSS transition
  };

  const handleLogin = (name) => {
    setUserName(name);
    navigate('dashboard');
  };

  const handleGoBack = () => {
    navigate('dashboard');
  }

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <DashboardPage userName={userName} onNavigate={navigate} />;
      case 'patient':
        return <PatientPage onBack={handleGoBack} />;
      case 'login':
      default:
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  return (
    // Main container for the whole experience
    <div className="w-full min-h-screen bg-gray-800 flex items-center justify-center p-4 font-sans" style={{backgroundImage: "linear-gradient(to right top, #6d327c, #485DA6, #00a1ba, #00BF98, #36C486)"}}>
      
      {/* Google Fonts Import */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700&display=swap');
        `}
      </style>

      {/* Mock Android Device Frame */}
      <div className="w-[390px] h-[844px] bg-black rounded-[60px] shadow-2xl p-4 border-4 border-gray-600">
        <div className="w-full h-full bg-white rounded-[44px] overflow-hidden relative">
          {/* Mock device notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-black rounded-b-2xl z-20 flex justify-center items-end pb-1.5">
            <div className="w-12 h-2 bg-gray-800 rounded-full"></div>
          </div>
          
          {/* Screen Content */}
          <div ref={screenRef} className={`w-full h-full overflow-y-auto transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {renderPage()}
          </div>
        </div>
      </div>
    </div>
  );
}
