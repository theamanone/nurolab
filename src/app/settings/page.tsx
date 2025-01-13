'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { FaSun, FaMoon, FaDesktop, FaGlobe, FaFont, FaBell } from 'react-icons/fa';
import { storage } from '@/lib/storage';

interface Settings {
  theme: string;
  language: string;
  fontSize: string;
  notifications: boolean;
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState<Settings>({
    theme: 'system',
    language: 'en',
    fontSize: 'medium',
    notifications: true,
  });

  useEffect(() => {
    const storedSettings = storage.getAllSettings();
    setSettings({
      theme: storedSettings.theme,
      language: storedSettings.language,
      fontSize: storedSettings.fontSize,
      notifications: storedSettings.notifications,
    });
  }, []);

  const updateSetting = <T extends keyof Settings>(key: T, value: Settings[T]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    storage.set(key, value);
    if (key === 'theme') {
      setTheme(value as string);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>

          {/* Theme Settings */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Appearance</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</label>
                <div className="mt-2 grid grid-cols-3 gap-3">
                  {[
                    { value: 'light', icon: FaSun, label: 'Light' },
                    { value: 'dark', icon: FaMoon, label: 'Dark' },
                    { value: 'system', icon: FaDesktop, label: 'System' },
                  ].map(({ value, icon: Icon, label }) => (
                    <button
                      key={value}
                      onClick={() => updateSetting('theme', value)}
                      className={`flex items-center justify-center space-x-2 p-3 rounded-lg border ${
                        settings.theme === value
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                          : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Font Size</label>
                <div className="mt-2 grid grid-cols-3 gap-3">
                  {['small', 'medium', 'large'].map((size) => (
                    <button
                      key={size}
                      onClick={() => updateSetting('fontSize', size)}
                      className={`p-3 rounded-lg border ${
                        settings.fontSize === size
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                          : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <FaFont className="h-5 w-5 mx-auto" />
                      <span className="mt-1 block text-sm capitalize">{size}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Language Settings */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Language</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { code: 'en', label: 'English' },
                { code: 'es', label: 'Español' },
                { code: 'fr', label: 'Français' },
                { code: 'de', label: 'Deutsch' },
              ].map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => updateSetting('language', code)}
                  className={`flex items-center space-x-3 p-3 rounded-lg border ${
                    settings.language === code
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <FaGlobe className="h-5 w-5" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Notifications</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FaBell className="h-5 w-5 text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">Enable Notifications</span>
              </div>
              <button
                onClick={() => updateSetting('notifications', !settings.notifications)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  settings.notifications ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.notifications ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
