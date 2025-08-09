import React, { useState, useEffect, useRef } from 'react';

// --- HELPER & UTILITY COMPONENTS ---

const Icon = ({ name, className = '' }) => {
    // This component now uses a ref and sets the innerHTML, which is a safer way
    // to integrate with DOM-manipulating libraries like Feather Icons.
    // This prevents the "removeChild" error.
    const iconRef = useRef(null);
    useEffect(() => {
        if (iconRef.current && window.feather && window.feather.icons[name]) {
            iconRef.current.innerHTML = window.feather.icons[name].toSvg({ class: className });
        }
    }, [name, className]);
    return <span ref={iconRef} />;
};

const ToggleSwitch = ({ isEnabled, onToggle, label, onIcon, offIcon }) => (
    <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-800 dark:text-gray-100">{label}</span>
        <button
            onClick={onToggle}
            className={`relative inline-flex items-center h-7 rounded-full w-12 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-white/50 ${isEnabled ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600'}`}
        >
            <span
                className={`inline-block w-5 h-5 transform bg-white dark:bg-slate-200 rounded-full transition-transform duration-300 ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`}
            />
            <span className={`absolute w-4 h-4 text-white transition-opacity duration-300 ${isEnabled ? 'opacity-100 left-1.5' : 'opacity-0'}`}><Icon name={onIcon} className="w-full h-full" /></span>
            <span className={`absolute w-4 h-4 text-slate-500 dark:text-slate-400 transition-opacity duration-300 ${!isEnabled ? 'opacity-100 right-1.5' : 'opacity-0'}`}><Icon name={offIcon} className="w-full h-full" /></span>
        </button>
    </div>
);

const GradientButton = ({ onClick, disabled, children, className = '', gradient = 'from-indigo-500 to-purple-600' }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full px-6 py-3 text-white font-semibold rounded-full bg-gradient-to-r ${gradient} hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${className}`}
    >
        {children}
    </button>
);


// --- CORE UI COMPONENTS ---

const FeatureCard = ({ icon, color, title, onClick }) => (
    <div onClick={onClick} className={`flex flex-col items-center justify-center p-6 aspect-square cursor-pointer rounded-3xl bg-white/50 dark:bg-gray-800/20 border border-white/20 dark:border-white/10 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
        <Icon name={icon} className={`w-10 h-10 ${color}`} />
        <span className="mt-3 text-center font-semibold text-gray-800 dark:text-gray-100">{title}</span>
    </div>
);

const PageHeader = ({ title, onBack }) => (
    <header className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex-shrink-0 border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-4">
             <button onClick={onBack} className="flex items-center gap-2 px-3 py-2 rounded-full text-gray-800 dark:text-gray-100 bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 transition-colors">
                <Icon name="arrow-left" className="w-5 h-5" />
                <span className="font-semibold">Back</span>
             </button>
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h1>
        </div>
    </header>
);


// --- MODAL COMPONENTS ---

const ModalWrapper = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="w-full max-w-sm p-8 rounded-3xl shadow-xl text-left bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/50 dark:border-white/20" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

const SosModal = ({ isOpen, onClose, speak }) => (
    <ModalWrapper isOpen={isOpen} onClose={() => { speak("Closing SOS modal"); onClose(); }}>
        <div className="text-center">
            <div className="mx-auto w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center border-4 border-red-200 dark:border-red-500/30">
                <Icon name="alert-triangle" className="w-10 h-10 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-6">Emergency Alert</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Are you sure you want to send an SOS signal?</p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={() => { speak("Cancel"); onClose(); }} className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center justify-center gap-2">
                    <Icon name="x-circle" className="w-5 h-5" />
                    <span>Cancel</span>
                </button>
                <GradientButton onClick={() => speak("Confirming SOS")} gradient="from-red-500 to-orange-500">
                    <Icon name="send" className="w-5 h-5" />
                    <span>Confirm</span>
                </GradientButton>
            </div>
        </div>
    </ModalWrapper>
);


// --- MAIN PAGE COMPONENTS (NEW FLOW) ---

