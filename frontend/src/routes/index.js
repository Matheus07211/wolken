import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Home from "../pages/Home/home";
import Signin from "../pages/Signin/signin";
import Signup from "../pages/Signup/signup";
import Upload from "../pages/Upload/upload";
import Campanha from "../pages/Campanha/campanha";
import Mensagem from "../pages/Mensagem/mensagem";

const Private = ({ Item }) => {
  const { signed } = useAuth();

  if (!signed) {
    return <Signin />;
  }

  return <Item />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          {/* Rotas protegidas */}
          <Route exact path="/home" element={<Private Item={Home} />} />
          <Route exact path="/upload" element={<Private Item={Upload} />} />
          <Route exact path="/campanha" element={<Private Item={Campanha} />} />
          <Route exact path="/mensagem" element={<Private Item={Mensagem} />} />

          {/* Rotas públicas */}
          <Route path="/" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="*" element={<Signin />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
