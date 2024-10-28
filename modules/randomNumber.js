export const randomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 1000);
  return randomNumber.toString().padStart(3, '0');
}