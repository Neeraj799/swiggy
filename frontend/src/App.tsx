import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import Layout from "./layouts/Layout";
import AuthCallbackpage from "./pages/AuthCallbackpage";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route path="/auth-callback" element={<AuthCallbackpage />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