const HomePage = ({ onRoleSelect }) => {
 // SVG components for the background, inspired by the reference image
 const StethoscopeIcon = ({ className }) => (<svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2"><path d="M32 40C41.9411 40 50 31.9411 50 22C50 12.0589 41.9411 4 32 4C22.0589 4 14 12.0589 14 22C14 27.3452 16.4438 32.0623 20.1794 35.343M32 40V60M32 60H40M32 60H24"/><circle cx="14" cy="22" r="4" stroke="currentColor" fill="currentColor"/></svg>);
 const PillIcon = ({ className }) => (<svg className={className} viewBox="0 0 64 64" fill="none"><path d="M20 28L36 44M44 20L28 36" stroke="currentColor" strokeWidth="2"/><path d="M48 28C48 39.0457 39.0457 48 28 48C16.9543 48 8 39.0457 8 28C8 16.9543 16.9543 8 28 8C39.0457 8 48 16.9543 48 28Z" stroke="currentColor" strokeWidth="2"/></svg>);
 const PlusIcon = ({ className }) => (<svg className={className} viewBox="0 0 64 64" fill="currentColor"><path d="M32 12V52M12 32H52" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>);
 const HeartbeatIcon = ({ className }) => (<svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 32H20L26 18L38 46L44 32H56"/><path d="M32 54C20.9543 54 12 45.0457 12 34C12 22.9543 20.9543 14 32 14C43.0457 14 52 22.9543 52 34C52 40.4516 48.0455 46.0353 42.4202 49.3373" stroke="currentColor" strokeWidth="1.5"/></svg>);

 return (
    <div className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center p-6 bg-sky-50">
        {/* Background pattern container */}
        <div className="absolute inset-0 z-0 opacity-60">
            <PlusIcon className="absolute -top-2 -left-3 w-20 h-20 text-sky-200/80 rotate-12"/>
            <StethoscopeIcon className="absolute top-5 right-5 w-28 h-28 text-sky-200/80 -rotate-12"/>
            <PillIcon className="absolute top-1/3 left-10 w-24 h-24 text-sky-200/80 rotate-45"/>
            <HeartbeatIcon className="absolute bottom-1/4 right-10 w-32 h-32 text-sky-200/80 rotate-12"/>
            <PlusIcon className="absolute -bottom-5 -right-5 w-24 h-24 text-sky-200/80 -rotate-45"/>
            <PillIcon className="absolute bottom-10 left-2 w-16 h-16 text-sky-200/80 rotate-12"/>
            <div className="absolute top-1/4 left-1/2 w-3 h-3 bg-sky-200/80 rounded-full"></div>
            <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-sky-200/80 rounded-full"></div>
            <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-sky-200/80 rounded-full"></div>
        </div>

        {/* Foreground content */}
        <div className="relative z-10 text-center w-full">
            <div className="mb-12">
                <h1 className="text-7xl font-bold text-sky-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                    MYPILL
                </h1>
            </div>
            <div className="w-full max-w-sm mx-auto space-y-6">
                <div onClick={() => onRoleSelect('patient')} className="p-8 bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg border border-white/40 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <h3 className="text-2xl font-bold text-sky-900">PATIENT</h3>
                    <p className="text-sky-700 mt-1">Access your personal health dashboard.</p>
                </div>
                <div onClick={() => onRoleSelect('caretaker')} className="p-8 bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg border border-white/40 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <h3 className="text-2xl font-bold text-sky-900">CARETAKER</h3>
                    <p className="text-sky-700 mt-1">Manage and assist your loved ones.</p>
                </div>
            </div>
        </div>
    </div>
 );
};

const LoginPage = ({ onLogin, onBack, role }) => {
 const [name, setName] = useState('');
 const [phone, setPhone] = useState('');

 const handleLogin = (e) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
        onLogin(name);
    }
 };

 const patientBg = "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop')";
 const caretakerBg = "url('https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=2078&auto=format&fit=crop')";

 const backgroundStyle = {
     backgroundImage: role === 'patient' ? patientBg : caretakerBg,
 };

 return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-cover bg-center relative" style={backgroundStyle}>
        <div className="absolute inset-0 bg-black/40"></div>
        <button onClick={onBack} className="absolute top-6 left-6 flex items-center gap-2 px-3 py-2 rounded-full text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors">
            <Icon name="arrow-left" className="w-5 h-5" />
            <span className="font-semibold">Back</span>
        </button>
        <div className="relative z-10 text-center mb-12">
            <h1 className="text-5xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                {role === 'patient' ? 'Patient Login' : 'Caretaker Login'}
            </h1>
            <p className="text-white/80 font-light mt-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Enter your details to continue</p>
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

const DashboardHeader = ({ isDarkMode, onToggleDarkMode, isAccessibilityMode, onToggleAccessibility, speak, onBack, title = "MyPill", subtitle = "Your Health Dashboard" }) => (
    <header className="p-6 bg-transparent flex-shrink-0">
        <div className="flex justify-between items-center">
             <button onClick={onBack} className="flex items-center gap-2 px-3 py-2 rounded-full text-gray-800 dark:text-gray-100 bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 transition-colors">
                <Icon name="arrow-left" className="w-5 h-5" />
                <span className="font-semibold">Back</span>
             </button>
            <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100" style={{fontFamily: "'Poppins', sans-serif"}}>{title}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">{subtitle}</p>
            </div>
            <img 
                src="https://placehold.co/100x100/C7D2FE/4338CA?text=User" 
                alt="User profile" 
                className="w-12 h-12 rounded-full border-2 border-white/50 dark:border-white/20 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x100/E0E0E0/BDBDBD?text=U'; }}
            />
        </div>
        <div className="mt-4 flex justify-end items-center gap-4">
            <div onClick={() => speak(`Dark mode ${!isDarkMode ? 'on' : 'off'}`)}>
                <ToggleSwitch isEnabled={isDarkMode} onToggle={onToggleDarkMode} label="Dark" onIcon="moon" offIcon="sun" />
            </div>
            <div onClick={() => speak(`Speak mode ${!isAccessibilityMode ? 'on' : 'off'}`)}>
                <ToggleSwitch isEnabled={isAccessibilityMode} onToggle={onToggleAccessibility} label="Speak" onIcon="volume-2" offIcon="volume-x" />
            </div>
        </div>
    </header>
);

function PatientDashboard({ onBack, onNavigate }) {
    const [activeModal, setActiveModal] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isAccessibilityMode, setIsAccessibilityMode] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);
    
    const speak = (text) => {
        if (isAccessibilityMode && text) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        }
    };

    const featureCardsData = [
        { id: 'scanMedicine', icon: 'camera', color: 'text-blue-800 dark:text-blue-200', title: 'Scan Medicine' },
        { id: 'aiDiagnosis', icon: 'message-circle', color: 'text-purple-800 dark:text-purple-200', title: 'AI Diagnosis' },
        { id: 'reminders', icon: 'bell', color: 'text-green-800 dark:text-green-200', title: 'Reminders' },
        { id: 'myMedicine', icon: 'clipboard', color: 'text-yellow-800 dark:text-yellow-200', title: 'My Medicine' },
    ];
    
    const handleCardClick = (id, title) => {
        speak(title);
        if (id === 'sos') {
            setActiveModal('sos');
        } else {
            onNavigate(id); // Navigate to the respective page
        }
    };

    return (
        <div className={`h-full w-full flex flex-col transition-colors duration-500`}>
            <DashboardHeader 
                isDarkMode={isDarkMode} 
                onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                isAccessibilityMode={isAccessibilityMode}
                onToggleAccessibility={() => setIsAccessibilityMode(!isAccessibilityMode)}
                speak={speak}
                onBack={onBack}
            />
            
            <div className="px-6">
                <div className="h-px bg-black/10 dark:bg-white/10"></div>
            </div>

            <main className="p-6 flex-grow">
                <div className="grid grid-cols-2 gap-5">
                    <div onClick={() => handleCardClick('sos', 'SOS')}
                         className="col-span-2 flex flex-col items-center justify-center p-6 rounded-3xl text-white cursor-pointer bg-gradient-to-br from-red-500 to-orange-500 border border-white/30 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                        <Icon name="alert-octagon" className="w-12 h-12" />
                        <span className="mt-2 text-xl font-bold">SOS</span>
                    </div>
                    {featureCardsData.map((card) => (
                        <FeatureCard key={card.id} {...card} onClick={() => handleCardClick(card.id, card.title)} />
                    ))}
                </div>
            </main>

            <SosModal isOpen={activeModal === 'sos'} onClose={() => setActiveModal(null)} speak={speak} />
        </div>
    );
}

