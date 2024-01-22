// src/pages/home/index.tsx
import Login from "../Components/Login";
import { useState } from "react";
import Signin from "../Components/Signin";

function InitialPage() {
  const [switcher, setSwitcher] = useState(true);
    return (
      <div>
        <h1>Initial Page</h1>
        <button onClick={() => setSwitcher(!switcher)}>{switcher ? "Cadastro" : "Login"}</button>
        {switcher ? <Login /> : <Signin/>}
      </div>
    )
  }
  
  export default InitialPage;