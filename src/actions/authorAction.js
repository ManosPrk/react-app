import dispatcher from "../appDispatcher";
import * as authorApi from "../api/authorApi";
import actionTypes from "./actionTypes";

// export function saveCourse(course) {
//   return courseApi.saveCourse(course).then(savedCourse => {
//     dispatcher.dispatch({
//       actionType: course.id
//         ? actionTypes.UPDATE_COURSE
//         : actionTypes.CREATE_COURSE,
//       course: savedCourse
//     });
//   });
// }

export function loadAuthors() {
  return authorApi().then(authors => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_AUTHOR,
      authors
    });
  });
}

// export function removeCourse(id) {
//   return courseApi.deleteCourse(id).then(() => {
//     dispatcher.dispatch({
//       actionType: actionTypes.DELETE_COURSE,
//       id: id
//     });
//   });
// }