// --- NEW CARETAKER DASHBOARD ---
function CaretakerDashboard({ onBack, onNavigate }) {
    const [activeModal, setActiveModal] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isAccessibilityMode, setIsAccessibilityMode] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    const speak = (text) => {
        if (isAccessibilityMode && text) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        }
    };

    const featureCardsData = [
        { id: 'foodRoutine', icon: 'shopping-cart', color: 'text-orange-800 dark:text-orange-200', title: 'Food Routine' },
        { id: 'caretakerReminders', icon: 'bell', color: 'text-green-800 dark:text-green-200', title: 'Reminder' },
        { id: 'caretakerMedicine', icon: 'clipboard', color: 'text-yellow-800 dark:text-yellow-200', title: 'Medicine' },
    ];
    
    const handleCardClick = (id, title) => {
        speak(title);
        if (id === 'sos') {
            setActiveModal('sos');
        } else {
            onNavigate(id);
        }
    };

    return (
        <div className={`h-full w-full flex flex-col transition-colors duration-500`}>
            <DashboardHeader 
                isDarkMode={isDarkMode} 
                onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                isAccessibilityMode={isAccessibilityMode}
                onToggleAccessibility={() => setIsAccessibilityMode(!isAccessibilityMode)}
                speak={speak}
                onBack={onBack}
                title="Caretaker"
                subtitle="Management Dashboard"
            />
            
            <div className="px-6">
                <div className="h-px bg-black/10 dark:bg-white/10"></div>
            </div>

            <main className="p-6 flex-grow">
                <div className="grid grid-cols-2 gap-5">
                    <div onClick={() => handleCardClick('sos', 'SOS')}
                         className="col-span-2 flex flex-col items-center justify-center p-6 rounded-3xl text-white cursor-pointer bg-gradient-to-br from-red-500 to-orange-500 border border-white/30 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                        <Icon name="alert-octagon" className="w-12 h-12" />
                        <span className="mt-2 text-xl font-bold">SOS</span>
                    </div>
                    {featureCardsData.map((card) => (
                        <FeatureCard key={card.id} {...card} onClick={() => handleCardClick(card.id, card.title)} />
                    ))}
                </div>
            </main>

            <SosModal isOpen={activeModal === 'sos'} onClose={() => setActiveModal(null)} speak={speak} />
        </div>
    );
}


