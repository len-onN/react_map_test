import { useState } from "react";

function Signin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isUppercase, setIsUppercase] = useState(false);
  const [isLowercase, setIsLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [isLengthValid, setIsLengthValid] = useState(false);

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    // Adicione lógica de validação do password aqui
    setIsPasswordMatch(value === password2);
    setIsUppercase(/[A-Z]/.test(value));
    setIsLowercase(/[a-z]/.test(value));
    setHasNumber(/\d/.test(value));
    setIsLengthValid(value.length >= 8);
  };

  const handlePassword2Change = (value: string) => {
    setPassword2(value);
    // Verifica se a senha coincide quando a segunda senha é inserida
    setIsPasswordMatch(password === value);
  };

  const isFormValid = isPasswordMatch && isUppercase && isLowercase && hasNumber && isLengthValid;

  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column", width: "30vw", alignItems: "center" }}>
        <input type="text" placeholder="Nome Completo" onChange={(e) => handleNameChange(e.target.value)} value={name} />
        <input type="email" placeholder="Email" onChange={(e) => handleEmailChange(e.target.value)} value={email} />
        <input type="password" placeholder="Password" onChange={(e) => handlePasswordChange(e.target.value)} value={password} />
        <input type="password" placeholder="Confirmar Password" onChange={(e) => handlePassword2Change(e.target.value)} value={password2} />
        <ul>
          <li style={{ color: isPasswordMatch ? 'green' : 'red' }}>Senhas coincidentes</li>
          <li style={{ color: isUppercase ? 'green' : 'red' }}>Maiúscula</li>
          <li style={{ color: isLowercase ? 'green' : 'red' }}>Minúscula</li>
          <li style={{ color: hasNumber ? 'green' : 'red' }}>Número</li>
          <li style={{ color: isLengthValid ? 'green' : 'red' }}>8 caracteres</li>
        </ul>
        <button style={{ width: "15vh" }} type="submit" disabled={!isFormValid}>Cadastrar</button>
      </form>
    </div>
  );
}

export default Signin;
