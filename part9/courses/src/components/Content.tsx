import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courses }: { courses: CoursePart[] }) => {
  return (
  <div>
    {courses.map(c => (
      <Part course={c} key={c.name} />
    ))}
  </div>
  )
};

export default Content;