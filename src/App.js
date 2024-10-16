import { Route, Routes } from "react-router-dom";
import CreateCargo from "./pages/CreateCargo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateCargo />} />
    </Routes>
  );
}

export default App;
