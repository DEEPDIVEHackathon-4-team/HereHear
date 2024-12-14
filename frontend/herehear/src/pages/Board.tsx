import { useNavigate } from "react-router-dom";
import BottomBar from "../components/BottomBar";
import Header from "../components/PostList/Header";
import PostList from "./PostList";
import FloatingButton from "../components/Board/FloatingButton";
export default function Board() {
  const navigate = useNavigate();
  return (
    <div className="center-content flex flex-col bg-white relative">
      <Header />
      <div className="overflow-y-auto hidden-scrollbar flex-1">
        <PostList />
      </div>
      <div className="right-8 bottom-24 absolute ">
        <FloatingButton onClick={() => navigate("/postcreate")} />
      </div>
      <footer className="h-20 flex justify-center ">
        <div className="w-full">
          <BottomBar />
        </div>
      </footer>
    </div>
  );
}
