import React, { useState, useEffect } from "react";
// import { getCourses } from "../api/courseApi";
// import { getAuthors } from "../api/authorApi";
import courseStore from "../stores/courseStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import {
  loadCourses,
  removeCourse,
  loadAuthors
} from "../actions/courseActions";

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(courseStore.getAuthors());

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    if (courses.length === 0) {
      console.log("courses loading");
      loadCourses();
    }
    if (authors.length === 0) {
      loadAuthors();
    }
    return () => courseStore.removeChangeListener(onChange);
  }, [courses, authors]);

  // useEffect(() => {
  //   courseStore.addChangeListener(onChange);
  //   if (authors.length === 0) {

  //   }
  //   // if (authors.length === 0) {
  //   // }
  //   return () => courseStore.removeChangeListener(onChange);
  // }, [authors]);

  function onChange() {
    setCourses(courseStore.getCourses());
    setAuthors(courseStore.getAuthors());
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        {" "}
        Add Course
      </Link>
      <CourseList
        authors={authors}
        courses={courses}
        deleteCourse={removeCourse}
      />
    </>
  );
}

export default CoursesPage;
