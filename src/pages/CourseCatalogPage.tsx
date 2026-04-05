import { useState } from 'react';
import { Search } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import CourseCard from '../components/common/CourseCard';
import { useCourses } from '../hooks/useCourses';
import type { Course } from '../types';

const CATEGORIES = ['All', 'Backend', 'Frontend', 'DevOps', 'Architecture', 'Database'];
const TAGS = ['ALL TAGS', 'NESTJS', 'REACT', 'TYPESCRIPT', 'NODEJS', 'DOCKER'];

const CourseCatalogPage = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useCourses({
    page,
    limit: 6,
    category: selectedCategory || undefined,
    tag: selectedTag || undefined,
  });

  const courses = data?.courses || [];
  const pagination = data?.pagination;

  return (
    <div className="min-h-screen bg-[#060d16]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">Academy Catalog</h1>
          <p className="text-gray-500">Systematic mastery of the modern engineering stack.</p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search courses, mentors, or tech..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition text-sm"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value === 'All' ? '' : e.target.value);
              setPage(1);
            }}
            className="bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-3 text-gray-400 focus:outline-none focus:border-blue-500 transition text-sm cursor-pointer"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Tag Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSelectedTag(tag === 'ALL TAGS' ? '' : tag.toLowerCase());
                setPage(1);
              }}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition ${
                (tag === 'ALL TAGS' && !selectedTag) || selectedTag === tag.toLowerCase()
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'border-[#30363d] text-gray-500 hover:border-gray-500 hover:text-gray-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-[#0d1117] border border-[#30363d] rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No courses found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course: Course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#30363d] text-gray-400 hover:border-blue-500 hover:text-blue-400 disabled:opacity-30 transition"
            >
              ‹
            </button>
            {[...Array(pagination.pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg border text-sm font-medium transition ${
                  page === i + 1
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-[#30363d] text-gray-400 hover:border-blue-500 hover:text-blue-400'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
              disabled={page === pagination.pages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#30363d] text-gray-400 hover:border-blue-500 hover:text-blue-400 disabled:opacity-30 transition"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCatalogPage;