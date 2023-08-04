import { CoursePart } from "../types";

const Total = ({ courses }: { courses: CoursePart[] })  => {
  const sum : number = courses
    .reduce((a,b) => a + b.exerciseCount, 0)
  
  return(
    <p>Number of exercises {sum}</p>
  )
};

export default Total;