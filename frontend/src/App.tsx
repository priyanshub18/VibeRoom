import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthCallBack from "./pages/AuthCallBack";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback signInForceRedirectUrl={"/auth-callback"} />} />
        <Route path='/auth-callback' element={<AuthCallBack />} />
      </Routes>
    </>
  );
}

export default App;
