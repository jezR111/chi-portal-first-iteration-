"use client"

import React, { useState, useEffect } from 'react';
import {
  Home,
  BookOpen,
  Mountain,
  Flower2,
  Brain,
  Target,
  BarChart3,
  Users,
  Settings,
  Menu,
  X,
  ChevronRight,
  Sun,
  Moon,
  Sparkles,
  TrendingUp,
  Award,
  Calendar,
  MessageCircle,
  Bell,
  Search,
  Plus,
  LogOut
} from 'lucide-react';

import InnerCompassAssessment from "@/components/way-of-the-self/InnerCompass";
import MountainClimb from "@/components/way-of-the-self/MountainClimb";
import GrowthGarden from "@/components/way-of-the-self/GrowthGarden";
import HermitAIGuide from "@/components/way-of-the-self/HermitGuide";
import BujoHabitTracker from "@/components/way-of-the-self/HabitTracker";
import CoreLearningLoop from "@/components/way-of-the-self/CoreLearningLoop";

// Navigation items
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'chapters', label: 'Chapters', icon: BookOpen },
  { id: 'mountain', label: 'Mountain Climb', icon: Mountain },
  { id: 'garden', label: 'Growth Garden', icon: Flower2 },
  { id: 'habits', label: 'Habit Tracker', icon: Target },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'community', label: 'Community', icon: Users }
];

// Sample user data
const SAMPLE_USER_DATA = {
  name: 'Jeremy',
  level: 3,
  xp: 2450,
  completedChapters: ['the-self', 'energy-bodies'],
  focusAreas: ['self-worth', 'boundaries', 'shadow-work'],
  currentChapter: 'inward-journey',
  overallProgress: 35,
  streak: 7,
  totalMeditations: 23,
  journalEntries: 45,
  communityKarma: 128
};

