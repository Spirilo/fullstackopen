import { useEffect, useState } from 'react';
import { createDiary, getAllDiaries } from './services/diary';
import { Diary } from './types';
import Diaries from './components/Diaries';
import { isAnDiary, useField } from './utils';
import ErrorMsg from './components/ErrorMsg';


function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const date = useField('date');
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
          visibility 
          good <input type='radio' name='visibility' onChange={() => visibility.setValue('good')}/>
          ok <input type='radio' name='visibility' onChange={() => visibility.setValue('ok')} />
          poor <input type='radio' name='visibility' onChange={() => visibility.setValue('poor')} />
        </div>
        <div>
          weather 
          sunny <input type='radio' name='weather' onChange={() => weather.setValue('sunny')} />
          rainy <input type='radio' name='weather' onChange={() => weather.setValue('rainy')} />
          cloudy <input type='radio' name='weather' onChange={() => weather.setValue('cloudy')} />
          stormy <input type='radio' name='weather' onChange={() => weather.setValue('stormy')} />
          windy <input type='radio' name='weather' onChange={() => weather.setValue('windy')} />
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
