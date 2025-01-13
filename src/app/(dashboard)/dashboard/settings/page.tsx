'use client';

import { useState, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

interface Settings {
  security: {
    maxLoginAttempts: number;
    sessionTimeout: number;
    requireEmailVerification: boolean;
    twoFactorAuthEnabled: boolean;
    passwordExpiryDays: number;
    ipWhitelist: string[];
    failedLoginLockoutMinutes: number;
  };
  features: {
    enableRegistration: boolean;
    enablePublicCourses: boolean;
    enableCertificates: boolean;
    enableAIFeatures: boolean;
    enableLiveClasses: boolean;
    enableAnalytics: boolean;
  };
  notifications: {
    enableEmailNotifications: boolean;
    enableInAppNotifications: boolean;
    notifyOnNewEnrollment: boolean;
    notifyOnCourseCompletion: boolean;
    notifyOnNewCourse: boolean;
  };
  storage: {
    maxUploadSizeMB: number;
    allowedFileTypes: string[];
    enableCloudStorage: boolean;
  };
}

export default function SettingsPage() {
  const { data: session } = useSession();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/admin/settings');
        if (!response.ok) throw new Error('Failed to fetch settings');
        const data = await response.json();
        setSettings(data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    
    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error('Failed to save settings');
      alert('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !settings) {
    return <div>Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Configure platform security and features
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Security Settings */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Security Settings</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="maxLoginAttempts" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Max Login Attempts
              </label>
              <input
                type="number"
                id="maxLoginAttempts"
                value={settings.security.maxLoginAttempts}
                onChange={(e) => setSettings({
                  ...settings,
                  security: { ...settings.security, maxLoginAttempts: parseInt(e.target.value) }
                })}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="passwordExpiry" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password Expiry (Days)
              </label>
              <input
                type="number"
                id="passwordExpiry"
                value={settings.security.passwordExpiryDays}
                onChange={(e) => setSettings({
                  ...settings,
                  security: { ...settings.security, passwordExpiryDays: parseInt(e.target.value) }
                })}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="lockoutMinutes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Failed Login Lockout Duration (Minutes)
              </label>
              <input
                type="number"
                id="lockoutMinutes"
                value={settings.security.failedLoginLockoutMinutes}
                onChange={(e) => setSettings({
                  ...settings,
                  security: { ...settings.security, failedLoginLockoutMinutes: parseInt(e.target.value) }
                })}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="flex items-center">
              <input
                id="twoFactorAuth"
                type="checkbox"
                checked={settings.security.twoFactorAuthEnabled}
                onChange={(e) => setSettings({
                  ...settings,
                  security: { ...settings.security, twoFactorAuthEnabled: e.target.checked }
                })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="twoFactorAuth" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Enable Two-Factor Authentication
              </label>
            </div>
          </div>
        </div>

        {/* Storage Settings */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Storage Settings</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="maxUploadSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Max Upload Size (MB)
              </label>
              <input
                type="number"
                id="maxUploadSize"
                value={settings.storage.maxUploadSizeMB}
                onChange={(e) => setSettings({
                  ...settings,
                  storage: { ...settings.storage, maxUploadSizeMB: parseInt(e.target.value) }
                })}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="flex items-center">
              <input
                id="cloudStorage"
                type="checkbox"
                checked={settings.storage.enableCloudStorage}
                onChange={(e) => setSettings({
                  ...settings,
                  storage: { ...settings.storage, enableCloudStorage: e.target.checked }
                })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="cloudStorage" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Enable Cloud Storage
              </label>
            </div>
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Features</h2>
          <div className="space-y-4">
            {Object.entries(settings.features).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <input
                  id={key}
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setSettings({
                    ...settings,
                    features: { ...settings.features, [key]: e.target.checked }
                  })}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor={key} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-50"
          >
            <FaSave className="-ml-1 mr-2 h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
