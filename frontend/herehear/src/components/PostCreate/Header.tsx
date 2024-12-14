import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const handleComplete = () => {
    alert("글 작성 완료!");
    navigate("/board");
  };
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b">
      {/* X 버튼 */}
      <button onClick={() => navigate("/board")}>
        <span className="text-xl text-gray-600">✕</span>
      </button>

      {/* 가운데 텍스트 */}
      <h1 className="text-lg font-semibold">글쓰기</h1>

      {/* 완료 버튼 */}
      <button onClick={handleComplete} className="text-sm  font-medium">
        완료
      </button>
    </div>
  );
}