// --- FEATURE PAGE COMPONENTS ---

const ScanMedicinePage = ({ onBack }) => (
    <div className="h-full w-full flex flex-col">
        <PageHeader title="Scan Medicine" onBack={onBack} />
        <div className="flex-grow flex items-center justify-center text-center p-6">
            <div className="text-gray-500 dark:text-gray-400">
                <Icon name="camera" className="w-20 h-20 mx-auto" />
                <h2 className="text-2xl font-bold mt-4 text-gray-800 dark:text-gray-200">Camera Scanner</h2>
                <p className="mt-2">This feature is coming soon!</p>
            </div>
        </div>
    </div>
);

const AiDiagnosisPage = ({ onBack }) => {
    const [symptoms, setSymptoms] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDiagnosis = async () => {
        if (!symptoms.trim()) {
            setError('Please enter your symptoms.');
            return;
        }
        setIsLoading(true); setError(''); setDiagnosis('');

        const prompt = `As a medical AI assistant, provide a preliminary analysis for these symptoms: "${symptoms}". This is not a real medical diagnosis. Advise consulting a healthcare professional. Provide a brief, easy-to-understand analysis.`;

        try {
            const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
            const apiKey = "AIzaSyDpK_3elStV8l9r3MhNZHt36MreSsL9FF4"; // API Key is handled by the environment
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error("API request failed");
            const result = await response.json();
            const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
                setDiagnosis(text);
            } else { throw new Error("Invalid response from API."); }
        } catch (err) {
            setError("Sorry, an error occurred.");
        } finally { setIsLoading(false); }
    };

    return (
        <div className="h-full w-full flex flex-col">
            <PageHeader title="AI Diagnosis" onBack={onBack} />
            <main className="flex-grow p-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Describe your symptoms</h2>
                <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} className="w-full h-28 p-3 mt-2 bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-white/20 rounded-xl" placeholder="e.g., 'I have a persistent headache and a sore throat...'"></textarea>
                <GradientButton onClick={handleDiagnosis} disabled={isLoading} gradient="from-purple-500 to-indigo-600" className="mt-4">
                    {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <><Icon name="activity" className="w-5 h-5" /><span>Get Analysis</span></>}
                </GradientButton>
                {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
                {diagnosis && <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-500/30"><p className="text-gray-700 dark:text-gray-200">{diagnosis}</p></div>}
            </main>
        </div>
    );
};

