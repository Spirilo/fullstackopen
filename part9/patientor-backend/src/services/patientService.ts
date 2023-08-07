import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';

import { Patient, NonSensitivePatientData, NewPatient } from '../types';

const patients: Patient[] = patientData

const getAll = (): Patient[] => {
  return patients;
};

const getById = (id: string) => {
  return patients.find(p => p.id === id);
}

const getNonSensitivePatients = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
}

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
}

export default {
  getAll,
  getById,
  getNonSensitivePatients,
  addPatient
};