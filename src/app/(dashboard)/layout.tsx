'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { 
  FaChalkboardTeacher, 
  FaChartBar, 
  FaCog, 
  FaBook,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUserCircle,
  FaHome
} from 'react-icons/fa';

const sidebarItems = [
  { 
    name: 'Overview', 
    href: '/dashboard', 
    icon: FaChartBar,
    description: 'Platform statistics and overview'
  },
  { 
    name: 'Courses', 
    href: '/dashboard/courses', 
    icon: FaBook,
    description: 'Manage courses and content'
  },
  { 
    name: 'Instructors', 
    href: '/dashboard/instructors', 
    icon: FaChalkboardTeacher,
    description: 'Manage instructors'
  },
  { 
    name: 'Settings', 
    href: '/dashboard/settings', 
    icon: FaCog,
    description: 'Platform settings'
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-600 rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out z-30 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } border-r border-gray-200 dark:border-gray-700`}
        style={{ width: '280px' }}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <span className="text-xl font-bold text-gray-800 dark:text-white">Nurolab</span>
            </Link>
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
            >
              <FaTimes className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Sidebar Links */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            <Link
              href="/"
              className="flex items-center space-x-3 p-3 rounded-lg transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
            >
              <FaHome className="w-5 h-5" />
              <div>
                <span className="font-medium">Home</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">Return to main site</p>
              </div>
            </Link>

            <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* User Profile Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <FaUserCircle className="w-8 h-8 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {session?.user?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {session?.user?.email}
                </p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Sign out"
              >
                <FaSignOutAlt className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg z-40 lg:hidden ${
          isSidebarOpen ? 'hidden' : 'block'
        }`}
      >
        <FaBars className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </button>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'ml-[280px]' : 'ml-0'
        }`}
      >
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
