import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import api from "../Utils/AxiosApi";


function EmailConfirmer() {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const { token } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const verify = async () => {
            const response = await api.post('http://localhost:3001/confirm', { token });
            console.log(response.status, response);
            if (response.status === 200) {
                setIsConfirmed(true);
                if(isConfirmed) {
                    navigate('/dashboard');
                }
            };
        };
        verify();
    }, [token, isConfirmed, setIsConfirmed, navigate])
    return (
        <div>
            { isConfirmed ? 'confirmado' : 'carregando'}
        </div>
    );
};

export default EmailConfirmer;