export default function WayOfSelfDashboard() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userData, setUserData] = useState(SAMPLE_USER_DATA);
  const [showOnboarding, setShowOnboarding] = useState(!userData.completedChapters.length);
  const [notifications, setNotifications] = useState(3);
  const [darkMode, setDarkMode] = useState(true);
  const [showHermit, setShowHermit] = useState(false);

  // Handle assessment completion
  const handleAssessmentComplete = (growthMap) => {
    setUserData(prev => ({
      ...prev,
      growthMap,
      focusAreas: growthMap.focusAreas
    }));
    setShowOnboarding(false);
  };

  // Calculate daily progress
  const getDailyProgress = () => {
    const tasks = [
      { name: 'Morning Meditation', completed: true },
      { name: 'Read Chapter', completed: true },
      { name: 'Journal Entry', completed: false },
      { name: 'Evening Reflection', completed: false }
    ];
    const completed = tasks.filter(t => t.completed).length;
    return { tasks, percentage: (completed / tasks.length) * 100 };
  };

  const dailyProgress = getDailyProgress();

  // Show onboarding if needed
  if (showOnboarding) {
    return <InnerCompassAssessment onComplete={handleAssessmentComplete} />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-black/30 backdrop-blur-xl border-r border-white/10`}>
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              {sidebarOpen && (
                <div>
                  <h1 className="text-lg font-bold text-white">The Way of the Self</h1>
                  <p className="text-xs text-gray-400">Transform Within</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                    currentView === item.id
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">J</span>
              </div>
              {sidebarOpen && (
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{userData.name}</p>
                  <p className="text-xs text-gray-400">Level {userData.level} • {userData.xp} XP</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-black/20 backdrop-blur-xl border-b border-white/10">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5 text-white" />
                </button>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search chapters, lessons, or community..."
                    className="pl-10 pr-4 py-2 bg-white/5 rounded-xl text-white placeholder-gray-500 outline-none focus:bg-white/10 transition-colors w-96"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Streak Counter */}
                <div className="flex items-center gap-2 bg-orange-500/20 px-3 py-1.5 rounded-full">
                  <span className="text-orange-400 font-bold text-sm">{userData.streak}</span>
                  <span className="text-2xl">🔥</span>
                </div>

                {/* Notifications */}
                <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Bell className="w-5 h-5 text-white" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full text-xs text-white flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-white" />}
                </button>

                {/* AI Guide */}
                <button
                  onClick={() => setShowHermit(!showHermit)}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                >
                  <span>🕯️</span>
                  <span className="text-white font-medium">Hermit</span>
                </button>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto">
            {currentView === 'dashboard' && (
              <DashboardView userData={userData} dailyProgress={dailyProgress} />
            )}
            {currentView === 'chapters' && (
              <ChaptersView userData={userData} />
            )}
            {currentView === 'mountain' && (
              <MountainClimb 
                chapter={{ title: 'The Inward Journey' }}
                lessons={[
                  { id: 1, title: 'Introduction', duration: '10 min' },
                  { id: 2, title: 'Meditation Basics', duration: '15 min' },
                  { id: 3, title: 'Shadow Work', duration: '20 min' }
                ]}
                completedLessons={[1]}
              />
            )}
            {currentView === 'garden' && (
              <div className="p-8">
                <GrowthGarden userData={userData} />
              </div>
            )}
            {currentView === 'habits' && (
              <div className="p-8">
                <BujoHabitTracker onDataUpdate={(data) => console.log(data)} />
              </div>
            )}
            {currentView === 'analytics' && (
              <AnalyticsView userData={userData} />
            )}
            {currentView === 'community' && (
              <CommunityView userData={userData} />
            )}
          </main>
        </div>

        {/* Hermit AI Guide */}
        {showHermit && (
          <HermitAIGuide 
            userData={userData}
            isMinimized={false}
            onToggleMinimize={() => setShowHermit(false)}
          />
        )}
      </div>
    </div>
  );
}

// Dashboard View Component
function DashboardView({ userData, dailyProgress }) {
  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Welcome back, {userData.name} ✨
        </h2>
        <p className="text-gray-400">
          You're on day {userData.streak} of your journey. Keep climbing!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={TrendingUp}
          label="Overall Progress"
          value={`${userData.overallProgress}%`}
          color="purple"
          trend="+5% this week"
        />
        <StatCard
          icon={Brain}
          label="Meditations"
          value={userData.totalMeditations}
          color="blue"
          trend="3 this week"
        />
        <StatCard
          icon={BookOpen}
          label="Journal Entries"
          value={userData.journalEntries}
          color="green"
          trend="12 this month"
        />
        <StatCard
          icon={Users}
          label="Community Karma"
          value={userData.communityKarma}
          color="pink"
          trend="+15 points"
        />
      </div>

      {/* Daily Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Journey */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Today's Journey
          </h3>
          
          <div className="space-y-4">
            {dailyProgress.tasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  {task.completed ? (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-500 rounded-full" />
                  )}
                  <span className={`${task.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                    {task.name}
                  </span>
                </div>
                {!task.completed && (
                  <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                    Start →
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Daily Completion</span>
              <span className="text-white font-medium">{Math.round(dailyProgress.percentage)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                style={{ width: `${dailyProgress.percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Focus Areas */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Your Focus Areas
          </h3>
          
          <div className="space-y-3">
            {userData.focusAreas.map((area, index) => (
              <div key={area} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  index === 0 ? 'bg-purple-400' : index === 1 ? 'bg-blue-400' : 'bg-green-400'
                }`} />
                <span className="text-gray-300 capitalize">{area.replace('-', ' ')}</span>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-xl text-purple-400 font-medium transition-colors">
            Continue Journey →
          </button>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon: Icon, label, value, color, trend }) {
  const colorClasses = {
    purple: 'from-purple-500 to-pink-500',
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    pink: 'from-pink-500 to-rose-500'
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 bg-gradient-to-br ${colorClasses[color]} rounded-xl`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className="text-xs text-gray-400">{trend}</span>
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );
}

// Chapters View
function ChaptersView({ userData }) {
  const chapters = [
    { id: 'the-self', title: 'The Self', progress: 100, status: 'completed' },
    { id: 'energy-bodies', title: 'Energy Bodies', progress: 100, status: 'completed' },
    { id: 'inward-journey', title: 'The Inward Journey', progress: 45, status: 'current' },
    { id: 'relating', title: 'Relating to Others', progress: 0, status: 'locked' }
  ];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-white mb-8">Your Learning Path</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            className={`bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 ${
              chapter.status === 'locked' ? 'opacity-50' : 'hover:bg-white/10 cursor-pointer'
            } transition-all`}
          >
            <div className="flex items-start justify-between mb-4">
              <Mountain className="w-8 h-8 text-purple-400" />
              {chapter.status === 'completed' && (
                <Award className="w-6 h-6 text-green-400" />
              )}
              {chapter.status === 'current' && (
                <span className="px-2 py-1 bg-yellow-500/20 rounded-full text-yellow-400 text-xs font-medium">
                  Current
                </span>
              )}
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-2">{chapter.title}</h3>
            
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Progress</span>
                <span className="text-white">{chapter.progress}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  style={{ width: `${chapter.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Analytics View
function AnalyticsView({ userData }) {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-white mb-8">Your Growth Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Over Time */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Growth Over Time</h3>
          <div className="h-64 flex items-center justify-center">
            <BarChart3 className="w-16 h-16 text-gray-600" />
            <p className="text-gray-400 ml-4">Chart visualization here</p>
          </div>
        </div>
        
        {/* Habit Consistency */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Habit Consistency</h3>
          <div className="space-y-4">
            {['Meditation', 'Journaling', 'Reading', 'Exercise'].map((habit) => (
              <div key={habit}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">{habit}</span>
                  <span className="text-white">{Math.floor(Math.random() * 30 + 70)}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                    style={{ width: `${Math.floor(Math.random() * 30 + 70)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Community View
function CommunityView({ userData }) {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-white mb-8">Community Echoing Cavern</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Discussion Rooms */}
        <div className="lg:col-span-2 space-y-4">
          {['Shadow Work Circle', 'Morning Meditation Group', 'Journal Sharing'].map((room) => (
            <div key={room} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 cursor-pointer transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{room}</h3>
                  <p className="text-gray-400 text-sm">
                    {Math.floor(Math.random() * 50 + 10)} members online
                  </p>
                </div>
                <MessageCircle className="w-5 h-5 text-purple-400" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Insight Wall */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Insight Wall</h3>
          <div className="space-y-3">
            <blockquote className="text-sm text-gray-300 italic border-l-2 border-purple-400 pl-3">
              "The shadow work lesson completely shifted my perspective..."
            </blockquote>
            <blockquote className="text-sm text-gray-300 italic border-l-2 border-blue-400 pl-3">
              "Day 30 of meditation - I finally understand stillness..."
            </blockquote>
            <blockquote className="text-sm text-gray-300 italic border-l-2 border-green-400 pl-3">
              "The community support here is unlike anything I've experienced..."
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for checkmark
function Check({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}