import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Routes>
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
