import { Entry } from "../../types";

const EntryInfo = ({ entry }: { entry: Entry}) => {
  return (
    <div>
      <p><b>{entry.date}</b> <i>{entry.description}</i></p>
      <ul>
        {entry.diagnosisCodes?.map(c => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  )
};

export default EntryInfo;