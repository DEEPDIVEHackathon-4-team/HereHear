import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate
import { useEffect } from "react";
import { locationState } from "../../recoil/locationState";

export default function Header() {
  const [location, setLocation] = useRecoilState(locationState);
  const navigate = useNavigate();

  // 로컬스토리지에서 동네 정보 불러오기
  useEffect(() => {
    const savedLocation = localStorage.getItem("location");
    if (savedLocation) {
      setLocation(JSON.parse(savedLocation));
    }
  }, [setLocation]);

  const handleLocationEdit = () => {
    navigate("/locationedit");
  };

  return (
    <div className="flex justify-between items-center px-5 py-3 border-b h-[50px]">
      <div
        className="text-lg font-semibold cursor-pointer"
        onClick={handleLocationEdit}
      >
        {location.dong || "동네 이름"}
      </div>
    </div>
  );
}
