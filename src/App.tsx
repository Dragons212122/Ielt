/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  PenTool, 
  Mic2, 
  Headphones, 
  BarChart3, 
  Search, 
  Bell, 
  Settings, 
  LogOut,
  ChevronRight,
  Clock,
  Target,
  Trophy,
  ArrowRight,
  FileText,
  Layers,
  Filter,
  CheckCircle2,
  Calendar,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Screen = 'dashboard' | 'reading' | 'writing' | 'listening' | 'speaking' | 'tasks' | 'results';

interface MockExam {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  time: string;
  status: 'new' | 'completed' | 'in-progress';
}

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  time: string;
}

// --- Mock Data ---
const MOCK_EXAMS: MockExam[] = [
  { id: '1', title: 'Academic Writing Task 1', description: 'Analyze a complex line graph showing population changes.', difficulty: 'Medium', time: '20m', status: 'new' },
  { id: '2', title: 'Writing Task 2: Environment', description: 'Discuss the impact of climate change on urban planning.', difficulty: 'Hard', time: '40m', status: 'in-progress' },
  { id: '3', title: 'General Training Task 1', description: 'Write a formal letter to a landlord regarding repairs.', difficulty: 'Easy', time: '20m', status: 'completed' },
];

const TASKS: Task[] = [
  { id: 't1', title: 'Line Graph Analysis', description: 'Describe trends in birth rates across Europe.', category: 'Line Graphs', difficulty: 'Medium', time: '15m' },
  { id: 't2', title: 'Bar Chart Comparison', description: 'Compare export volumes of three major economies.', category: 'Bar Charts', difficulty: 'Easy', time: '12m' },
  { id: 't3', title: 'Process Diagram', description: 'Explain the stages of water purification.', category: 'Processes', difficulty: 'Hard', time: '20m' },
  { id: 't4', title: 'Map Evolution', description: 'Compare a village layout from 1950 and 2020.', category: 'Maps', difficulty: 'Medium', time: '18m' },
];

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex h-screen bg-[#F1F3F5] text-slate-900 font-sans overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 dot-grid opacity-[0.03] pointer-events-none" />

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 z-10">
        <div className="p-6">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-black flex items-center justify-center rounded">
              <span className="text-white text-xs">IPP</span>
            </div>
            IELTS PREP
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          <NavItem 
            active={activeScreen === 'dashboard'} 
            onClick={() => setActiveScreen('dashboard')}
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
          />
          <NavItem 
            active={activeScreen === 'reading'} 
            onClick={() => setActiveScreen('reading')}
            icon={<BookOpen size={20} />}
            label="Reading"
          />
          <NavItem 
            active={activeScreen === 'writing'} 
            onClick={() => setActiveScreen('writing')}
            icon={<PenTool size={20} />}
            label="Writing Hub"
          />
          <NavItem 
            active={activeScreen === 'listening'} 
            onClick={() => setActiveScreen('listening')}
            icon={<Headphones size={20} />}
            label="Listening"
          />
          <NavItem 
            active={activeScreen === 'speaking'} 
            onClick={() => setActiveScreen('speaking')}
            icon={<Mic2 size={20} />}
            label="Speaking"
          />
          <NavItem 
            active={activeScreen === 'results'} 
            onClick={() => setActiveScreen('results')}
            icon={<BarChart3 size={20} />}
            label="My Results"
          />
          <NavItem 
            active={activeScreen === 'tasks'} 
            onClick={() => setActiveScreen('tasks')}
            icon={<Layers size={20} />}
            label="Task Library"
          />
        </nav>

        <div className="p-4 mx-4 mb-6 glass-card bg-slate-950 text-white border-none">
          <div className="text-sm font-semibold mb-1">Pro Upgrade</div>
          <p className="text-[10px] text-slate-400 mb-3">Unlock AI-powered feedback and unlimited mock tests.</p>
          <button className="w-full py-2 bg-white text-black text-[10px] font-bold rounded hover:bg-slate-100 transition-colors">
            GO PREMIUM
          </button>
        </div>

        <div className="p-4 border-t border-slate-100 mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-200" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate">Alex Johnson</p>
              <p className="text-[10px] text-slate-500">Free Tier</p>
            </div>
            <LogOut size={16} className="text-slate-400 hover:text-slate-600 cursor-pointer" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search topics, tests, or skills..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:text-slate-800 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <button className="p-2 text-slate-500 hover:text-slate-800">
              <Settings size={20} />
            </button>
            <div className="h-8 w-px bg-slate-200 mx-1" />
            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold">Today's Goal</p>
                <p className="text-[10px] text-slate-500">45 / 60 mins</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-slate-100 p-0.5">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white text-[10px] font-bold">
                  75%
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeScreen === 'dashboard' && <DashboardView onNavigate={setActiveScreen} />}
              {activeScreen === 'writing' && <WritingHubView />}
              {activeScreen === 'tasks' && <TaskLibraryView />}
              {activeScreen === 'results' && <ResultsView />}
              {(activeScreen === 'reading' || activeScreen === 'listening' || activeScreen === 'speaking') && (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                    <Zap className="text-slate-400" size={32} />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Module Under Development</h2>
                  <p className="text-slate-500 max-w-sm">We're currently perfecting the AI experience for this section. Check back soon!</p>
                  <button 
                    onClick={() => setActiveScreen('dashboard')}
                    className="mt-6 px-6 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
                  >
                    Back to Dashboard
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Status Bar */}
        <footer className="h-8 bg-white border-t border-slate-200 flex items-center justify-between px-6 text-[10px] text-slate-400 z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              AI Engine Ready
            </div>
            <span>Vite 6.2.0</span>
          </div>
          <div className="flex items-center gap-4">
            <span>© 2024 IELTS PREP PRO</span>
            <span className="flex items-center gap-1">
              Made with <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>♥</motion.span> for Learners
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

// --- Component Fragments ---

function NavItem({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
        active 
          ? 'bg-slate-900 text-white shadow-lg' 
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
      {active && <motion.div layoutId="activeNav" className="ml-auto w-1 h-4 bg-white rounded-full" />}
    </button>
  );
}

function DashboardView({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Welcome Back, Alex.</h1>
        <p className="text-slate-500">Your current estimated band score is <span className="font-bold text-slate-900">7.5</span>. Let's aim for 8.0 today.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 bg-slate-900 text-white overflow-hidden relative group">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-2 py-1 bg-white/10 rounded text-[10px] font-bold tracking-widest uppercase mb-4">
                Recommended for you
              </div>
              <h2 className="text-2xl font-bold mb-2">Writing Task 2: Advanced Cohesion</h2>
              <p className="text-slate-400 text-sm mb-6 max-w-md">Master the art of logical flow and advanced linking devices to push your score past 7.5.</p>
              <button 
                onClick={() => onNavigate('writing')}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors"
              >
                START PRACTICE <ArrowRight size={16} />
              </button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 -mr-16 -mt-16 rounded-full blur-3xl" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <StatCard label="Listening" score="8.5" trend="+0.5" icon={<Headphones className="text-blue-500" />} />
            <StatCard label="Reading" score="7.5" trend="Stable" icon={<BookOpen className="text-green-500" />} />
            <StatCard label="Writing" score="6.5" trend="+1.0" icon={<PenTool className="text-purple-500" />} />
            <StatCard label="Speaking" score="7.0" trend="-0.5" icon={<Mic2 className="text-orange-500" />} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold">Next Mock Test</h3>
              <Calendar size={18} className="text-slate-400" />
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-sm font-bold">12</div>
                <div>
                  <p className="text-xs font-bold">Academic Full Mock #4</p>
                  <p className="text-[10px] text-slate-500">Nov 12, 09:00 AM</p>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 italic">28 students from your cohort joined this session.</p>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-bold mb-4">Skill Progress</h3>
            <div className="space-y-4">
              <ProgressBar label="Vocabulary Range" progress={82} />
              <ProgressBar label="Grammatical Accuracy" progress={65} />
              <ProgressBar label="Task Response" progress={90} />
              <ProgressBar label="Pronunciation" progress={74} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WritingHubView() {
  return (
    <div className="space-y-8">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Writing Hub</h1>
          <p className="text-slate-500">Practice your academic writing with instant AI band score evaluation.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold hover:border-slate-400 transition-all">
            <Filter size={16} /> Filter
          </button>
          <button className="px-4 py-2 bg-black text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all">
            New Draft
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassMetric label="Total Drafts" value="24" sub="Last 30 days" icon={<FileText size={20} />} />
        <GlassMetric label="Avg. Band Score" value="7.2" sub="+0.3 improvement" icon={<Target size={20} />} />
        <GlassMetric label="Writing Time" value="38m" sub="Per Task 2 avg." icon={<Clock size={20} />} />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold">Recent Mock Exams</h2>
        <div className="grid grid-cols-1 gap-4">
          {MOCK_EXAMS.map(exam => (
            <div key={exam.id} className="glass-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-400 transition-colors cursor-pointer group">
              <div className="flex items-start gap-4">
                <div className={`mt-1 p-2 rounded-lg ${
                  exam.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  exam.difficulty === 'Medium' ? 'bg-orange-100 text-orange-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-bold group-hover:text-black transition-colors">{exam.title}</h3>
                  <p className="text-xs text-slate-500 max-w-lg mb-2">{exam.description}</p>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Clock size={12} /> {exam.time}</span>
                    <span className="flex items-center gap-1"><Target size={12} /> {exam.difficulty}</span>
                    <span className={`px-2 py-0.5 rounded ${
                      exam.status === 'completed' ? 'bg-slate-100 text-slate-600' : 'bg-black text-white'
                    }`}>
                      {exam.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>
              <button className="px-6 py-2 bg-slate-950 text-white rounded-lg text-xs font-bold hover:bg-black transition-all">
                {exam.status === 'completed' ? 'REVIEW' : 'START TEST'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TaskLibraryView() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Line Graphs', 'Bar Charts', 'Pie Charts', 'Maps', 'Processes'];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Task Library</h1>
        <p className="text-slate-500">Over 200+ curated academic tasks with model answers.</p>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab ? 'bg-black text-white' : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TASKS.map(task => (
          <div key={task.id} className="glass-card overflow-hidden group">
            <div className="aspect-video bg-slate-100 flex items-center justify-center border-b border-slate-100 overflow-hidden">
               {/* Visual Placeholder */}
               <div className="w-1/2 h-1/2 border-2 border-slate-200 rounded-lg rotate-12 group-hover:rotate-0 transition-transform flex items-center justify-center">
                  <BarChart3 className="text-slate-300" size={32} />
               </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-slate-100 text-[9px] font-bold text-slate-600 rounded uppercase">{task.category}</span>
                <span className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase ${
                  task.difficulty === 'Easy' ? 'bg-green-50 text-green-600' :
                  task.difficulty === 'Medium' ? 'bg-orange-50 text-orange-600' :
                  'bg-red-50 text-red-600'
                }`}>
                  {task.difficulty}
                </span>
              </div>
              <h3 className="font-bold mb-1 truncate">{task.title}</h3>
              <p className="text-[11px] text-slate-500 mb-4 line-clamp-2">{task.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                  <Clock size={12} /> {task.time}
                </span>
                <button className="p-2 bg-slate-50 rounded-lg text-black hover:bg-black hover:text-white transition-all">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultsView() {
  return (
    <div className="space-y-8">
       <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
        <span>Performance</span>
        <ChevronRight size={12} />
        <span className="text-slate-600 font-medium">Recent Mock Full Test</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 flex flex-col items-center justify-center glass-card p-10 bg-black text-white">
          <div className="relative w-48 h-48 flex items-center justify-center mb-6">
            <svg className="w-full h-full -rotate-90">
              <circle cx="96" cy="96" r="88" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
              <circle 
                cx="96" cy="96" r="88" stroke="white" strokeWidth="8" fill="none" 
                strokeDasharray={552}
                strokeDashoffset={552 * (1 - 0.75)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-5xl font-black">7.5</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">OVERALL</span>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-1">Excellent Work!</h3>
            <p className="text-slate-400 text-xs">You've improved by 0.5 bands since last month. Focus on Reading Task 3 to hit 8.0.</p>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-bold mb-6">Section Scores</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <MiniScore label="Listening" score="8.0" color="bg-blue-500" />
              <MiniScore label="Reading" score="7.5" color="bg-green-500" />
              <MiniScore label="Writing" score="6.5" color="bg-purple-500" />
              <MiniScore label="Speaking" score="8.0" color="bg-orange-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Top Strengths</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-xs font-semibold">
                  <CheckCircle2 className="text-green-500" size={16} /> Lexical Resource
                </li>
                <li className="flex items-center gap-2 text-xs font-semibold">
                  <CheckCircle2 className="text-green-500" size={16} /> Task Response
                </li>
                <li className="flex items-center gap-2 text-xs font-semibold">
                  <CheckCircle2 className="text-green-500" size={16} /> Listening Speed
                </li>
              </ul>
            </div>
            <div className="glass-card p-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Growth Areas</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-xs font-semibold">
                  <div className="w-4 h-4 rounded-full border-2 border-orange-200" /> Complex Structures
                </li>
                <li className="flex items-center gap-2 text-xs font-semibold">
                  <div className="w-4 h-4 rounded-full border-2 border-orange-200" /> Cohesion & Coherence
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-bold">Band Score History</h3>
          <div className="flex items-center gap-4 text-[10px] font-bold">
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-black rounded-full" /> Overall</span>
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-slate-300 rounded-full" /> Target</span>
          </div>
        </div>
        <div className="h-48 flex items-end gap-4">
          {[6.0, 6.5, 6.5, 7.0, 7.5].map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full bg-slate-100 rounded-t-lg relative overflow-hidden" style={{ height: `${(val / 9) * 100}%` }}>
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: '100%' }}
                  className="w-full bg-black"
                />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  {val}
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-400">TEST {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Common UI Components ---

function StatCard({ label, score, trend, icon }: { label: string; score: string; trend: string; icon: React.ReactNode }) {
  return (
    <div className="glass-card p-4 hover:border-slate-400 transition-colors cursor-pointer">
      <div className="flex items-center justify-between mb-3">
        <span className="text-slate-400">{icon}</span>
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
          trend.startsWith('+') ? 'bg-green-100 text-green-700' : 
          trend === 'Stable' ? 'bg-slate-100 text-slate-600' : 'bg-red-100 text-red-700'
        }`}>
          {trend}
        </span>
      </div>
      <div>
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</h4>
        <p className="text-2xl font-black">{score}</p>
      </div>
    </div>
  );
}

function ProgressBar({ label, progress }: { label: string; progress: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-[10px] font-bold">
        <span>{label}</span>
        <span>{progress}%</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-black"
        />
      </div>
    </div>
  );
}

function GlassMetric({ label, value, sub, icon }: { label: string; value: string; sub: string; icon: React.ReactNode }) {
  return (
    <div className="glass-card p-6 flex items-center justify-between">
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-3xl font-black">{value}</p>
        <p className="text-[10px] text-slate-500 mt-1">{sub}</p>
      </div>
      <div className="p-3 bg-slate-50 rounded-xl text-slate-400">
        {icon}
      </div>
    </div>
  );
}

function MiniScore({ label, score, color }: { label: string; score: string; color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-bold">
        <span>{label}</span>
        <span>{score}</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${(parseFloat(score) / 9) * 100}%` }} />
      </div>
    </div>
  );
}

