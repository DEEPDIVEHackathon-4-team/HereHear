import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate
import { locationState } from "../../recoil/locationState";

export default function Header() {
  const [location] = useRecoilState(locationState);
  const navigate = useNavigate();

  const handleLocationEdit = () => {
    navigate("/locationedit");
  };

  return (
    <div className="flex justify-between items-center px-5 py-3 border-b">
      <div
        className="text-lg font-semibold cursor-pointer"
        onClick={handleLocationEdit}
      >
        {location.dong || "동네 이름"}
      </div>
    </div>
  );
}
