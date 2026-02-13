import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layouts/Layout";
import AuthCallbackpage from "./pages/AuthCallbackpage";
import UserProfile from "./pages/UserProfile";
import { Toaster } from "sonner";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import OrderStatusPage from "./pages/OrderStatusPage";

function App() {
  return (
    <>
      <Toaster visibleToasts={1} position="top-right" richColors />
      <Routes>
        <Route
          path="/"
          element={
            <Layout showHero={true}>
              <Home />
            </Layout>
          }
        />
        <Route path="/auth-callback" element={<AuthCallbackpage />} />
        <Route
          path="/search/:city"
          element={
            <Layout showHero={false}>
              <SearchPage />
            </Layout>
          }
        />

        <Route
          path="/detail/:restaurantId"
          element={
            <Layout showHero={false}>
              <DetailPage />
            </Layout>
          }
        />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/order-status"
            element={
              <Layout>
                <OrderStatusPage />
              </Layout>
            }
          />

          <Route
            path="/user-profile"
            element={
              <Layout>
                <UserProfile />
              </Layout>
            }
          />

          <Route
            path="/manage-restaurant"
            element={
              <Layout>
                <ManageRestaurantPage />
              </Layout>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
