import { BookOpen, Star, MapPin, Users } from "lucide-react";

export default function UniversityCard({ uni, badge }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={uni.image}
          alt={uni.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {badge && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full shadow-lg text-xs font-semibold flex items-center gap-1">
            {badge.icon}
            {badge.text}
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-sm">
          <span className="text-sm font-semibold text-slate-700">
            ${uni.discountPrice}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
            {uni.category}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">
          {uni.name}
        </h3>

        <div className="flex items-center gap-1 mb-3 text-slate-600 text-sm">
          <MapPin className="w-4 h-4" />
          <span>{uni.location}</span>
        </div>

        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {uni.description}
        </p>

        <div className="flex items-center gap-1 mb-4">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-slate-900">{uni.rating}</span>
          <span className="text-slate-500 text-sm">
            ({uni.reviews.toLocaleString()})
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-600 mb-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{uni.students.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{uni.courses} courses</span>
          </div>
        </div>

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors">
          View Courses
        </button>
      </div>
    </div>
  );
}
