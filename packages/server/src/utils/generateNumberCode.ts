const generateNumberCode = (numberCaracteres: number): number => {
  let count = 1;
  let number = 1;
  while (count < numberCaracteres) {
    count += 1;
    number *= 10;
  }
  return Math.floor(number + Math.random() * (number * 9));
};

export default generateNumberCode;