const RemindersPage = ({ onBack }) => (
    <div className="h-full w-full flex flex-col">
        <PageHeader title="Reminders" onBack={onBack} />
        <div className="flex-grow flex items-center justify-center text-center p-6">
            <div className="text-gray-500 dark:text-gray-400">
                <Icon name="bell" className="w-20 h-20 mx-auto" />
                <h2 className="text-2xl font-bold mt-4 text-gray-800 dark:text-gray-200">Medicine Reminders</h2>
                <p className="mt-2">This feature is coming soon!</p>
            </div>
        </div>
    </div>
);

const MyMedicinePage = ({ onBack }) => (
    <div className="h-full w-full flex flex-col">
        <PageHeader title="My Medicine" onBack={onBack} />
        <div className="flex-grow flex items-center justify-center text-center p-6">
            <div className="text-gray-500 dark:text-gray-400">
                <Icon name="clipboard" className="w-20 h-20 mx-auto" />
                <h2 className="text-2xl font-bold mt-4 text-gray-800 dark:text-gray-200">Your Medication List</h2>
                <p className="mt-2">This feature is coming soon!</p>
            </div>
        </div>
    </div>
);

// --- NEW CARETAKER FEATURE PAGES ---
const FoodRoutinePage = ({ onBack }) => (
    <div className="h-full w-full flex flex-col">
        <PageHeader title="Food Routine" onBack={onBack} />
        <div className="flex-grow flex items-center justify-center text-center p-6">
            <div className="text-gray-500 dark:text-gray-400">
                <Icon name="shopping-cart" className="w-20 h-20 mx-auto" />
                <h2 className="text-2xl font-bold mt-4 text-gray-800 dark:text-gray-200">Patient's Food Routine</h2>
                <p className="mt-2">This feature is coming soon!</p>
            </div>
        </div>
    </div>
);

const CaretakerRemindersPage = ({ onBack }) => (
    <div className="h-full w-full flex flex-col">
        <PageHeader title="Set Reminder" onBack={onBack} />
        <div className="flex-grow flex items-center justify-center text-center p-6">
            <div className="text-gray-500 dark:text-gray-400">
                <Icon name="bell" className="w-20 h-20 mx-auto" />
                <h2 className="text-2xl font-bold mt-4 text-gray-800 dark:text-gray-200">Set Patient Reminders</h2>
                <p className="mt-2">This feature is coming soon!</p>
            </div>
        </div>
    </div>
);

const CaretakerMedicinePage = ({ onBack }) => (
    <div className="h-full w-full flex flex-col">
        <PageHeader title="Manage Medicine" onBack={onBack} />
        <div className="flex-grow flex items-center justify-center text-center p-6">
            <div className="text-gray-500 dark:text-gray-400">
                <Icon name="clipboard" className="w-20 h-20 mx-auto" />
                <h2 className="text-2xl font-bold mt-4 text-gray-800 dark:text-gray-200">Manage Patient's Medicine</h2>
                <p className="mt-2">This feature is coming soon!</p>
            </div>
        </div>
    </div>
);

