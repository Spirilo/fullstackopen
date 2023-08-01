import diagnoseData from '../../data/diagnoses';

import { DiagnoseEntry } from '../types';

const diagnoses: DiagnoseEntry[] = diagnoseData

const getAll = (): DiagnoseEntry[] => {
  return diagnoses;
}

export default {
  getAll
}