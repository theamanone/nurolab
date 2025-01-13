'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { 
  FaUsers, 
  FaBook, 
  FaGraduationCap,
  FaChartLine,
  FaUserGraduate,
  FaCalendarCheck,
  FaBrain, 
  FaCode, 
  FaCertificate,
  FaChalkboardTeacher
} from 'react-icons/fa';

interface DashboardStats {
  totalCourses: number;
  totalInstructors: number;
  totalStudents: number;
  totalEnrollments: number;
}

function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/dashboard/stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading || !stats) {
    return <div>Loading dashboard stats...</div>;
  }

  const cards = [
    {
      title: 'Total Courses',
      value: stats.totalCourses,
      icon: FaBook,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Instructors',
      value: stats.totalInstructors,
      icon: FaChalkboardTeacher,
      color: 'bg-green-500',
    },
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: FaUsers,
      color: 'bg-purple-500',
    },
    {
      title: 'Total Enrollments',
      value: stats.totalEnrollments,
      icon: FaGraduationCap,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <card.icon
                    className={`h-6 w-6 text-white ${card.color} rounded-full p-1`}
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      {card.title}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {card.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h2>
          <div className="mt-6 flow-root">
            <ul className="-mb-8">
              {/* Recent activity items */}
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/dashboard/courses/new"
          className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 text-center hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <FaBook className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-500" />
          <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-white">
            Create New Course
          </span>
        </Link>

        <Link
          href="/dashboard/instructors/new"
          className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 text-center hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <FaUserGraduate className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-500" />
          <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-white">
            Add New Instructor
          </span>
        </Link>

        <Link
          href="/dashboard/reports"
          className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 text-center hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <FaChartLine className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-500" />
          <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-white">
            View Reports
          </span>
        </Link>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

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

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Monitor your platform's performance and user engagement
        </p>
      </div>
      
      {session?.user?.role === 'admin' ? (
        <AdminDashboard />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            You don't have permission to access this page.
          </p>
        </div>
      )}
    </div>
  );
}
