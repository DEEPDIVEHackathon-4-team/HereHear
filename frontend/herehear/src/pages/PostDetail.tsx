import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillAlert } from "react-icons/ai";
import { MdFestival } from "react-icons/md";
import { RiAlertFill } from "react-icons/ri";
import { BsBasket3Fill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
// 카테고리 매핑 테이블
const categoryMap: Record<string, { name: string; icon: JSX.Element }> = {
  ACCIDENT: {
    name: "사건사고",
    icon: <AiFillAlert className="text-gray-400" />,
  },
  EVENT: {
    name: "동네이벤트",
    icon: <MdFestival className="text-gray-400" />,
  },
  RECENT_ISSUE: {
    name: "최근이슈",
    icon: <RiAlertFill className="text-gray-400" />,
  },
  MISSING: {
    name: "분실/실종",
    icon: <BsBasket3Fill className="text-gray-400" />,
  },
};

interface PostData {
  id: number;
  category: string;
  title: string;
  contents: string;
  likeCount: number;
  img?: string;
  viewCount: number;
  createdAt: string;
}

interface Comment {
  id: number;
  user: {
    profileImage: string;
    username: string;
    location: string;
    timeAgo: string;
  };
  content: string;
}

export default function PostDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [postData, setPostData] = useState<PostData | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://172.16.108.55:8080/api/v1/poster/search`,
          {
            params: { id },
            headers: {
              Accept: "*/*",
            },
          }
        );

        console.log("Fetched Post Data:", response.data.data);
        setPostData(response.data.data);
        setComments([
          {
            id: 1,
            user: {
              profileImage: "https://via.placeholder.com/40",
              username: "commenter1",
              location: "서울시 종로구",
              timeAgo: "1시간 전",
            },
            content: "정말 재미있을 것 같아요! 참여하고 싶습니다.",
          },
          {
            id: 2,
            user: {
              profileImage: "https://via.placeholder.com/40",
              username: "commenter2",
              location: "서울시 마포구",
              timeAgo: "2시간 전",
            },
            content: "좋은 정보 감사합니다!",
          },
        ]);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!postData) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p>게시글을 불러오는 중입니다...</p>
      </div>
    );
  }

  const categoryData = categoryMap[postData.category] || {
    name: "기타",
    icon: <AiFillAlert className="text-gray-500" />,
  };

  return (
    <div className="h-full w-full flex flex-col r relative">
      {/* 헤더 */}
      <header className="relative flex items-center p-4 border-b">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 text-gray-600 text-lg"
        >
          <IoIosArrowBack size={32} />
        </button>
        <h1 className="text-lg font-bold mx-auto">게시글 상세</h1>
      </header>

      {/* 내용 */}
      <div className="flex-1 overflow-auto scrollbar-hide px-5 py-4">
        {/* 카테고리 */}
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 border border-gray-300 rounded-[16px] w-auto">
          {categoryData.icon}
          <span className="text-sm text-gray-600">{categoryData.name}</span>
        </div>

        {/* 유저 정보 */}
        <div className="flex items-center mb-5">
          <div className="w-12 h-12 rounded-full overflow-hidden border mr-3">
            <img
              src="https://via.placeholder.com/80"
              alt="프로필"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-sm font-medium">작성자</div>
            <div className="text-xs text-gray-500">
              서울시 강남구 • 3시간 전
            </div>
          </div>
        </div>

        {/* 제목 */}
        <h2 className="text-xl font-bold mb-3">{postData.title}</h2>

        {/* 내용 */}
        <p className="text-gray-800 leading-relaxed">{postData.contents}</p>

        {/* 이미지 (옵션) */}
        {postData.img && (
          <div className="mt-4">
            <img
              src={postData.img}
              alt="게시글 이미지"
              className="w-full rounded-md"
            />
          </div>
        )}

        {/* 조회수 및 신고 버튼 */}
        <div className="flex items-center justify-between mt-5">
          <div className="text-sm text-gray-500">
            조회수 {postData.viewCount}회
          </div>
          <button className="text-sm  font-medium">신고하기</button>
        </div>

        {/* 회색 구분선 */}
        <div className="w-full h-[1px] bg-gray-200 my-4"></div>

        {/* 댓글 섹션 */}
        <div>
          <div className="text-sm font-medium text-gray-600 mb-4">
            댓글 {comments.length}개
          </div>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start">
                <div className="w-10 h-10 rounded-full overflow-hidden border mr-3">
                  <img
                    src={comment.user.profileImage}
                    alt="프로필"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium">
                    {comment.user.username}
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    {comment.user.location} • {comment.user.timeAgo}
                  </div>
                  <p className="text-sm text-gray-800">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 댓글 입력란 */}
      <footer className="border-t h-[72px] flex items-center px-5 bg-white">
        <input
          type="text"
          placeholder="댓글을 입력하세요"
          className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
      </footer>
    </div>
  );
}
