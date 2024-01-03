import { useState } from "react";
import PasswordValidation from "./PasswordValidation";
import { useNavigate } from "react-router-dom";
import api from "../Utils/AxiosApi";
import axios from "axios";

function Signin() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isUppercase, setIsUppercase] = useState(false);
  const [isLowercase, setIsLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [isLengthValid, setIsLengthValid] = useState(false);
  const navigate = useNavigate();
  const handleNameChange = (value: string) => {
    setFullName(value);
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

  const handleSignUpButton = async () => {
    try {
      const data = {
        email,
        password,
    };
    const data1 = { ...data, fullName };
      const response = await api.post('http://localhost:3001/user', data1);
      console.log(response.status);
      if (response.status === 201) {
        const dbResponse = await api.post('http://localhost:3001/login', data);
          if (dbResponse.status === 200) {
            const { token, userId } = dbResponse.data;
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            navigate('/dashboard');
          }
      }
      // Requisição bem-sucedida, agora redireciona para /dashboard
    } catch (error) {
      // Trate o erro conforme necessário
      console.error("Erro ao cadastrar:", error);
    }
  };

  const isFormValid = isPasswordMatch && isUppercase && isLowercase && hasNumber && isLengthValid;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "50vw", alignItems: "center" }}>
      <form style={{ display: "flex", flexDirection: "column", width: "30vw", alignItems: "center" }}>
        <input type="text" placeholder="Nome Completo" onChange={(e) => handleNameChange(e.target.value)} value={fullName} />
        <input type="email" placeholder="Email" onChange={(e) => handleEmailChange(e.target.value)} value={email} />
        <input type="password" placeholder="Password" onChange={(e) => handlePasswordChange(e.target.value)} value={password} />
        <input type="password" placeholder="Confirmar Password" onChange={(e) => handlePassword2Change(e.target.value)} value={password2} />
        <PasswordValidation
          isPasswordMatch={isPasswordMatch}
          isUppercase={isUppercase}
          isLowercase={isLowercase}
          hasNumber={hasNumber}
          isLengthValid={isLengthValid}
        />
        <button onClick={(e) => {
          e.preventDefault();
          handleSignUpButton();
          }} style={{ width: "15vh" }} disabled={!isFormValid}>Cadastrar</button>
      </form>
    </div>
  );
}

export default Signin;
