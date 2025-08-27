// src/app/(portal)/dashboard/page.tsx
import { BookOpen, Calendar, Moon, Sparkles, Sun, Target, TrendingUp, Users } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold gradient-text">
            Welcome back, Seeker
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Your journey continues. Day 42 of transformation.
          </p>
        </div>
        
        <div className="hidden sm:flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-r from-primary-500/10 to-purple-500/10 px-4 py-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                12 Day Streak
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="widget-container group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Current Streak</p>
              <p className="mt-1 text-2xl font-bold gradient-text">12 days</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-primary-500/20 to-purple-500/20 p-3">
              <Sparkles className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <div className="mt-3 h-1 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div className="h-1 rounded-full bg-gradient-to-r from-primary-500 to-purple-600" style={{ width: '75%' }} />
          </div>
        </div>

        <div className="widget-container group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Habits Completed</p>
              <p className="mt-1 text-2xl font-bold gradient-text-yin">156</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-yin-500/20 to-yin-600/20 p-3">
              <Target className="h-6 w-6 text-yin-600 dark:text-yin-400" />
            </div>
          </div>
          <div className="mt-3 h-1 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div className="h-1 rounded-full bg-gradient-to-r from-yin-500 to-yin-600" style={{ width: '90%' }} />
          </div>
        </div>

        <div className="widget-container group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Journal Entries</p>
              <p className="mt-1 text-2xl font-bold gradient-text-yang">42</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-yang-500/20 to-yang-600/20 p-3">
              <BookOpen className="h-6 w-6 text-yang-600 dark:text-yang-400" />
            </div>
          </div>
          <div className="mt-3 h-1 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div className="h-1 rounded-full bg-gradient-to-r from-yang-500 to-yang-600" style={{ width: '60%' }} />
          </div>
        </div>

        <div className="widget-container group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Community Rank</p>
              <p className="mt-1 text-2xl font-bold text-purple-600 dark:text-purple-400">#127</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-3">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-3 h-1 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div className="h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '45%' }} />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's Focus - 2 columns wide */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Challenge */}
          <div className="widget-container">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-display font-semibold">Today's Focus</h2>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {/* Morning Meditation */}
              <div className="flex items-start gap-4 rounded-xl border border-yin-200 bg-gradient-to-r from-yin-50/50 to-yin-100/50 p-4 dark:border-yin-800 dark:from-yin-950/50 dark:to-yin-900/50">
                <div className="rounded-lg bg-gradient-to-br from-yin-500 to-yin-600 p-2">
                  <Moon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-yin-900 dark:text-yin-100">Morning Meditation</h3>
                  <p className="mt-1 text-sm text-yin-700 dark:text-yin-300">
                    Start your day with 10 minutes of mindful breathing
                  </p>
                  <button className="mt-3 rounded-lg bg-yin-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-yin-700">
                    Begin Session
                  </button>
                </div>
              </div>

              {/* Physical Training */}
              <div className="flex items-start gap-4 rounded-xl border border-yang-200 bg-gradient-to-r from-yang-50/50 to-yang-100/50 p-4 dark:border-yang-800 dark:from-yang-950/50 dark:to-yang-900/50">
                <div className="rounded-lg bg-gradient-to-br from-yang-500 to-yang-600 p-2">
                  <Sun className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-yang-900 dark:text-yang-100">Upper Body Strength</h3>
                  <p className="mt-1 text-sm text-yang-700 dark:text-yang-300">
                    45-minute workout focusing on push movements
                  </p>
                  <button className="mt-3 rounded-lg bg-yang-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-yang-700">
                    View Workout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 sm:grid-cols-2">
            <button className="widget-container flex items-center justify-center gap-3 py-8 transition hover:scale-105">
              <BookOpen className="h-8 w-8 text-primary-500" />
              <span className="font-semibold">Quick Journal Entry</span>
            </button>
            
            <button className="widget-container flex items-center justify-center gap-3 py-8 transition hover:scale-105">
              <Target className="h-8 w-8 text-purple-500" />
              <span className="font-semibold">Log Habit</span>
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <div className="widget-container">
            <h2 className="mb-4 text-lg font-display font-semibold">Recent Achievements</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600" />
                <div>
                  <p className="text-sm font-semibold">Week Warrior</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">7-day streak achieved</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-600" />
                <div>
                  <p className="text-sm font-semibold">Mind Master</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">30 meditation sessions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Community Feed */}
          <div className="widget-container">
            <h2 className="mb-4 text-lg font-display font-semibold">Community</h2>
            <div className="space-y-3">
              <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                <p className="text-sm">
                  <span className="font-semibold">Sarah</span> completed Day 100! 🎉
                </p>
                <p className="mt-1 text-xs text-gray-500">2 hours ago</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                <p className="text-sm">
                  <span className="font-semibold">Mike</span> shared a breakthrough moment
                </p>
                <p className="mt-1 text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}