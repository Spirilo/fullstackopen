import { Gender,
  NewPatient,
  Diagnosis,
  HealthCheckRating, 
  SickLeave, 
  Discharge, 
  EntryWithoutId, 
  Type 
} from "./types";

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
      occupation: parseOccupation(object.occupation),
      entries: []
    };

    return newPatient;
  }
  
  throw new Error('Incorrect data: Some fields are missing');
};

const parseDescription = (description: unknown): string => {
  if(!description || !isString(description)) {
    throw new Error('Incorrect data or missing description');
  };

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if(!specialist || !isString(specialist)) {
    throw new Error('Incorrect data or missing specialist');
  };

  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isHealtCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const isSickLeave = (sickLeave: any): boolean => {
  return Boolean(sickLeave.startDate && sickLeave.endDate);
};

const isDischarge = (discharge: any): boolean => {
  return Boolean(discharge.date && discharge.criteria);
};

const isType = (type: any): type is Type => {
  return Object.values(Type).includes(type);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if(!healthCheckRating || !isHealtCheckRating(healthCheckRating)) {
    throw new Error('Incorrect data or missing rating');
  };

  return healthCheckRating;
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
  if(!sickLeave) return undefined;

  if(!isSickLeave(sickLeave)) {
    throw new Error('Incorrect sickleave');
  };

  return sickLeave as SickLeave;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if(!discharge || !isDischarge) {
    throw new Error('Incorrect data or missing discharge');
  };

  return discharge as Discharge;
};

const parseType = (type: unknown): Type => {
  if(!type || !isType(type)) {
    throw new Error('Incorrect type');
  }
  
  return type;
}
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const toNewEntry = (object: any): EntryWithoutId => {
  if(!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  };
  if('type' in object && 'description' in object && 'date' in object && 'specialist' in object) {
  const type = parseType(object.type);
  let newEntry: EntryWithoutId
    switch(type) {
      case Type.HealthCheck:
        if('healthCheckRating' in object) {
          newEntry = {
            date: parseDate(object.date),
            description: parseDescription(object.description),
            specialist: parseSpecialist(object.specialist),
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
            type,
          }
          return newEntry;
        }
        break;
      case Type.Hospital:
        if('discharge' in object) {
          newEntry = {
            date: parseDate(object.date),
            description: parseDescription(object.description),
            specialist: parseSpecialist(object.specialist),
            discharge: parseDischarge(object.discharge),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
            type,
          }
          return newEntry;
        }
        break;
      case Type.OccupationalHealthcare:
        if('employerName' in object) {
          newEntry = {
            date: parseDate(object.date),
            description: parseDescription(object.description),
            specialist: parseSpecialist(object.specialist),
            employerName: parseName(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
            type,
          }
          return newEntry;
        }
        break;
      default:
        return assertNever(type);
    }
  }
  throw new Error('Something went wrong');
}