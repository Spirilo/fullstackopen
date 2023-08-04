import { CoursePart } from "../types";

const Part = ({ course }: { course: CoursePart}) => {
  switch(course.kind) {
    case 'basic':
      return (
        <div>
          <b>{course.name} {course.exerciseCount}</b>
          <p><i>{course.description}</i></p>
        </div>
      );
    case 'group':
      return (
        <div>
          <b>{course.name} {course.exerciseCount}</b>
          <p>Projects in course: {course.groupProjectCount}</p>
        </div>
      );
    case 'background':
      return (
        <div>
          <b>{course.name} {course.exerciseCount}</b>
          <p><i>{course.description}</i></p>
          <p>Additional info: {course.backgroundMaterial}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <b>{course.name} {course.exerciseCount}</b>
          <p><i>{course.description}</i></p>
          required skills: {course.requirements.join(', ')}
        </div>
      )
  }
};

export default Part;