import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Female, Male } from '@mui/icons-material';

import { Diagnosis, EntryWithoutId, Patient } from "../../types";
import patientService from '../../services/patients';
import EntryInfo from "./EntryInfo";
import EntryForm from "./EntryForm";

const PatientInfo = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
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

  const addNewEntry = async (values: EntryWithoutId) => {
    try {
      if (id) {
        const data = await patientService.createEntry(id, values);
        console.log(data)
      }
    }catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h2>{patient?.name} 
        {patient?.gender === 'male' && <Male />}
        {patient?.gender === 'female' && <Female />}
      </h2>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <EntryForm onSubmit={addNewEntry} />
      <h3>entries</h3>
      {patient?.entries.map(e => (
        <EntryInfo key={e.id} entry={e} diagnoses={diagnoses} />
      ))}
    </div>
  )
};

export default PatientInfo;