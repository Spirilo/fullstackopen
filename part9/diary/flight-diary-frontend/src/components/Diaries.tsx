import { Diary } from "../types";

const Diaries = ({ diaries }: { diaries: Diary[] }) => {
  console.log(diaries)
  return (
    <div>
      {diaries.map(d => (
        <div>
          <p><b>{d.date}</b></p>
          <p>visibility: {d.visibility}</p>
          <p>weather: {d.weather}</p>
        </div>
      ))}
    </div>
  )
}

export default Diaries;