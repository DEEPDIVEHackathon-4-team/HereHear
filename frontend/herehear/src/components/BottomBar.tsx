import { useNavigate, useLocation } from "react-router-dom";
import { IoMapOutline, IoMapSharp } from "react-icons/io5";
import { MdOutlineFeed, MdFeed } from "react-icons/md";
import { BsPerson, BsPersonFill } from "react-icons/bs";

export default function BottomBar() {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 확인

  // 아이콘 상태를 현재 경로에 따라 변경
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="border-t h-[72px] flex items-center justify-center">
      <div className="flex justify-between w-full max-w-[300px] gap-[60px]">
        {/* 홈 버튼 */}
        <div
          className="flex flex-col justify-center items-center cursor-pointer"
          onClick={() => navigate("/home")}
        >
          {isActive("/home") ? (
            <IoMapSharp className="text-blue-500 text-2xl" />
          ) : (
            <IoMapOutline className="text-gray-500 text-2xl" />
          )}
          <div
            className={`text-sm font-medium ${
              isActive("/home") ? "text-blue-500" : "text-gray-500"
            }`}
          >
            홈
          </div>
        </div>

        {/* 게시글 버튼 */}
        <div
          className="flex flex-col justify-center items-center cursor-pointer"
          onClick={() => navigate("/board")}
        >
          {isActive("/board") ? (
            <MdFeed className="text-blue-500 text-2xl" />
          ) : (
            <MdOutlineFeed className="text-gray-500 text-2xl" />
          )}
          <div
            className={`text-sm font-medium ${
              isActive("/board") ? "text-blue-500" : "text-gray-500"
            }`}
          >
            게시글
          </div>
        </div>

        {/* 내 정보 버튼 */}
        <div
          className="flex flex-col justify-center items-center cursor-pointer"
          onClick={() => navigate("/myprofile")}
        >
          {isActive("/myprofile") ? (
            <BsPersonFill className="text-blue-500 text-2xl" />
          ) : (
            <BsPerson className="text-gray-500 text-2xl" />
          )}
          <div
            className={`text-sm font-medium ${
              isActive("/myprofile") ? "text-blue-500" : "text-gray-500"
            }`}
          >
            내 정보
          </div>
        </div>
      </div>
    </div>
  );
}
