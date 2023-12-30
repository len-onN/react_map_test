import { Route, Routes } from 'react-router-dom';
import Geolucky from '../Pages/Geolucky';
import InitialPage from '../Pages/Initial';

function Router() {
    return (
        <Routes>
            <Route path="/" element={ <InitialPage/> } />
            <Route path="/dashboard" element={ <Geolucky/>} />
        </Routes>
    )
}

export default Router;