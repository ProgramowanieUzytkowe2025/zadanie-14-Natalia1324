import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { LoaderProvider, useLoader } from "./LoaderContext";
import Loader from "./components/Loader";

import Koty from "./components/Koty";
import FormularzKota from "./components/FormularzKota";
import LoaderBridge from "./components/LoaderBridge";

function AppContent() {
  const { loading } = useLoader();

  return (
    <>
      <LoaderBridge />
      {loading && <Loader />}

      <Routes>
        <Route path="/" element={<Koty />} />
        <Route path="/dodaj" element={<FormularzKota />} />
        <Route path="/edytuj/:id" element={<FormularzKota />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

function App() {
  return (
    <LoaderProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LoaderProvider>
  );
}

export default App;
