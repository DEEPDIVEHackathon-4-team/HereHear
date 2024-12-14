interface PostProps {
  category: string; // 카테고리
  title: string; // 제목
  content: string; // 내용
  city: string; // 동네 이름 (기존 location 필드와 매핑)
  createdAt: string; // 작성 시간 (timeAgo로 변환)
  commentCount: number; // 댓글 수
  imageUrl?: string; // 이미지 URL (옵션)
}

export default function Post({
  category,
  title,
  content,
  city,
  createdAt,
  commentCount,
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

  return (
    <div className="w-full flex items-start border-b">
      <div className="flex-grow px-5 py-5">
        {/* 카테고리 표시 */}
        <div className="bg-gray-100 text-gray-600 text-[11px] font-bold rounded-sm w-[50px] h-[20px] flex items-center justify-center mb-2">
          {category}
        </div>

        <div className="flex">
          <div className="flex-grow">
            {/* 제목과 내용 */}
            <h2 className="text-[18px] font-semibold mb-2">{title}</h2>
            <p className="text-[16px] text-gray-700 line-clamp-2">{content}</p>
          </div>
          {/* 이미지 표시 */}
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

        <div className="flex justify-between items-center text-[14px] text-gray-500 mt-[8px]">
          {/* 왼쪽 정보: 동네, 시간 */}
          <div className="flex items-center gap-2">
            <span>{city}</span>
            <span className="text-customGray">·</span>
            <span>{timeAgo}</span>
          </div>

          {/* 오른쪽 정보: 댓글 수 */}
          <div className="flex items-center gap-1">
            <span role="img" aria-label="댓글">
              💬
            </span>
            <span>{commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
