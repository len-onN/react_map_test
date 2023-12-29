import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (email: string) => {
        setEmail(email);
        console.log(email);
    };
    const handlePasswordChange = (password: string) => {
        setPassword(password);
    };

    const handleLoginButton = async () => {
        try {

            if (email && password.length > 5) {
                const response = await axios.post('/http://localhost:3001/login', {email, password});
                if (response.status === 200) {
                    navigate('/dashboard');
                }
            } 
        } catch (error) {
            console.error("Erro Login ", error);
        }
    };

    return (
      <div>
          <label>
            <input type="email" onChange={(e) => handleEmailChange(e.target.value)} value={email} />
          </label>
          <label>
            <input type="password" onChange={(e) => handlePasswordChange(e.target.value)} value={password} />
          </label>
          <button onClick={handleLoginButton}>Login</button>
      </div>  
    )
  }
  
  export default Login;