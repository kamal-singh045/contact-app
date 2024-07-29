import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UsersProvider from "./contexts/ContactsContext";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <UsersProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Toaster />
      </UsersProvider>
    </div>
  );
};

export default App;
