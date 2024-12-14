import BottomBar from "../components/BottomBar";
import Header from "../components/PostList/Header";
import PostList from "./PostList";
export default function Board() {
  return (
    <div className="center-content flex flex-col bg-white relative">
      <Header />
      <div className="overflow-y-auto hidden-scrollbar flex-1">
        <PostList />
      </div>
      <footer className="h-20 flex justify-center">
        <div className="w-[90%]">
          <BottomBar />
        </div>
      </footer>
    </div>
  );
}
