'use client';

import React, { useEffect, useState } from 'react';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaUsers, FaClock } from 'react-icons/fa';
import { getCourses } from './actions';
import { Course } from '@/types/course';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesData = await getCourses();
      setCourses(coursesData || []);
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Courses
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Master Machine Learning with Our Expert-Led Courses
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course: Course, index: number) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-all group"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-800/90" />
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                  <span className="px-3 py-1 bg-primary/90 text-white text-sm rounded-full">
                    {course.level}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <FaClock className="text-primary" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaUsers className="text-primary" />
                    <span>{course.studentsEnrolled.toLocaleString()} students</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <FaStar className="text-yellow-500" />
                    <span className="text-gray-900 dark:text-white font-semibold">{course.rating}</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${course.price}
                  </span>
                </div>

                <div className="pt-4">
                  <button className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-colors">
                    Enroll Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
