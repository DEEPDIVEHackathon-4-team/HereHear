interface PostProps {
  category: string; // 카테고리
  title: string; // 제목
  content: string; // 내용
  city: string; // 동네 이름 (기존 location 필드와 매핑)
  createdAt: string; // 작성 시간 (timeAgo로 변환)
  commentCount: number; // 댓글 수
  likeCount: number; // 좋아요 수
  dislikeCount: number; // 싫어요 수
  viewCount: number; // 조회수
  imageUrl?: string; // 이미지 URL (옵션)
}

// 카테고리 매핑 테이블
const categoryMap: Record<string, string> = {
  ACCIDENT: "사건사고",
  EVENT: "동네이벤트",
  RECENT_ISSUE: "최근이슈",
  MISSING: "분실/실종",
};

export default function Post({
  category,
  title,
  content,
  city,
  createdAt,
  commentCount,
  likeCount,
  dislikeCount,
  viewCount,
  imageUrl,
}: PostProps) {
  // 작성 시간을 '몇 시간 전' 형식으로 변환
  const timeAgo = (() => {
    const now = new Date();
    const created = new Date(createdAt);
    const diff = Math.floor((now.getTime() - created.getTime()) / (1000 * 60)); // 분 단위 차이

    if (diff < 60) return `${diff}분 전`;
    if (diff < 1440) return `${Math.floor(diff / 60)}시간 전`;
    return `${Math.floor(diff / 1440)}일 전`;
  })();

  // 카테고리 매핑
  const displayCategory = categoryMap[category] || "기타";

  return (
    <div className="w-full flex items-start border-b">
      <div className="flex-grow px-5 py-5">
        {/* 카테고리 */}
        <div className="bg-gray-100 text-gray-600 text-[11px] font-bold rounded-sm w-[50px] h-[20px] flex items-center justify-center mb-2">
          {displayCategory}
        </div>

        {/* 제목과 내용 */}
        <div className="flex">
          <div className="flex-grow">
            <h2 className="text-[18px] font-semibold mb-2">{title}</h2>
            <p className="text-[16px] text-gray-700 line-clamp-2">{content}</p>
          </div>
          {imageUrl && (
            <div className="ml-4 flex-shrink-0">
              <img
                src={imageUrl}
                alt={title}
                className="w-20 h-20 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        {/* 하단 정보 */}
        <div className="flex justify-between items-center text-[14px] text-gray-500 mt-[8px]">
          {/* 왼쪽 정보: 동네 이름, 작성 시간, 조회수 */}
          <div className="flex items-center gap-2">
            <span>{city}</span>
            <span className="text-customGray">·</span>
            <span>{timeAgo}</span>
            <span className="text-customGray">·</span>
            <span>조회수 {viewCount}</span>
          </div>

          {/* 오른쪽 정보: 좋아요, 싫어요, 댓글 수 */}
          <div className="flex items-center gap-4">
            {/* 좋아요 */}
            <div className="flex items-center gap-1">
              <img src="/1.png" alt="좋아요 아이콘" className="w-4 h-4" />
              <span className="font-bold">{likeCount}</span>
            </div>

            {/* 싫어요 */}
            <div className="flex items-center gap-1">
              <img src="/2.png" alt="싫어요 아이콘" className="w-4 h-4" />
              <span className="font-bold">{dislikeCount}</span>
            </div>

            {/* 댓글 */}
            <div className="flex items-center gap-1">
              <img src="/3.png" alt="댓글 아이콘" className="w-4 h-4" />
              <span className="font-bold">{commentCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
