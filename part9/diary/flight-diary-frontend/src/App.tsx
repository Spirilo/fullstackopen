import { useEffect, useState } from 'react';
import { createDiary, getAllDiaries } from './services/diary';
import { Diary } from './types';
import Diaries from './components/Diaries';
import { useField } from './utils';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const date = useField('text');
  const visibility = useField('text');
  const weather = useField('text');
  const comment = useField('text');

  console.log(diaries)

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  const addDiary = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createDiary({
      date: date.value,
      visibility: visibility.value,
      weather: weather.value,
      comment: comment.value
    }).then(res => setDiaries(diaries.concat(res)))
  }

  return (
    <div>
      <div>
      <h2>Add new entry</h2>
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
