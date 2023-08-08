import { Diagnosis, Entry } from "../../types";

const EntryInfo = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {

  return (
    <div>
      <p><b>{entry.date}</b> <i>{entry.description}</i></p>
      <ul>
        {entry.diagnosisCodes?.map(c => {
          const match = diagnoses.find(d => d.code === c);
          if (match) {
            return(
              <li key={c}>
                {c} {match.name}
              </li>
            )
          }
        })}
      </ul>
    </div>
  )
};

export default EntryInfo;