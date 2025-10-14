import React, { useState } from "react";
import { BookOpen, User, Layers, Tag } from "lucide-react";
import PaymentModal from "./PaymentModal";

export default function CourseCardComponent({ courses = [] }) {
    const [openModal, setOpenModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleOpenModal = (course) => {
        setSelectedCourse(course);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedCourse(null);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
                {courses.map((course, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all group w-75 h-[450px] flex flex-col"
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
                            <p className="text-sm text-slate-600 mb-2">{course.institute}</p>

                            {/* Course Description */}
                            <p className="text-sm text-slate-500 mb-3 line-clamp-3">
                                {course.description}
                            </p>


                            {/* Duration & Enrolled */}
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

                            {/* Category & Level */}
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

                            {/* Enroll Button */}
                            <button
                                onClick={() => handleOpenModal(course)}
                                className="mt-auto w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors"
                            >
                                Enroll Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Payment Modal */}
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
