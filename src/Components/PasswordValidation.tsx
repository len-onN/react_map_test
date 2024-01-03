import React from "react";

interface PasswordValidationProps {
  isPasswordMatch: boolean;
  isUppercase: boolean;
  isLowercase: boolean;
  hasNumber: boolean;
  isLengthValid: boolean;
}

function PasswordValidation({
  isPasswordMatch,
  isUppercase,
  isLowercase,
  hasNumber,
  isLengthValid,
}: PasswordValidationProps) {
  return (
    <ul>
      <li style={{ color: isPasswordMatch ? 'green' : 'red' }}>Senhas coincidentes</li>
      <li style={{ color: isUppercase ? 'green' : 'red' }}>Maiúscula</li>
      <li style={{ color: isLowercase ? 'green' : 'red' }}>Minúscula</li>
      <li style={{ color: hasNumber ? 'green' : 'red' }}>Número</li>
      <li style={{ color: isLengthValid ? 'green' : 'red' }}>8 caracteres</li>
    </ul>
  );
}

export default PasswordValidation;
