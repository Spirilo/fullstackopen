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

const calculateBmi = (height: number, weight: number) : string => {
  const bmi = weight / (height * 2) * 100;
  console.log(bmi);
  if (bmi < 16) return Bmi[0];
  if (bmi <= 16.9) return Bmi[1];
  if (bmi <= 18.4) return Bmi[2];
  if (bmi <= 24.9) return Bmi[3];
  if (bmi <= 29.9) return Bmi[4];
  if (bmi <= 34.9) return Bmi[5];
  if (bmi < 39.9) return Bmi[6];
  return Bmi[7];
}

console.log(calculateBmi(180, 74));
console.log(calculateBmi(160, 55));
console.log(calculateBmi(178, 82));
console.log(calculateBmi(180, 200));
