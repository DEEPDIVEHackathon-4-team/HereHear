import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BottomBar from "../components/BottomBar";
import Header from "../components/PostList/Header";
import PostList from "./PostList";
import FloatingButton from "../components/Board/FloatingButton";

interface PostData {
  category: string;
  title: string;
  content: string;
  createdAt: string;
  commentCount: number;
  userId: number;
  nickname: string;
  city: string;
}

export default function Board() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostData[]>([]); // 초기값을 빈 배열로 설정
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://172.16.108.26:8080/api/v1/poster/board",
          {
            params: {
              category: "ACCIDENT",
              regionName: "경기도 성남시 분당구 서현동",
              page: 0,
              size: 10,
            },
            headers: {
              Accept: "*/*",
            },
          }
        );

        if (response.data?.data?.content) {
          setPosts(response.data.data.content); // 유효한 데이터 설정
        } else {
          setPosts([]); // 응답 데이터가 없을 경우 빈 배열로 초기화
        }
      } catch (error) {
        console.error("게시글을 불러오는 중 오류 발생:", error);
        setPosts([]); // 오류 발생 시 빈 배열로 초기화
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="center-content flex flex-col bg-white relative h-screen">
      <Header />
      <div className="overflow-y-auto hidden-scrollbar flex-grow">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <p>로딩 중...</p>
          </div>
        ) : (
          <PostList posts={posts || []} />
        )}
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
