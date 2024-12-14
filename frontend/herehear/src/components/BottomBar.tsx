import { useNavigate } from "react-router-dom";

export default function BottomBar() {
  const navigate = useNavigate();

  return (
    <div className="border-t h-[72px] flex items-center justify-center">
      <div className="flex justify-between w-full max-w-[300px] gap-[60px]">
        {/* 홈 버튼 */}
        <div
          className="flex flex-col justify-center items-center cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <div className="text-sm font-medium">홈</div>
        </div>

        {/* 게시글 버튼 */}
        <div
          className="flex flex-col justify-center items-center cursor-pointer"
          onClick={() => navigate("/board")}
        >
          <div className="text-sm font-medium">게시글</div>
        </div>

        {/* 내 정보 버튼 */}
        <div
          className="flex flex-col justify-center items-center cursor-pointer"
          onClick={() => navigate("/myprofile")}
        >
          <div className="text-sm font-medium">내 정보</div>
        </div>
      </div>
    </div>
  );
}
