import { Route, Routes } from 'react-router-dom';
import Geolucky from '../Pages/Geolucky';
import InitialPage from '../Pages/Initial';
import Raffles from '../Pages/Raffles';
import EmailConfirmer from '../Components/EmailConfirmer';

function Router() {
    return (
        <Routes>
            <Route path="/" element={ <InitialPage/> } />
            <Route path="/dashboard" element={ <Geolucky/>} />
            <Route path="/raffles" element={ <Raffles/> } />
            <Route path="/confirm/:token" element={ <EmailConfirmer />} />
        </Routes>
    )
}

export default Router;