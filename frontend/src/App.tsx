import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthCallBack from "./pages/AuthCallBack";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./pages/ChatPage";
function App() {
  return (
    <>
      <Routes>
        <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback signInForceRedirectUrl={"/auth-callback"} />} />
        <Route path='/auth-callback' element={<AuthCallBack />} />
        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/chat' element={<ChatPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
