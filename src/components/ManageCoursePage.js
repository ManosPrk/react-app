import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
// import { getAuthors } from "../api/authorApi";
// // import * as courseApi from "../api/courseApi";
import { toast } from "react-toastify";
import courseStore from "../stores/courseStore";
import * as courseActions from "../actions/courseActions";

const ManageCoursePage = props => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(courseStore.getAuthors());

  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: ""
  });

  useEffect(() => {
    const slug = props.match.params.slug; // from the path '/courses/:slug
    courseStore.addChangeListener(onChange);

    if (courses.length === 0) {
      courseActions.loadCourses();
      courseActions.loadAuthors();
    } else if (slug) {
      if (!courseStore.isCourse(slug)) {
        props.history.push("/courses");
        return;
      }
      setCourse(courseStore.getCourseBySlug(slug));
    }

    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length, props.match.params.slug, props.history]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) {
      return;
    }
    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course saved!");
    });
  }

  function onChange() {
    setCourses(courseStore.getCourses());
    setAuthors(courseStore.getAuthors());
  }

  function handleChange(event) {
    const { target } = event;
    setCourse({
      ...course,
      [target.name]: target.value
    });
  }

  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = "Title is required!";
    if (!course.authorId) _errors.authorId = "Author is required!";
    if (!course.category) _errors.category = "Category is required!";
    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }

  return (
    <>
      <h2> Manage Course</h2>
      <CourseForm
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        course={course}
        authors={authors}
      />
    </>
  );
};

export default ManageCoursePage;
