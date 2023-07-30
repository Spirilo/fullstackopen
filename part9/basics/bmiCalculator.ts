const Bmi = [ 
  'Underweight (severe)',
  'Underweight (moderate)', 
  'Underweight (mild)', 
  'Normal (healthy)', 
  'Owerweight (pre-obese)', 
  'Obese (class 1)', 
  'Obese (class 2)', 
  'Obese (class 3)',
];

const calculateBmi = (args: string[]) : string => {
  if (args.length < 4) throw new Error('Not enough arguments!');
  if (args.length > 4) throw new Error('Too many arguments!');

  const weight = Number(args[2]);
  const height = Number(args[3]);

  if (isNaN(weight) || isNaN(height)) throw new Error('User input is wrong!');


  const bmi = weight / (height * 2) * 100;
  if (bmi < 16) return Bmi[0];
  if (bmi <= 16.9) return Bmi[1];
  if (bmi <= 18.4) return Bmi[2];
  if (bmi <= 24.9) return Bmi[3];
  if (bmi <= 29.9) return Bmi[4];
  if (bmi <= 34.9) return Bmi[5];
  if (bmi < 39.9) return Bmi[6];
  return Bmi[7];
}

try {
  console.log(calculateBmi(process.argv));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong!';
  if (error instanceof Error) errorMessage = 'Error: ' + error.message;
  console.log(errorMessage);
}