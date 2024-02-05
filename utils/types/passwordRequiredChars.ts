export default function passwordHasRequiredChars(password: string) {
  const hasUppercase = password.toLowerCase() !== password;
  const hasLowercase = password.toUpperCase() !== password;
  const hasNumbers = Array.from(password).some((char) => !isNaN(Number(char)));
  const hasSymbols = Array.from(password).some((char) =>
    /^[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(char)
  );

  return hasUppercase && hasLowercase && hasNumbers && hasSymbols;
}
