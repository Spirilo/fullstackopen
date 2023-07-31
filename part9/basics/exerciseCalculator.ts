interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const calculateExercises = (args: string[]) : Result => {
  if (args.length < 4) throw new Error('Not enough arguments!');

  const daysWithTarget = args.slice(2);

  if (!daysWithTarget.every(e => (!isNaN(Number(e))))) throw new Error('User input wrong!');

  const target = Number(daysWithTarget[0]);

  const days = daysWithTarget.slice(1).map(d => Number(d));

  const periodLength = days.length;
  const trainingDays = days.filter(d => d !== 0).length;

  const sum = days.reduce((a, c) => {
    return a + c;
  }, 0);
  const average = sum / days.length;
  const success = average >= target ? true : false;

  let rating;
  let ratingDescription;
  if (average < 1) rating = 1, ratingDescription = 'You can do better...';
  else if (average < 2) rating = 2, ratingDescription = 'Almost there!';
  else rating = 3, ratingDescription = 'You did it!!';

  return {
    periodLength, trainingDays, success, rating, ratingDescription, target, average
  };
};

try {
  console.log(calculateExercises(process.argv));
} catch (error) {
  let errorMessage = 'Something went wrong';
  if (error instanceof Error) errorMessage = 'Error: ' + error.message;
  console.log(errorMessage);
}