import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Female, Male } from '@mui/icons-material';

import { Patient } from "../../types";
import patientService from '../../services/patients';
import EntryInfo from "./EntryInfo";

const PatientInfo = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>()
  
  useEffect(() => {
    const fetchPatient = async () => {
      if (id !== undefined) {
        const patient = await patientService.getById(id);
        setPatient(patient);
      }
    };
    void fetchPatient();
  }, [])
  console.log(patient?.entries);

  return (
    <div>
      <h2>{patient?.name} 
        {patient?.gender === 'male' && <Male />}
        {patient?.gender === 'female' && <Female />}
      </h2>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <h3>entries</h3>
      {patient?.entries.map(e => (
        <EntryInfo key={e.id} entry={e} />
      ))}
    </div>
  )
};

export default PatientInfo;