
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../Page/Login";
import { Register } from "../Page/Login/register";
import Home from "../Page/Home";
import { PublicRoute } from "./PublicRoute";
import { Auth } from "../Page/Auth";
const AppRoutes = () => {

  return(
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          }
        >
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="home" element={<Home/>} /> 
      </Routes>
    </BrowserRouter>
  )
}

export { AppRoutes }