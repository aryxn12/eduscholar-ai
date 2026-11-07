import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, Search, Sparkles, Filter, Calendar, Award, CheckCircle2, 
  Clock, DollarSign, ArrowRight, UserCheck, FileText, ChevronRight, 
  Plus, Trash2, Check, ExternalLink, RefreshCw, Layers, SlidersHorizontal,
  GraduationCap, Briefcase, Heart, AlertTriangle, ShieldCheck, Download,
  Compass, BarChart3, Edit3, Lock, CheckSquare, Zap, Bookmark, Star
} from 'lucide-react';

// --- INITIAL SAMPLE SCHOLARSHIPS DATA ---
const INITIAL_SCHOLARSHIPS = [
  {
    id: 'sch-1',
    title: 'Global Women in STEM Excellence Grant',
    provider: 'Tech For Future Foundation',
    amount: 12000,
    currency: '$',
    deadline: '2026-04-15',
    category: 'STEM',
    level: 'Undergraduate',
    type: 'Merit-Based',
    gpaRequirement: 3.5,
    maxIncome: 80000,
    location: 'Global',
    description: 'Empowering undergraduate women pursuing Computer Science, Engineering, or Data Science degrees.',
    matchScore: 95,
    tags: ['Women in Tech', 'STEM', 'Merit'],
    docsRequired: ['Academic Transcript', 'Statement of Purpose', '2 Letters of Recommendation', 'Proof of Enrollment'],
    steps: ['Complete Online Profile', 'Upload Certified Transcripts', 'Submit 500-word SOP', 'Final Virtual Interview']
  },
  {
    id: 'sch-2',
    title: 'NextGen Innovators Financial Aid',
    provider: 'Apex Education Trust',
    amount: 8500,
    currency: '$',
    deadline: '2026-03-30',
    category: 'Innovation & Tech',
    level: 'Undergraduate',
    type: 'Need-Based',
    gpaRequirement: 3.0,
    maxIncome: 45000,
    location: 'North America / Europe',
    description: 'Providing financial relief to talented students facing economic hardship with a passion for creative problem solving.',
    matchScore: 88,
    tags: ['Need-Based', 'Innovation', 'Undergrad'],
    docsRequired: ['Income Certificate / Tax Returns', 'Academic Transcript', 'Personal Essay'],
    steps: ['Financial Background Declaration', 'Submit Essay on Innovation', 'Faculty Endorsement']
  },
  {
    id: 'sch-3',
    title: 'Future Leaders Humanities Fellowship',
    provider: 'Global Culture & Arts Alliance',
    amount: 15000,
    currency: '$',
    deadline: '2026-05-20',
    category: 'Humanities',
    level: 'Postgraduate',
    type: 'Merit-Based',
    gpaRequirement: 3.7,
    maxIncome: 120000,
    location: 'Global',
    description: 'Supporting master & doctoral candidates conducting impactful research in Literature, History, or Philosophy.',
    matchScore: 78,
    tags: ['Humanities', 'Graduate', 'Research'],
    docsRequired: ['Research Proposal', '2 LORs', 'Academic Portfolio', 'CV'],
    steps: ['Submit Abstract', 'Faculty Review Committee', 'Full Proposal Submission']
  },
  {
    id: 'sch-4',
    title: 'Underrepresented Tech Founders Scholarship',
    provider: 'Venture Forward Org',
    amount: 10000,
    currency: '$',
    deadline: '2026-03-25',
    category: 'Entrepreneurship',
    level: 'Undergraduate',
    type: 'Hybrid',
    gpaRequirement: 2.8,
    maxIncome: 65000,
    location: 'Global',
    description: 'For aspiring student entrepreneurs working on tech solutions for underserved communities.',
    matchScore: 91,
    tags: ['Entrepreneurship', 'Minority', 'Tech'],
    docsRequired: ['Pitch Deck (5 Slides)', 'Video Pitch (2 mins)', 'Transcript', 'Financial Need Statement'],
    steps: ['Submit Pitch Video', 'Review by Mentors', 'Live Demo Day Presentation']
  },
  {
    id: 'sch-5',
    title: 'Clean Energy & Climate Action Award',
    provider: 'EcoHorizon Institute',
    amount: 6000,
    currency: '$',
    deadline: '2026-06-10',
    category: 'Environmental Science',
    level: 'Undergraduate',
    type: 'Merit-Based',
    gpaRequirement: 3.2,
    maxIncome: 90000,
    location: 'Global',
    description: 'Encouraging youth engaged in renewable energy research, sustainability projects, and climate policy.',
    matchScore: 82,
    tags: ['CleanTech', 'Sustainability', 'Green Science'],
    docsRequired: ['Project Summary', 'Transcript', '1 Faculty Reference Letter'],
    steps: ['Project Document Submission', 'Peer Review', 'Award Announcement']
  },
  {
    id: 'sch-6',
    title: 'Community Upliftment Equity Support',
    provider: 'Beacon Foundation',
    amount: 5000,
    currency: '$',
    deadline: '2026-04-05',
    category: 'Social Work',
    level: 'Undergraduate',
    type: 'Need-Based',
    gpaRequirement: 2.5,
    maxIncome: 35000,
    location: 'Global',
    description: 'Designed for students demonstrating strong involvement in local community organizing and volunteering.',
    matchScore: 85,
    tags: ['Community Service', 'Need-Based', 'Social Impact'],
    docsRequired: ['Community Service Verification Log', 'Personal Statement', 'Income Proof'],
    steps: ['Submit Hours Verification', 'Personal Statement Upload', 'Verification Call']
  }
];

