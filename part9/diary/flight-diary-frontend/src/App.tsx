import { useEffect, useState } from 'react';
import diaryService from './services/diary';
import { Diary } from './types';
import Diaries from './components/Diaries';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  console.log(diaries)

  useEffect(() => {
    diaryService.getAll().then(data => {
      setDiaries(data)
    })
  }, [])

  return (
    <div className="App">
      <h2>Diary entries</h2>
      <Diaries diaries={diaries} />
    </div>
  );
}

export default App;
