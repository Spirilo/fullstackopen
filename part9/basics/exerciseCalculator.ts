interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
};

const calculateExercises = (exercises: number[]) : Result => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter(d => d !== 0).length;
  const target = 2;
  
  const sum = exercises.reduce((a, c) => {
    return a + c;
  }, 0)
  const average = sum / exercises.length;
  const success = average >= target ? true : false;

  let rating;
  let ratingDescription;
  if (average < 1) rating = 1, ratingDescription = 'You can do better...';
  else if (average < 2) rating = 2, ratingDescription = 'Almost there!';
  else rating = 3, ratingDescription = 'You did it!!';

  return {
    periodLength, trainingDays, success, rating, ratingDescription, target, average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]));
console.log(calculateExercises([3, 4, 2, 4.5, 0, 3, 1]));
console.log(calculateExercises([3, 0, 0, 0, 0, 0, 1]));