import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Map from "../components/LocationRegister/Map";
import { locationState } from "../recoil/locationState";

export default function LocationRegister() {
  const navigate = useNavigate();
  const [location, setLocation] = useRecoilState(locationState);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSave = () => {
    if (location.name && location.address) {
      alert(`활동지 "${location.name}" (${location.dong})가 저장되었습니다.`);
      navigate("/home");
    } else {
      alert("활동지를 선택해주세요.");
    }
  };

  return (
    <div className="center-content flex flex-col bg-white relative">
      <div className="flex flex-col h-screen">
        {/* 상단 */}
        <div className="px-5 pt-[76px]">
          <h1 className="text-[26px] font-bold">주 활동지 추가</h1>
          <p className="text-[18px] text-gray-600 text-sm mt-[30px]">
            지도를 움직이거나 주소를 입력하세요
          </p>
        </div>

        {/* 검색 입력란 */}
        <div className="px-5 mt-[17px]">
          <input
            type="text"
            placeholder="장소명을 검색하세요"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        {/* 지도 영역 */}
        <div className="mt-4 flex items-center justify-center">
          <div className="w-[390px] h-[321px] border border-gray-300 rounded-md overflow-hidden">
            {/* setLocation 전달 */}
            <Map search={search} setLocation={setLocation} />
          </div>
        </div>

        {/* 지도 아래 주소 정보 표시 */}
        <div className="px-5 mt-5">
          {location.address && (
            <div>
              <div className="text-sm text-gray-500 mb-1">주소</div>
              <div className="text-lg font-medium">{location.address}</div>
              <div className="text-sm text-gray-500 mt-1">{location.dong}</div>
            </div>
          )}
        </div>

        {/* 저장 버튼 */}
        <div
          className="absolute left-0 right-0 px-5"
          style={{ bottom: "82px" }}
        >
          <button
            className="w-full py-3 bg-blue-500 text-white font-bold rounded-md"
            onClick={handleSave}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
