import "./App.css";
import { RecoilRoot } from "recoil";
import { Route, Routes } from "react-router-dom";
import MapTest from "./MapTest";
import Home from "./pages/Home";
import LocationRegister from "./pages/LocationRegister";
import MyProfile from "./pages/MyProfile";
import PostCreate from "./pages/PostCreate";
import PostDetail from "./pages/PostDetail";
import LocationEdit from "./pages/LocationEdit";
import Board from "./pages/Board";

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/map" element={<MapTest />} />
        <Route path="/home" element={<Home />} />
        <Route path="/board" element={<Board />} />
        <Route path="/location" element={<LocationRegister />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/postcreate" element={<PostCreate />} />
        <Route path="/postdetail" element={<PostDetail />} />
        <Route path="/locationedit" element={<LocationEdit />} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
