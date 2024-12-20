import "./App.css";
import { RecoilRoot } from "recoil";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LocationRegister from "./pages/LocationRegister";
import MyProfile from "./pages/MyProfile";
import PostCreate from "./pages/PostCreate";
import PostDetail from "./pages/PostDetail";
import LocationEdit from "./pages/LocationEdit";
import Board from "./pages/Board";
import SearchMap from "./components/PostCreate/SearchMap";

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/board" element={<Board />} />
        <Route path="/" element={<LocationRegister />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/postcreate" element={<PostCreate />} />
        <Route path="/postdetail" element={<PostDetail />} />
        <Route path="/locationedit" element={<LocationEdit />} />
        <Route
          path="/searchmap"
          element={<SearchMap onClose={() => console.log("SearchMap 닫힘")} />}
        />
        <Route path="/postDetail/:id" element={<PostDetail />} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
