import { CourseParts } from "../types";

const Total = ({ courses }: { courses: CourseParts[] })  => {
  const sum : number = courses
    .reduce((a,b) => a + b.exerciseCount, 0)
  
  return(
    <p>Number of exercises {sum}</p>
  )
};

export default Total;