// --- APP ENTRY POINT ---
export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('discover');

  // User Profile State
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('eduscholar_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Alex Rivera',
      gpa: '3.6',
      level: 'Undergraduate',
      field: 'STEM',
      annualIncome: 45000,
      gender: 'Female',
      isFirstGen: true,
      country: 'North America / Europe'
    };
  });

  // Saved / Tracker Applications State
  const [trackerItems, setTrackerItems] = useState(() => {
    const saved = localStorage.getItem('eduscholar_tracker');
    return saved ? JSON.parse(saved) : [
      { id: 'sch-1', status: 'In Progress', addedDate: '2026-02-10', notes: 'Drafting SOP' },
      { id: 'sch-4', status: 'Saved', addedDate: '2026-02-12', notes: 'Need pitch video' },
      { id: 'sch-2', status: 'Submitted', addedDate: '2026-01-20', notes: 'Awaiting response' }
    ];
  });

  // Readiness Documents Checklist State
  const [docVault, setDocVault] = useState(() => {
    const saved = localStorage.getItem('eduscholar_docs');
    return saved ? JSON.parse(saved) : {
      'Academic Transcript': true,
      'Statement of Purpose': false,
      '2 Letters of Recommendation': true,
      'Income Certificate / Tax Returns': false,
      'Resume / CV': true,
      'Proof of Enrollment': true
    };
  });

  // Selected Scholarship for Modal
  const [selectedModalSch, setSelectedModalSch] = useState(null);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('eduscholar_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('eduscholar_tracker', JSON.stringify(trackerItems));
  }, [trackerItems]);

  useEffect(() => {
    localStorage.setItem('eduscholar_docs', JSON.stringify(docVault));
  }, [docVault]);

  // Handle Dynamic Match Score Recalculation
  const scholarshipsWithScores = useMemo(() => {
    return INITIAL_SCHOLARSHIPS.map(sch => {
      let score = 70; // baseline
      
      // GPA Match
      const userGPA = parseFloat(userProfile.gpa) || 0;
      if (userGPA >= sch.gpaRequirement) score += 12;
      else score -= 15;

      // Category Match
      if (userProfile.field.toLowerCase() === sch.category.toLowerCase() || sch.category === 'STEM' && userProfile.field === 'STEM') {
        score += 10;
      }

      // Financial Need Match
      if (sch.type === 'Need-Based' || sch.type === 'Hybrid') {
        if (userProfile.annualIncome <= sch.maxIncome) score += 8;
      }

      // Level Match
      if (userProfile.level === sch.level) score += 5;

      const finalScore = Math.min(Math.max(score, 45), 99);
      return { ...sch, dynamicMatchScore: finalScore };
    });
  }, [userProfile]);

  // Calculations for Stat Banner
  const totalFundingValue = useMemo(() => {
    return trackerItems.reduce((acc, item) => {
      const sch = scholarshipsWithScores.find(s => s.id === item.id);
      return acc + (sch ? sch.amount : 0);
    }, 0);
  }, [trackerItems, scholarshipsWithScores]);

  const upcomingDeadlineCount = useMemo(() => {
    return scholarshipsWithScores.filter(s => {
      const days = Math.ceil((new Date(s.deadline) - new Date()) / (1000 * 60 * 60 * 24));
      return days > 0 && days <= 30;
    }).length;
  }, [scholarshipsWithScores]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('discover')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                EduScholar AI
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Hackathon Edition
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-1 bg-slate-800/60 p-1.5 rounded-xl border border-slate-700/50">
            <NavBtn icon={<Compass className="w-4 h-4" />} label="Discover" active={activeTab === 'discover'} onClick={() => setActiveTab('discover')} />
            <NavBtn icon={<SlidersHorizontal className="w-4 h-4" />} label="Matchmaker" active={activeTab === 'matchmaker'} onClick={() => setActiveTab('matchmaker')} />
            <NavBtn icon={<Layers className="w-4 h-4" />} label="Tracker" active={activeTab === 'tracker'} onClick={() => setActiveTab('tracker')} count={trackerItems.length} />
            <NavBtn icon={<Sparkles className="w-4 h-4" />} label="SOP Assistant" active={activeTab === 'sop'} onClick={() => setActiveTab('sop')} />
            <NavBtn icon={<Calendar className="w-4 h-4" />} label="Deadlines" active={activeTab === 'calendar'} onClick={() => setActiveTab('calendar')} />
          </nav>

          {/* Quick Profile Summary Button */}
          <button 
            onClick={() => setActiveTab('matchmaker')} 
            className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-xl text-sm transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
              {userProfile.name.charAt(0)}
            </div>
            <span className="hidden lg:inline font-medium text-xs text-slate-300">{userProfile.name}</span>
            <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-md font-semibold">
              GPA {userProfile.gpa}
            </span>
          </button>
        </div>

        {/* Mobile Navigation Bar (Bottom Tabs) */}
        <div className="md:hidden flex justify-around border-t border-slate-800 bg-slate-900/90 py-2 px-1">
          <MobileNavBtn icon={<Compass className="w-5 h-5" />} label="Discover" active={activeTab === 'discover'} onClick={() => setActiveTab('discover')} />
          <MobileNavBtn icon={<SlidersHorizontal className="w-5 h-5" />} label="Match" active={activeTab === 'matchmaker'} onClick={() => setActiveTab('matchmaker')} />
          <MobileNavBtn icon={<Layers className="w-5 h-5" />} label="Tracker" active={activeTab === 'tracker'} onClick={() => setActiveTab('tracker')} />
          <MobileNavBtn icon={<Sparkles className="w-5 h-5" />} label="SOP" active={activeTab === 'sop'} onClick={() => setActiveTab('sop')} />
          <MobileNavBtn icon={<Calendar className="w-5 h-5" />} label="Deadlines" active={activeTab === 'calendar'} onClick={() => setActiveTab('calendar')} />
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* Dynamic Header Quick Stats Banner */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <StatCard 
            icon={<Award className="w-5 h-5 text-indigo-400" />}
            title="Eligible Scholarships"
            value={scholarshipsWithScores.length.toString()}
            subtitle="Based on your profile"
            bgColor="bg-indigo-950/40"
            borderColor="border-indigo-800/40"
          />
          <StatCard 
            icon={<DollarSign className="w-5 h-5 text-emerald-400" />}
            title="Potential Funding"
            value={`$${totalFundingValue.toLocaleString()}`}
            subtitle="Saved in tracker"
            bgColor="bg-emerald-950/40"
            borderColor="border-emerald-800/40"
          />
          <StatCard 
            icon={<Clock className="w-5 h-5 text-amber-400" />}
            title="Urgent Deadlines"
            value={upcomingDeadlineCount.toString()}
            subtitle="Closing within 30 days"
            bgColor="bg-amber-950/40"
            borderColor="border-amber-800/40"
          />
          <StatCard 
            icon={<Zap className="w-5 h-5 text-pink-400" />}
            title="Top Match Score"
            value={`${Math.max(...scholarshipsWithScores.map(s => s.dynamicMatchScore))}%`}
            subtitle="Highest compatibility"
            bgColor="bg-pink-950/40"
            borderColor="border-pink-800/40"
          />
        </section>

        {/* TAB 1: DISCOVER SCHOLARSHIPS */}
        {activeTab === 'discover' && (
          <DiscoverSection 
            scholarships={scholarshipsWithScores}
            userProfile={userProfile}
            trackerItems={trackerItems}
            onToggleSave={(sch) => {
              setTrackerItems(prev => {
                const exists = prev.find(item => item.id === sch.id);
                if (exists) {
                  return prev.filter(item => item.id !== sch.id);
                } else {
                  return [...prev, { id: sch.id, status: 'Saved', addedDate: new Date().toISOString().split('T')[0], notes: '' }];
                }
              });
            }}
            onViewDetails={(sch) => setSelectedModalSch(sch)}
            onOpenMatchmaker={() => setActiveTab('matchmaker')}
          />
        )}

        {/* TAB 2: SMART MATCHMAKER & PROFILE BUILDER */}
        {activeTab === 'matchmaker' && (
          <MatchmakerSection 
            userProfile={userProfile}
            onUpdateProfile={(updated) => setUserProfile(updated)}
            scholarships={scholarshipsWithScores}
            onNavigateDiscover={() => setActiveTab('discover')}
          />
        )}

        {/* TAB 3: APPLICATION TRACKER & KANBAN */}
        {activeTab === 'tracker' && (
          <TrackerSection 
            trackerItems={trackerItems}
            setTrackerItems={setTrackerItems}
            scholarships={scholarshipsWithScores}
            docVault={docVault}
            setDocVault={setDocVault}
            onOpenSOP={() => setActiveTab('sop')}
          />
        )}

        {/* TAB 4: SOP / ESSAY AI ASSISTANT */}
        {activeTab === 'sop' && (
          <SopAssistantSection scholarships={scholarshipsWithScores} userProfile={userProfile} />
        )}

        {/* TAB 5: CALENDAR & DEADLINE TIMELINE */}
        {activeTab === 'calendar' && (
          <CalendarSection scholarships={scholarshipsWithScores} trackerItems={trackerItems} />
        )}

      </main>

      {/* SCHOLARSHIP DETAIL MODAL */}
      {selectedModalSch && (
        <DetailModal 
          scholarment={selectedModalSch} 
          docVault={docVault}
          isSaved={trackerItems.some(item => item.id === selectedModalSch.id)}
          onClose={() => setSelectedModalSch(null)}
          onToggleSave={() => {
            setTrackerItems(prev => {
              const exists = prev.find(item => item.id === selectedModalSch.id);
              if (exists) return prev.filter(item => item.id !== selectedModalSch.id);
              return [...prev, { id: selectedModalSch.id, status: 'Saved', addedDate: new Date().toISOString().split('T')[0], notes: '' }];
            });
          }}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/40 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500">
          <p>© 2026 EduScholar AI — Hackathon Submission for "Rethinking the Scholarship Experience"</p>
          <p className="mt-1">Designed for student accessibility, dynamic score calculation & intuitive application management.</p>
        </div>
      </footer>
    </div>
  );
}

// ==================== NAV BUTTONS ====================
function NavBtn({ icon, label, active, onClick, count }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
        active 
          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/40'
      }`}
    >
      {icon}
      <span>{label}</span>
      {count !== undefined && (
        <span className={`text-xs px-1.5 py-0.2 rounded-full font-bold ${active ? 'bg-indigo-800 text-white' : 'bg-slate-700 text-slate-300'}`}>
          {count}
        </span>
      )}
    </button>
  );
}

function MobileNavBtn({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center py-1 px-2 rounded-lg text-xs font-medium transition-all ${
        active ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
      }`}
    >
      {icon}
      <span className="mt-0.5">{label}</span>
    </button>
  );
}

