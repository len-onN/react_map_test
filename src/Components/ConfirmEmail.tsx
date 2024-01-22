import { useEffect } from "react";
import api from "../Utils/AxiosApi";

type ConfirmEmailProps = {
    token: string,
}

function ConfirmEmail({ token }: ConfirmEmailProps) {
    const sendNewToken = async () => {
        const userIdP = localStorage.getItem('userId');
        console.log(userIdP);
        // let userId;
        if (userIdP !== null) {
            // userId = JSON.parse(userIdP)
            const response = await api.post('http://localhost:3001/sendconfirmation', { userId: userIdP });
            console.log(response);
        }
    };
    useEffect(() => {
        console.log(typeof token, token, token === 'invalid');
    }, []);
    return (
        <div>
            <p>Para ter acesso à página de escolha, confirme o e-mail de confirmação. Cheque a caixa de spans.</p>
            { token === 'invalid' && <div> <p>Token Expirado</p> <button onClick={ () => sendNewToken() }>Renovar token</button> </div>}
        </div>
    )
};

export default ConfirmEmail;