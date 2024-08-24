export const generatePassword = (
  length: number,
  checkType: {
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
  }
): string => {
  const capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const smallLetters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+{}:\"<>?|[];',./";

  let allChars = "";
  allChars = smallLetters + capitalLetters + numbers + symbols;

  if (checkType.uppercase === false) {
    allChars = allChars.replace(capitalLetters, "");
  }
  if (checkType.lowercase === false) {
    allChars = allChars.replace(smallLetters, "");
  }
  if (checkType.numbers === false) {
    allChars = allChars.replace(numbers, "");
  }
  if (checkType.symbols === false) {
    allChars = allChars.replace(symbols, "");
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    console.log(Math.random());
    console.log(randomIndex);
    password += allChars[randomIndex];
  }
  return password;
};