// ==================== STAT CARD ====================
function StatCard({ icon, title, value, subtitle, bgColor, borderColor }) {
  return (
    <div className={`p-4 rounded-2xl border backdrop-blur-md ${bgColor} ${borderColor} flex flex-col justify-between`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-slate-400 font-medium">{title}</span>
        <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/50">
          {icon}
        </div>
      </div>
      <div>
        <div className="text-2xl font-black text-white tracking-tight">{value}</div>
        <div className="text-[11px] text-slate-400 mt-0.5">{subtitle}</div>
      </div>
    </div>
  );
}

// ==================== SECTION 1: DISCOVER SCHOLARSHIPS ====================
function DiscoverSection({ scholarships, userProfile, trackerItems, onToggleSave, onViewDetails, onOpenMatchmaker }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('match');

  // Filter Logic
  const filteredScholarships = useMemo(() => {
    return scholarships.filter(sch => {
      const matchesSearch = sch.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            sch.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            sch.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesLevel = selectedLevel === 'All' || sch.level === selectedLevel;
      const matchesCategory = selectedCategory === 'All' || sch.category === selectedCategory;
      const matchesType = selectedType === 'All' || sch.type === selectedType;

      return matchesSearch && matchesLevel && matchesCategory && matchesType;
    }).sort((a, b) => {
      if (sortBy === 'match') return b.dynamicMatchScore - a.dynamicMatchScore;
      if (sortBy === 'amount') return b.amount - a.amount;
      if (sortBy === 'deadline') return new Date(a.deadline) - new Date(b.deadline);
      return 0;
    });
  }, [scholarships, searchTerm, selectedLevel, selectedCategory, selectedType, sortBy]);

  return (
    <div className="space-y-6">
      {/* Banner Pitch */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-purple-900/40 border border-indigo-500/20 p-6 sm:p-8">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Matchmaker Active</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            Personalized Education Grants, Matched to Your Profile.
          </h2>
          <p className="text-slate-300 text-sm">
            We continuously match your profile with over $500K+ in active funding opportunities. Filter, save, and launch application drafts with zero friction.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button 
              onClick={onOpenMatchmaker} 
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition-all"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Refine Profile Criteria</span>
            </button>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-10 translate-y-10">
          <GraduationCap className="w-96 h-96 text-indigo-400" />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-3 backdrop-blur-md">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, provider, or skill tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-sm text-slate-200 pl-10 pr-4 py-2.5 rounded-xl outline-none transition-all placeholder:text-slate-500"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-3 top-3 text-xs text-slate-400 hover:text-white">Clear</button>
            )}
          </div>

          {/* Quick Filter Selects */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2.5 outline-none focus:border-indigo-500"
            >
              <option value="All">All Categories</option>
              <option value="STEM">STEM</option>
              <option value="Innovation & Tech">Innovation & Tech</option>
              <option value="Humanities">Humanities</option>
              <option value="Entrepreneurship">Entrepreneurship</option>
              <option value="Environmental Science">Environmental Science</option>
              <option value="Social Work">Social Work</option>
            </select>

            <select 
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2.5 outline-none focus:border-indigo-500"
            >
              <option value="All">All Types</option>
              <option value="Merit-Based">Merit-Based</option>
              <option value="Need-Based">Need-Based</option>
              <option value="Hybrid">Hybrid</option>
            </select>

            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs text-indigo-300 rounded-xl px-3 py-2.5 outline-none focus:border-indigo-500 font-medium"
            >
              <option value="match">Sort: Match Score</option>
              <option value="amount">Sort: Amount (High to Low)</option>
              <option value="deadline">Sort: Urgent Deadline</option>
            </select>
          </div>
        </div>
      </div>

      {/* Scholarship Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredScholarships.map(sch => {
          const isSaved = trackerItems.some(item => item.id === sch.id);
          const daysLeft = Math.ceil((new Date(sch.deadline) - new Date()) / (1000 * 60 * 60 * 24));

          return (
            <div 
              key={sch.id}
              className="bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-indigo-500/5 group"
            >
              <div>
                {/* Header Badge Row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1.5">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                      sch.dynamicMatchScore >= 85 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                        : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                    }`}>
                      {sch.dynamicMatchScore}% Match
                    </span>
                    <span className="text-[11px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md">
                      {sch.type}
                    </span>
                  </div>

                  <button 
                    onClick={() => onToggleSave(sch)}
                    className={`p-2 rounded-xl border transition-all ${
                      isSaved 
                        ? 'bg-pink-500/20 border-pink-500/40 text-pink-400' 
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                    title={isSaved ? "Saved to Tracker" : "Save Opportunity"}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-pink-400' : ''}`} />
                  </button>
                </div>

                {/* Title & Organization */}
                <h3 className="font-bold text-slate-100 text-lg group-hover:text-indigo-300 transition-colors line-clamp-2">
                  {sch.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-medium">{sch.provider}</p>

                {/* Award Amount */}
                <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-medium block">Award Value</span>
                    <span className="text-xl font-black text-emerald-400">{sch.currency}{sch.amount.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 font-medium block">Deadline</span>
                    <span className={`text-xs font-bold ${daysLeft <= 30 ? 'text-amber-400' : 'text-slate-300'}`}>
                      {daysLeft > 0 ? `${daysLeft} days left` : 'Closed'}
                    </span>
                  </div>
                </div>

                {/* Description Snippet */}
                <p className="text-xs text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                  {sch.description}
                </p>

                {/* Eligibility Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {sch.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center space-x-2">
                <button 
                  onClick={() => onViewDetails(sch)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2.5 rounded-xl transition-all text-center"
                >
                  View Details
                </button>
                <button 
                  onClick={() => onToggleSave(sch)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isSaved 
                      ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-300' 
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
                  }`}
                >
                  {isSaved ? 'Tracked' : 'Quick Save'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredScholarships.length === 0 && (
        <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800">
          <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-slate-300 font-bold text-base">No scholarships match your filters</h3>
          <p className="text-slate-500 text-xs mt-1">Try relaxing your search term or category filters.</p>
        </div>
      )}
    </div>
  );
}

// ==================== SECTION 2: MATCHMAKER & PROFILE BUILDER ====================
function MatchmakerSection({ userProfile, onUpdateProfile, scholarships, onNavigateDiscover }) {
  const [formData, setFormData] = useState(userProfile);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Profile Builder Form */}
      <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl backdrop-blur-md">
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-800">
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Smart Matchmaker Profile</h2>
            <p className="text-xs text-slate-400">Update your credentials to dynamically recalculate grant eligibility.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Student Name */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-sm text-slate-200 px-3 py-2.5 rounded-xl outline-none"
                required
              />
            </div>

            {/* Current GPA */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Cumulative GPA (Scale 4.0)</label>
              <input 
                type="number" 
                step="0.1"
                max="4.0"
                min="0.0"
                value={formData.gpa}
                onChange={(e) => setFormData({...formData, gpa: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-sm text-slate-200 px-3 py-2.5 rounded-xl outline-none"
                required
              />
            </div>

            {/* Academic Level */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Education Level</label>
              <select 
                value={formData.level}
                onChange={(e) => setFormData({...formData, level: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-sm text-slate-200 px-3 py-2.5 rounded-xl outline-none"
              >
                <option value="High School Senior">High School Senior</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
                <option value="Doctoral Candidate">Doctoral Candidate</option>
              </select>
            </div>

            {/* Field of Study */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Primary Field of Study</label>
              <select 
                value={formData.field}
                onChange={(e) => setFormData({...formData, field: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-sm text-slate-200 px-3 py-2.5 rounded-xl outline-none"
              >
                <option value="STEM">STEM (Tech, Science, Eng)</option>
                <option value="Innovation & Tech">Innovation & Tech</option>
                <option value="Humanities">Humanities & Arts</option>
                <option value="Entrepreneurship">Business & Entrepreneurship</option>
                <option value="Environmental Science">Environmental Science</option>
                <option value="Social Work">Social Work / Public Policy</option>
              </select>
            </div>

            {/* Annual Household Income */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Annual Family Income ($ USD)</label>
              <input 
                type="number" 
                value={formData.annualIncome}
                onChange={(e) => setFormData({...formData, annualIncome: Number(e.target.value)})}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-sm text-slate-200 px-3 py-2.5 rounded-xl outline-none"
              />
            </div>

            {/* Region / Location */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Region / Country</label>
              <input 
                type="text" 
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-sm text-slate-200 px-3 py-2.5 rounded-xl outline-none"
              />
            </div>

          </div>

          {/* Demographics Checkbox Options */}
          <div className="pt-3 flex items-center space-x-6 border-t border-slate-800/80">
            <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
              <input 
                type="checkbox" 
                checked={formData.isFirstGen}
                onChange={(e) => setFormData({...formData, isFirstGen: e.target.checked})}
                className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500"
              />
              <span>First-Generation College Student</span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex items-center space-x-3">
            <button 
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Recalculate Eligibility Scores</span>
            </button>
            {isSaved && (
              <span className="text-xs text-emerald-400 font-medium flex items-center space-x-1">
                <Check className="w-4 h-4" />
                <span>Profile synchronized successfully!</span>
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Dynamic Compatibility Overview Side Box */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-100 mb-2">Live Match Preview</h3>
          <p className="text-xs text-slate-400 mb-4">Top 3 grants aligned with your updated profile parameters:</p>

          <div className="space-y-3">
            {scholarships.slice(0, 3).map(sch => (
              <div key={sch.id} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-slate-200 line-clamp-1">{sch.title}</h4>
                  <span className="text-[10px] text-slate-400">{sch.currency}{sch.amount.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-400">{sch.dynamicMatchScore}% Match</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={onNavigateDiscover} 
          className="mt-6 w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2.5 rounded-xl border border-slate-700 flex items-center justify-center space-x-2 transition-all"
        >
          <span>Explore All Matched Grants</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}

// ==================== SECTION 3: APPLICATION TRACKER & KANBAN ====================
function TrackerSection({ trackerItems, setTrackerItems, scholarships, docVault, setDocVault, onOpenSOP }) {
  const columns = ['Saved', 'In Progress', 'Submitted', 'Awarded'];

  // Calculate Document Vault Completion Rate
  const totalDocs = Object.keys(docVault).length;
  const completedDocs = Object.values(docVault).filter(Boolean).length;
  const docProgressPercent = Math.round((completedDocs / totalDocs) * 100);

  // Move status handler
  const handleStatusChange = (schId, newStatus) => {
    setTrackerItems(prev => prev.map(item => item.id === schId ? { ...item, status: newStatus } : item));
  };

  const handleRemove = (schId) => {
    setTrackerItems(prev => prev.filter(item => item.id !== schId));
  };

  return (
    <div className="space-y-6">
      
      {/* Top Document Readiness Vault Widget */}
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold text-slate-100 text-base">Document Readiness Vault</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Keep core scholarship documents verified to apply instantly.</p>
          </div>
          
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="w-full sm:w-36 bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-500"
                style={{ width: `${docProgressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-emerald-400 whitespace-nowrap">{docProgressPercent}% Ready</span>
          </div>
        </div>

        {/* Checklist Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {Object.entries(docVault).map(([docName, isDone]) => (
            <button 
              key={docName}
              onClick={() => setDocVault(prev => ({ ...prev, [docName]: !prev[docName] }))}
              className={`p-2.5 rounded-xl border text-xs text-left transition-all flex items-center justify-between ${
                isDone 
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' 
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="line-clamp-1 text-[11px] font-medium">{docName}</span>
              <CheckSquare className={`w-3.5 h-3.5 flex-shrink-0 ml-1 ${isDone ? 'text-emerald-400' : 'text-slate-600'}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Board Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-100">Application Pipeline</h2>
        <span className="text-xs text-slate-400 font-medium">Click column arrows to update progress</span>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {columns.map(columnStatus => {
          const itemsInCol = trackerItems.filter(item => item.status === columnStatus);

          return (
            <div key={columnStatus} className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 flex flex-col min-h-[350px]">
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{columnStatus}</span>
                <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-semibold">
                  {itemsInCol.length}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {itemsInCol.map(item => {
                  const sch = scholarships.find(s => s.id === item.id);
                  if (!sch) return null;

                  return (
                    <div key={item.id} className="bg-slate-950/90 border border-slate-800 p-3.5 rounded-xl space-y-2.5 shadow-md">
                      <div className="flex items-start justify-between">
                        <h4 className="text-xs font-bold text-slate-200 line-clamp-2">{sch.title}</h4>
                        <button onClick={() => handleRemove(item.id)} className="text-slate-600 hover:text-rose-400 text-xs ml-1">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-emerald-400 font-semibold">{sch.currency}{sch.amount.toLocaleString()}</div>

                      {/* Notes Input */}
                      <input 
                        type="text" 
                        placeholder="Add quick note..."
                        value={item.notes || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setTrackerItems(prev => prev.map(i => i.id === item.id ? { ...i, notes: val } : i));
                        }}
                        className="w-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300 px-2 py-1 rounded outline-none focus:border-indigo-500"
                      />

                      {/* Action Controls */}
                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                        <button 
                          onClick={onOpenSOP}
                          className="text-[10px] text-indigo-400 hover:underline flex items-center space-x-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Generate SOP</span>
                        </button>

                        <div className="flex items-center space-x-1">
                          {columnStatus !== 'Saved' && (
                            <button 
                              onClick={() => {
                                const idx = columns.indexOf(columnStatus);
                                handleStatusChange(item.id, columns[idx - 1]);
                              }}
                              className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px]"
                              title="Move Back"
                            >
                              ←
                            </button>
                          )}
                          {columnStatus !== 'Awarded' && (
                            <button 
                              onClick={() => {
                                const idx = columns.indexOf(columnStatus);
                                handleStatusChange(item.id, columns[idx + 1]);
                              }}
                              className="p-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px]"
                              title="Advance Next Stage"
                            >
                              →
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {itemsInCol.length === 0 && (
                  <div className="h-28 flex items-center justify-center border border-dashed border-slate-800/60 rounded-xl text-[11px] text-slate-600">
                    No opportunities here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

// ==================== SECTION 4: SOP / ESSAY AI ASSISTANT ====================
function SopAssistantSection({ scholarships, userProfile }) {
  const [selectedSchId, setSelectedSchId] = useState(scholarships[0]?.id || '');
  const [careerGoals, setCareerGoals] = useState('Build accessible AI solutions for healthcare & climate tech.');
  const [keyAchievement, setKeyAchievement] = useState('Led a university tech team to win 1st place in regional hackathon.');
  const [generatedOutline, setGeneratedOutline] = useState(null);

  const selectedSch = scholarships.find(s => s.id === selectedSchId);

  const handleGenerate = () => {
    if (!selectedSch) return;

    setGeneratedOutline({
      hook: `As a ${userProfile.level} student specializing in ${userProfile.field}, receiving the ${selectedSch.title} would directly accelerate my ambition to ${careerGoals}`,
      background: `Highlighting academic consistency with a ${userProfile.gpa} GPA and key initiative: "${keyAchievement}". Emphasize leadership, resilience, and passion for continuous learning.`,
      alignment: `The mission of ${selectedSch.provider} closely aligns with my dedication to driving high impact in ${selectedSch.category}.`,
      actionPlan: `1. Utilize the ${selectedSch.currency}${selectedSch.amount.toLocaleString()} grant to cover core academic tuition & lab resources.\n2. Expand current research deliverables.\n3. Give back by mentoring junior students in ${userProfile.field}.`,
      conclusion: `Express sincere gratitude to the committee at ${selectedSch.provider} for investing in scholars committed to long-term societal progress.`
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Input Parameters Box */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl backdrop-blur-md space-y-4">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
          <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AI Statement of Purpose Outliner</h2>
            <p className="text-xs text-slate-400">Generate a tailored, high-converting essay outline for any targeted grant.</p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Target Scholarship</label>
          <select 
            value={selectedSchId} 
            onChange={(e) => setSelectedSchId(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-sm text-slate-200 p-3 rounded-xl outline-none focus:border-indigo-500"
          >
            {scholarships.map(s => (
              <option key={s.id} value={s.id}>{s.title} ({s.currency}{s.amount})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Your Primary Career Goal / Vision</label>
          <textarea 
            rows="3"
            value={careerGoals}
            onChange={(e) => setCareerGoals(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 p-3 rounded-xl outline-none focus:border-indigo-500 resize-none"
            placeholder="e.g. Conduct clean energy research to reduce industrial emissions..."
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Key Achievement or Project Highlight</label>
          <textarea 
            rows="3"
            value={keyAchievement}
            onChange={(e) => setKeyAchievement(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 p-3 rounded-xl outline-none focus:border-indigo-500 resize-none"
            placeholder="e.g. Organized community computer literacy workshop for 200+ students..."
          />
        </div>

        <button 
          onClick={handleGenerate}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs sm:text-sm py-3 rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center space-x-2"
        >
          <Zap className="w-4 h-4" />
          <span>Generate Structured Outline</span>
        </button>
      </div>

      {/* Outline Output View */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
        {generatedOutline ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-slate-100 text-sm flex items-center space-x-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Tailored Outline Draft</span>
              </h3>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">Ready</span>
            </div>

            <div className="space-y-3 text-xs overflow-y-auto max-h-[420px] pr-1">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">Section 1: The Hook (Opening)</span>
                <p className="text-slate-300 leading-relaxed">{generatedOutline.hook}</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">Section 2: Academic Core & Distinction</span>
                <p className="text-slate-300 leading-relaxed">{generatedOutline.background}</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">Section 3: Alignment with Provider Values</span>
                <p className="text-slate-300 leading-relaxed">{generatedOutline.alignment}</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">Section 4: Fund Utilization Roadmap</span>
                <p className="text-slate-300 whitespace-pre-line leading-relaxed">{generatedOutline.actionPlan}</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">Section 5: Powerful Closing</span>
                <p className="text-slate-300 leading-relaxed">{generatedOutline.conclusion}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6 border border-dashed border-slate-800 rounded-xl">
            <Sparkles className="w-10 h-10 text-slate-700 mb-3" />
            <h4 className="text-slate-400 font-bold text-sm">No Outline Generated Yet</h4>
            <p className="text-slate-600 text-xs max-w-xs mt-1">Select a scholarship on the left and click "Generate Structured Outline" to build your response blueprint.</p>
          </div>
        )}

        {generatedOutline && (
          <button 
            onClick={() => alert("Outline copied to clipboard!")}
            className="mt-4 w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2.5 rounded-xl border border-slate-700 flex items-center justify-center space-x-2 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Copy Full Outline to Clipboard</span>
          </button>
        )}
      </div>

    </div>
  );
}

// ==================== SECTION 5: DEADLINE CALENDAR & TIMELINE ====================
function CalendarSection({ scholarships, trackerItems }) {
  // Compute timeline order
  const sortedByDeadline = useMemo(() => {
    return [...scholarships].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  }, [scholarships]);

  return (
    <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl backdrop-blur-md space-y-6">
      <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
          <Calendar className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Deadline Urgency Radar</h2>
          <p className="text-xs text-slate-400">Visual timeline of closing opportunities sorted by date urgency.</p>
        </div>
      </div>

      {/* Timeline Vertical Track */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
        {sortedByDeadline.map(sch => {
          const daysLeft = Math.ceil((new Date(sch.deadline) - new Date()) / (1000 * 60 * 60 * 24));
          const isSaved = trackerItems.some(item => item.id === sch.id);

          let urgencyColor = 'bg-slate-700 border-slate-600';
          let badgeBg = 'bg-slate-800 text-slate-400 border-slate-700';

          if (daysLeft <= 30) {
            urgencyColor = 'bg-amber-500 border-amber-400 shadow-lg shadow-amber-500/50';
            badgeBg = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
          } else if (daysLeft <= 60) {
            urgencyColor = 'bg-indigo-500 border-indigo-400';
            badgeBg = 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
          }

          return (
            <div key={sch.id} className="relative flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl hover:border-slate-700 transition-all">
              
              {/* Timeline Indicator Dot */}
              <div className={`absolute -left-6 top-6 w-3 h-3 rounded-full border ${urgencyColor}`} />

              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badgeBg}`}>
                    {daysLeft > 0 ? `${daysLeft} Days Remaining` : 'Deadline Passed'}
                  </span>
                  {isSaved && (
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">
                      In Your Tracker
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-slate-200 text-base">{sch.title}</h3>
                <p className="text-xs text-slate-400">{sch.provider} • {sch.category}</p>
              </div>

              <div className="mt-3 sm:mt-0 text-left sm:text-right flex sm:flex-col items-center sm:items-end justify-between">
                <div className="text-lg font-black text-emerald-400">{sch.currency}{sch.amount.toLocaleString()}</div>
                <div className="text-xs text-slate-400 font-medium">Closing: {sch.deadline}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==================== SCHOLARSHIP DETAIL MODAL ====================
function DetailModal({ scholarment, docVault, isSaved, onClose, onToggleSave }) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-5 overflow-y-auto max-h-[90vh] shadow-2xl">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              {scholarment.dynamicMatchScore}% Profile Compatibility
            </span>
            <h2 className="text-xl font-extrabold text-white mt-2">{scholarment.title}</h2>
            <p className="text-xs text-slate-400 font-medium">{scholarment.provider}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">✕</button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-3 p-3 bg-slate-950 rounded-2xl border border-slate-800 text-center">
          <div>
            <span className="text-[10px] text-slate-500 block">Award Amount</span>
            <span className="text-base font-bold text-emerald-400">{scholarment.currency}{scholarment.amount.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">Min GPA</span>
            <span className="text-base font-bold text-slate-200">{scholarment.gpaRequirement}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">Deadline</span>
            <span className="text-base font-bold text-amber-400">{scholarment.deadline}</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Opportunity Overview</h4>
          <p className="text-xs text-slate-400 leading-relaxed">{scholarment.description}</p>
        </div>

        {/* Required Documents Checklist Sync */}
        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Required Document Readiness</h4>
          <div className="space-y-2">
            {scholarment.docsRequired.map((doc, idx) => {
              const isReady = docVault[doc];
              return (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                  <span className="text-slate-300 font-medium">{doc}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isReady 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                  }`}>
                    {isReady ? 'Ready in Vault' : 'Missing'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Application Steps Timeline */}
        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Application Steps</h4>
          <div className="space-y-1.5">
            {scholarment.steps.map((step, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-xs text-slate-400">
                <span className="w-5 h-5 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-[10px] font-bold">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center space-x-3">
          <button 
            onClick={onToggleSave}
            className={`flex-1 py-3 rounded-xl text-xs font-semibold transition-all ${
              isSaved 
                ? 'bg-rose-600/20 border border-rose-500/30 text-rose-300' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
            }`}
          >
            {isSaved ? 'Remove from Application Tracker' : 'Add to Application Tracker'}
          </button>
        </div>

      </div>
    </div>
  );
}