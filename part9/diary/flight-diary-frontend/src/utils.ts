import { useState } from 'react';
import { Diary } from './types';

export const useField = (type: string) => {
  const [value, setValue] = useState('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    setValue,
    onChange
  }
}

export const isAnDiary = (object: any): object is Diary => {
  return 'id' in object && 'date' in object &&
    'weather' in object && 'visibility' in object && 'comment' in object;
}