import React from "react"
import { useState } from "react"
import { FiEdit2 } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { formatDate } from "../../../services/formatDate"
import { useNavigate } from "react-router-dom"; 
import { useSelector } from "react-redux";
import {
  deleteCourse,
} from "../../../services/operations/courseDetailsAPI" 

const CourseManagementCard = ({ course }) => { 

  const navigate = useNavigate(); 
  const [showModal, setShowModal] = useState(false); 
  const [loadingDelete, setLoadingDelete] = useState(false); 
  const { token } = useSelector(state => state.auth);

  const handleDeleteClick = () => {
    setShowModal(true);
  }; 

  const handleConfirmDelete = async () => {
    setLoadingDelete(true); 
     
    try { 
       
      await deleteCourse( course._id , token );
      console.log("Course deleted", course._id);
      // TODO: parent ko notify karke list se hatao
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setLoadingDelete(false);
      setShowModal(false);
    }
  }; 

  const handleCancelDelete = () => {
    setShowModal(false);
  };
  
  const handleEdit = () => {
    // Navigate to the EditCourse page for this course
    navigate(`/dashboard/admin/courses/edit/${course._id}`);
  };
  
  return <>
    <div className="w-[450px] group relative rounded-md border border-richblack-700 bg-richblack-800 p-6 shadow-md duration-200 hover:border-white hover:shadow-lg">
      <img
        src={course.thumbnail}
        alt={course.courseName}
        className="mb-4 h-[180px] w-full rounded-md object-cover transition-all duration-200 group-hover:opacity-90"
      />

      <h2 className="text-xl font-bold text-richblack-5 mb-1 line-clamp-2">
        {course.courseName}
      </h2>

      <p className="text-sm text-richblack-300 mb-1">
        <span className="text-richblack-100 font-medium">Instructor:</span>{" "}
        {course.instructor?.firstName} {course.instructor?.lastName}
      </p>

      {course?.category && (
        <p className="text-sm text-richblack-300 mb-1">
          <span className="text-richblack-100 font-medium">Category:</span>{" "}
          {course.category.name}
        </p>
      )}

      {course?.totalDuration && (
        <p className="text-sm text-richblack-300 mb-1">
          <span className="text-richblack-100 font-medium">Duration:</span>{" "}
          {course.totalDuration}
        </p>
      )}

      <p className="text-sm text-richblack-300 mb-1">
        <span className="text-richblack-100 font-medium">Students Enrolled:</span>{" "}
        {course?.studentsEnrolled?.length || 0}
      </p>

      <p className="text-sm text-richblack-300 mb-4">
        <span className="text-richblack-100 font-medium">Created:</span>{" "}
        <span className="text-yellow-100">{formatDate(course.createdAt)}</span>
      </p>

      <div className="mt-auto flex gap-3">
        <button
          title="Edit" 
          onClick={handleEdit}
          className="rounded-md border border-yellow-400 p-2 text-yellow-300 transition hover:bg-yellow-300 hover:text-richblack-900"
        >
          <FiEdit2 size={18} />
        </button>
        <button
          title="Delete" 
          onClick={handleDeleteClick}
          className="rounded-md border border-yellow-400 p-2 text-yellow-300 transition hover:bg-yellow-300 hover:text-richblack-900"
        >
          <RiDeleteBin6Line size={18} />
        </button>
      </div>
    </div> 
    
    {showModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-caribbeangreen-200 rounded-lg p-6 w-80 text-center">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Confirm Delete
          </h3>
          <p className="mb-6 text-gray-700">
            Delete <strong>{course.courseName}</strong>?
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleCancelDelete}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              disabled={loadingDelete}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-black"
              disabled={loadingDelete}
            >
              {loadingDelete ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    )}
   </> 
  
}

export default CourseManagementCard
