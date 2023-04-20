const Part = ({part}) => {
    return <li>{part.name} {part.exercises}</li>
}
  
const Content = ({parts}) =>  {
    let exercises = parts.map(part => part.exercises)
    let sum = exercises.reduce((a,b) => a + b, 0)
    return (
      <>
        <ul>
          {parts.map(part => 
            <Part key={part.id} part={part} />
          )}
        </ul>
        <p><b>total of {sum} exercises</b></p>
      </>
    )
}
  
const Header = ({name}) => {
    return <h2>{name}</h2>
}
  
  
const Course = ({course}) => {
  return (
      <>
        {course.map(c =>
          <div key={c.id}>
            <Header name={c.name} />
            <Content parts={c.parts} />
          </div>
        )}
      </>
    )
  }

export default Course;