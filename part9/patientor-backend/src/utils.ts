import { Gender, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isSsn = (ssn: string): boolean => {
  const ssnRegex = /^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])\d{2}[-+A]\d{3}[0-9A-Z]$/;
  return Boolean(ssnRegex.test(ssn));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseName = (name: unknown): string => {
  if(!isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseDate = (date: unknown): string => {
  if(!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const parseSsn = (ssn: unknown): string => {
  if(!isString(ssn) || !isSsn(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if(!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if(!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if(!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  };

  if('name' in object && 'dateOfBirth' in object && 
  'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation)
    };

    return newPatient;
  }
  
  throw new Error('Incorrect data: Some fields are missing');
};