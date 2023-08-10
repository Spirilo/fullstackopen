import { Box } from "@mui/material";
import { Diagnosis, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, Type } from "../../types";
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HospitalEntryComp = ({ date, description, specialist, discharge }: HospitalEntry) => {
  return (
    <Box sx={{ border: 1}}>
      <p><b>{date}</b> <LocalHospitalIcon /></p>
      <i>{description}</i>
      <p>diagnose by {specialist}</p>
      <p>Discharge {discharge.date}, Criteria: {discharge.criteria}</p>
    </Box>
  )
};

const OccupationalHealthcareEntryComp = ({ date, description, specialist, sickLeave, employerName }: OccupationalHealthcareEntry ) => {
  return (
    <Box sx={{ border: 1 }}>
      <p><b>{date}</b> <WorkIcon /> {employerName}</p>
      <i>{description}</i>
      <p>diagnose by {specialist}</p>
      {sickLeave ?
        <p>Sickleave: {sickLeave?.startDate} -- {sickLeave?.endDate}</p>
      :
        ''
      }
    </Box>
  )
};

const HealthCheckEntryComp = ({ date, description, specialist, healthCheckRating}: HealthCheckEntry) => {
  return (
    <Box sx={{ border: 1}}>
      <p><b>{date}</b> <MonitorHeartIcon /></p>
      <i>{description}</i>
      <p>{(() => {
        switch (healthCheckRating) {
          case 0:
            return <FavoriteIcon sx={{ color: 'green'}} />;
          case 1:
            return <FavoriteIcon sx={{ color: 'yellow'}} />;
          case 2:
            return <FavoriteIcon sx={{ color: 'orange'}} />;
          case 3:
            return <FavoriteIcon sx={{ color: 'red'}} />;
          default:
            return <FavoriteIcon />;
        }
      })()}</p>
      <p>diagnose by {specialist}</p>
    </Box>
  )
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryInfo: React.FC<{ entry : Entry, diagnoses: Diagnosis[] }> = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {
  const styles = {
    borderStyle: ''
  }
  
  switch (entry.type) {
    case Type.Hospital:
      return <HospitalEntryComp
        id={entry.id}
        discharge={entry.discharge}
        description={entry.description}
        date={entry.date}
        specialist={entry.specialist}
        type={Type.Hospital}       
      />
    case Type.OccupationalHealthcare:
      return <OccupationalHealthcareEntryComp
        id={entry.id}
        employerName={entry.employerName}
        sickLeave={entry.sickLeave}
        description={entry.description}
        date={entry.date}
        specialist={entry.specialist}
        type={Type.OccupationalHealthcare}       
    />
    case Type.HealthCheck:
      return <HealthCheckEntryComp
        id={entry.id}
        description={entry.description}
        date={entry.date}
        specialist={entry.specialist}
        healthCheckRating={entry.healthCheckRating}
        type={Type.HealthCheck}       
    />
    default:
      return assertNever(entry);
  }
}

export default EntryInfo;