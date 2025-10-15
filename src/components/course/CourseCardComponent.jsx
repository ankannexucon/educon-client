import React, { useState } from "react";
import { BookOpen, User, Layers, Tag } from "lucide-react";
import PaymentModal from "./PaymentModal";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function CourseCardComponent({ courses = [] }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState(new Set());

  const handleOpenModal = (course) => {
    // Add course to enrolled set
    setEnrolledCourses((prev) => new Set(prev).add(course.title));

    toast.success(
      <span>
        Application successful! <br />
        To check status, go to{" "}
        <Link
          to="/your-application"
          style={{ color: "#4f46e5", textDecoration: "underline" }}
        >
          Your Application
        </Link>
      </span>,
      {
        duration: 4000,
      }
    );

    // Optional: open payment modal
    // setSelectedCourse(course);
    // setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCourse(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {courses.map((course, index) => {
          const isEnrolled = enrolledCourses.has(course.title);

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all group flex flex-col w-full min-h-[450px]"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-sm">
                  <span className="text-sm font-semibold text-slate-700">
                    {course.price}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">
                  {course.title}
                </h3>
                <p className="text-sm text-slate-600 mb-2">
                  {course.institute}
                </p>

                <p className="text-sm text-slate-500 mb-3 line-clamp-3">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-sm text-slate-600 mb-3">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4 text-emerald-600" />
                    <span>{course.enrolled}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Tag className="w-4 h-4 text-purple-600" />
                    <span className="font-medium">{course.category}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    <span className="font-medium">{course.level}</span>
                  </div>
                </div>

                {/* Enroll / Pending Button */}
                <button
                  onClick={() => !isEnrolled && handleOpenModal(course)}
                  disabled={isEnrolled}
                  className={`mt-auto w-full font-medium py-3 rounded-lg transition-colors ${
                    isEnrolled
                      ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                >
                  {isEnrolled ? "Pending" : "Enroll Now"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedCourse && (
        <PaymentModal
          open={openModal}
          handleClose={handleCloseModal}
          course={selectedCourse}
        />
      )}
    </div>
  );
}
