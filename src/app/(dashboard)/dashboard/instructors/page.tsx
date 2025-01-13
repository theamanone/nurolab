'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

interface Instructor {
  _id: string;
  name: string;
  email: string;
  image: string;
  profile: {
    bio: string;
    specialization: string[];
  };
  coursesCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export default function InstructorsPage() {
  const { data: session } = useSession();
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await fetch('/api/admin/instructors');
        if (!response.ok) throw new Error('Failed to fetch instructors');
        const data = await response.json();
        setInstructors(data);
      } catch (error) {
        console.error('Error fetching instructors:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  const handleDelete = async (instructorId: string) => {
    if (!window.confirm('Are you sure you want to delete this instructor?')) return;

    try {
      const response = await fetch(`/api/admin/instructors/${instructorId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete instructor');

      setInstructors(instructors.filter(instructor => instructor._id !== instructorId));
    } catch (error) {
      console.error('Error deleting instructor:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Instructors</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your course instructors
          </p>
        </div>
        <Link
          href="/dashboard/instructors/new"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          <FaPlus className="-ml-1 mr-2 h-4 w-4" />
          Add Instructor
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="max-w-lg">
          <label htmlFor="search" className="sr-only">
            Search instructors
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 dark:focus:placeholder-gray-500 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Instructors Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
            Loading instructors...
          </div>
        ) : instructors.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
            No instructors found. Add your first instructor to get started.
          </div>
        ) : (
          instructors.map((instructor) => (
            <div
              key={instructor._id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 relative rounded-full overflow-hidden">
                    <Image
                      src={instructor.image || '/placeholder-avatar.png'}
                      alt={instructor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {instructor.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {instructor.email}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {instructor.profile.bio}
                  </p>
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {instructor.profile.specialization.map((spec, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {instructor.coursesCount} courses
                  </div>
                  <div className="flex space-x-3">
                    <Link
                      href={`/dashboard/instructors/${instructor._id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      <FaEdit className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(instructor._id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <FaTrash className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
