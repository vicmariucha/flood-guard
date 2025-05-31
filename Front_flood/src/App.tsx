import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LoginPage from "./pages/Login/LoginPage"; 

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="*"
        element={
          <Layout
            userName="Victoria"
            cityName="Sorocaba"
          />
        }
      />
    </Routes>
  );
}

export default App;
