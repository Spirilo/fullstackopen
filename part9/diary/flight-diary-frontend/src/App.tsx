import { useEffect, useState } from 'react';
import { createDiary, getAllDiaries } from './services/diary';
import { Diary } from './types';
import Diaries from './components/Diaries';
import { isAnDiary, useField } from './utils';
import ErrorMsg from './components/ErrorMsg';


function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const date = useField('text');
  const visibility = useField('text');
  const weather = useField('text');
  const comment = useField('text');
  const error = useField('text')


  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  const addDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const diary = await createDiary({
      date: date.value,
      visibility: visibility.value,
      weather: weather.value,
      comment: comment.value
    })
    if(isAnDiary(diary)) {
      setDiaries(diaries.concat(diary))
    } else {
      error.setValue(diary?.data)
      setTimeout(() => {
        error.setValue('')
      }, 5000);
    }
    
    
    date.setValue('')
    visibility.setValue('')
    weather.setValue('')
    comment.setValue('')
  }

  return (
    <div>
      <div>
      <h2>Add new entry</h2>
      <ErrorMsg msg={error.value}/>
      <form onSubmit={addDiary}>
        <div>
          date <input {...date} />
        </div>
        <div>
          visibility <input {...visibility} />
        </div>
        <div>
          weather <input {...weather} />
        </div>
        <div>
          comment <input {...comment} />
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
      <h2>Diary entries</h2>
      <Diaries diaries={diaries} />
    </div>
  );
}

export default App;
