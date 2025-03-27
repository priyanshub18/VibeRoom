import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthCallBack from "./pages/AuthCallBack";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./pages/ChatPage";
import AlbumPage from "./pages/AlbumPage";
import Queue from "./pages/Queue";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <>
      <Routes>
        <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback signInForceRedirectUrl={"/auth-callback"} />} />
        <Route path='/auth-callback' element={<AuthCallBack />} />
        <Route path='/admin' element={<AdminPage />} />

        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/albums/:albumId' element={<AlbumPage />} />
          <Route path='/queue' element={<Queue />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