const GlobalStyles = () => (
    <style>{`
        body { font-family: 'Inter', sans-serif; }
    `}</style>
);


/**
 * Main App Component
 * This component manages the overall state and renders the pages within a responsive mock device frame.
 */
function App() {
 const [page, setPage] = useState('home'); // 'home', 'login', 'patient', 'caretakerDashboard', etc.
 const [userRole, setUserRole] = useState('patient');
 const [userName, setUserName] = useState('');
 const [isTransitioning, setIsTransitioning] = useState(false);
 const screenRef = useRef(null);

 useEffect(() => {
     // This effect runs after every render and ensures Feather icons are displayed.
     if (window.feather) {
         window.feather.replace();
     }
 });

 const navigate = (nextPage) => {
    setIsTransitioning(true);
    setTimeout(() => {
        setPage(nextPage);
        setIsTransitioning(false);
        if(screenRef.current) {
            screenRef.current.scrollTop = 0;
        }
    }, 300);
 };
 
 const handleRoleSelect = (role) => {
     setUserRole(role);
     navigate('login');
 };

 const handleLogin = (name) => {
    setUserName(name);
    if (userRole === 'patient') {
        navigate('patient');
    } else {
        navigate('caretakerDashboard');
    }
 };

 const handleGoToHome = () => {
     navigate('home');
 }
 
 const handleGoToPatientDashboard = () => {
     navigate('patient');
 }
 
 const handleGoToCaretakerDashboard = () => {
     navigate('caretakerDashboard');
 }

 const renderPage = () => {
    switch (page) {
        case 'home':
            return <HomePage onRoleSelect={handleRoleSelect} />;
        case 'login':
            return <LoginPage onLogin={handleLogin} onBack={handleGoToHome} role={userRole} />;
        case 'patient':
            return <PatientDashboard onBack={handleGoToHome} onNavigate={navigate} />;
        case 'caretakerDashboard':
            return <CaretakerDashboard onBack={handleGoToHome} onNavigate={navigate} />;
        case 'scanMedicine':
            return <ScanMedicinePage onBack={handleGoToPatientDashboard} />;
        case 'aiDiagnosis':
            return <AiDiagnosisPage onBack={handleGoToPatientDashboard} />;
        case 'reminders':
            return <RemindersPage onBack={handleGoToPatientDashboard} />;
        case 'myMedicine':
            return <MyMedicinePage onBack={handleGoToPatientDashboard} />;
        case 'foodRoutine':
            return <FoodRoutinePage onBack={handleGoToCaretakerDashboard} />;
        case 'caretakerReminders':
            return <CaretakerRemindersPage onBack={handleGoToCaretakerDashboard} />;
        case 'caretakerMedicine':
            return <CaretakerMedicinePage onBack={handleGoToCaretakerDashboard} />;
        default:
            return <HomePage onRoleSelect={handleRoleSelect} />;
    }
 };

 return (
    // Main container for the whole experience
    <div className="w-full min-h-screen flex items-center justify-center sm:p-4" style={{backgroundImage: "linear-gradient(to right top, #6d327c, #485DA6, #00a1ba, #00BF98, #36C486)"}}>
        
        <GlobalStyles />

        {/* RESPONSIVE MOCK DEVICE FRAME */}
        <div className="w-full h-screen sm:h-[844px] sm:w-[390px] bg-black sm:rounded-[60px] shadow-2xl sm:p-4 sm:border-4 sm:border-gray-600">
            <div className="w-full h-full bg-gray-200 dark:bg-gray-900 sm:rounded-[44px] overflow-hidden relative transition-colors">
                {/* Mock device notch - hidden on mobile */}
                <div className="hidden sm:flex absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-black rounded-b-2xl z-20 justify-center items-end pb-1.5">
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

export default App;
