import express = require('express');
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  
  if(isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  const response = {
    weight,
    height,
    bmi: calculateBmi(['', '', weight.toString(), height.toString()])
  };

  return res.status(200).json(response);
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) 
    return res.status(400).json({ error: 'parameters missing'});

  if (!(daily_exercises instanceof Array) || isNaN(target)) 
    return res.status(400).json({ error: 'malformatted parameters' });

  const result = calculateExercises(['', '', target, ...daily_exercises])


  return res.status(400).json(result)

})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});