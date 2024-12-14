import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostDetail() {
  const navigate = useNavigate();

  // 예시 데이터
  const post = {
    id: 1,
    category: "동네이벤트",
    user: {
      profileImage: "https://via.placeholder.com/80", // 프로필 이미지 URL
      username: "john_doe",
      location: "서울시 강남구",
      timeAgo: "3시간 전",
    },
    title: "동네 마라톤 이벤트",
    content: "이번 주말에 열리는 동네 마라톤 이벤트에 많은 참여 부탁드립니다!",
    imageUrl: "https://via.placeholder.com/300", // 게시글 이미지 URL (없을 수도 있음)
    views: 120,
  };

  const comments = [
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
  ];

  const [commentInput, setCommentInput] = useState("");

  return (
    <div className="h-full w-full flex flex-col r relative">
      {/* 헤더 */}
      <header className="relative flex items-center p-4 border-b">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 text-gray-600 text-lg"
        >
          ←
        </button>
        <h1 className="text-lg font-bold mx-auto">게시글 상세</h1>
      </header>

      {/* 내용 */}
      <div className="flex-1 overflow-auto scrollbar-hide px-5 py-4">
        {/* 카테고리 */}
        <div className="text-sm text-gray-600 mb-3">{post.category}</div>

        {/* 유저 정보 */}
        <div className="flex items-center mb-5">
          {/* 프로필 사진 */}
          <div className="w-12 h-12 rounded-full overflow-hidden border mr-3">
            <img
              src={post.user.profileImage}
              alt="프로필"
              className="w-full h-full object-cover"
            />
          </div>
          {/* 유저 정보 텍스트 */}
          <div>
            <div className="text-sm font-medium">{post.user.username}</div>
            <div className="text-xs text-gray-500">
              {post.user.location} • {post.user.timeAgo}
            </div>
          </div>
        </div>

        {/* 제목 */}
        <h2 className="text-xl font-bold mb-3">{post.title}</h2>

        {/* 내용 */}
        <p className="text-gray-800 leading-relaxed">{post.content}</p>

        {/* 이미지 (옵션) */}
        {post.imageUrl && (
          <div className="mt-4">
            <img
              src={post.imageUrl}
              alt="게시글 이미지"
              className="w-full rounded-md"
            />
          </div>
        )}

        {/* 조회수 및 신고 버튼 */}
        <div className="flex items-center justify-between mt-5">
          <div className="text-sm text-gray-500">조회수 {post.views}회</div>
          <button className="text-sm text-red-500 font-medium">신고하기</button>
        </div>

        {/* 회색 구분선 */}
        <div className="w-full h-[1px] bg-gray-200 my-4"></div>

        {/* 댓글 섹션 */}
        <div>
          {/* 댓글 수 */}
          <div className="text-sm font-medium text-gray-600 mb-4">
            댓글 {comments.length}개
          </div>

          {/* 댓글 목록 */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start">
                {/* 유저 프로필 */}
                <div className="w-10 h-10 rounded-full overflow-hidden border mr-3">
                  <img
                    src={comment.user.profileImage}
                    alt="프로필"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* 댓글 내용 */}
                <div>
                  {/* 아이디 */}
                  <div className="text-sm font-medium">
                    {comment.user.username}
                  </div>
                  {/* 위치와 시간 */}
                  <div className="text-xs text-gray-500 mb-2">
                    {comment.user.location} • {comment.user.timeAgo}
                  </div>
                  {/* 댓글 내용 */}
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
