import { CourseParts } from "../types";

const Content = ({ courses }: { courses: CourseParts[] }) => {
  return (
  <div>
    <p>
      {courses[0].name} {courses[0].exerciseCount}
    </p>
    <p>
      {courses[1].name} {courses[1].exerciseCount}
    </p>
    <p>
      {courses[2].name} {courses[2].exerciseCount}
    </p>
  </div>
  )
};

export default Content;