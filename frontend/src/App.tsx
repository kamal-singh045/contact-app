import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UsersProvider from "./contexts/UserContext";

const App = () => {
    return <div>
        <UsersProvider>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </UsersProvider>
    </div>
}

export default App;