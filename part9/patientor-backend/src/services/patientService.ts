import patientData from '../../data/patients';

import { Patient, NonSensitivePatientData } from '../types';

const patients: Patient[] = patientData

const getAll = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
}

export default {
  getAll,
  getNonSensitivePatients
};