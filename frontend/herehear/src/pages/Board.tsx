import { useNavigate } from "react-router-dom";
import BottomBar from "../components/BottomBar";
import Header from "../components/PostList/Header";
import PostList from "./PostList";
import FloatingButton from "../components/Board/FloatingButton";

export default function Board() {
  const navigate = useNavigate();

  // 게시글 예시 데이터
  const posts = [
    {
      id: 1,
      category: "공지",
      title: "오늘 동네 행사 알림",
      content: "오늘 오후 3시에 동네 공원에서 소규모 플리마켓을 엽니다.",
      location: "동네1",
      timeAgo: "3시간 전",
      views: 120,
      likes: 15,
      dislikes: 2,
      comments: 5,
      imageUrl: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      category: "공지",
      title: "동네 회의 일정 공지",
      content: "다음 주 수요일 오후 7시에 동네 주민 회의를 진행합니다.",
      location: "동네2",
      timeAgo: "1일 전",
      views: 95,
      likes: 8,
      dislikes: 0,
      comments: 3,
      imageUrl: "https://via.placeholder.com/80",
    },
  ];

  return (
    <div className="center-content flex flex-col bg-white relative h-screen">
      <Header />
      <div className="overflow-y-auto hidden-scrollbar flex-grow">
        {/* PostList 컴포넌트로 데이터 전달 */}
        <PostList posts={posts} />
      </div>
      <div className="right-8 bottom-24 absolute">
        <FloatingButton onClick={() => navigate("/postcreate")} />
      </div>
      <footer className="h-20 flex justify-center">
        <div className="w-full">
          <BottomBar />
        </div>
      </footer>
    </div>
  );
}
