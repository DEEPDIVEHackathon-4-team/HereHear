import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "axios";
import Map from "../components/LocationRegister/Map";
import { locationState } from "../recoil/locationState";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default function LocationRegister() {
  const navigate = useNavigate();
  const [location, setLocation] = useRecoilState(locationState);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSave = async () => {
    if (!location.name || !location.address) {
      alert("활동지를 선택해주세요.");
      return;
    }

    // API 요청 데이터 구성
    const requestData = {
      userId: 1, // 사용자 ID (예: 실제로는 인증 정보를 통해 가져와야 함)
      latitude: location.latitude, // 수정된 부분
      longitude: location.longitude, // 수정된 부분
      city: "서울특별시", // city: 예제 데이터 (필요 시 수정)
      district: "강남구", // district: 예제 데이터 (필요 시 수정)
      subdistrict: location.dong || "신사동", // subdistrict: 선택한 동 데이터
    };

    try {
      setIsLoading(true);
      // API 요청
      const response = await apiClient.post(
        "/api/v1/user/location",
        requestData
      );

      if (response.status === 200 || response.status === 201) {
        alert(`활동지 "${location.name}"가 저장되었습니다.`);
        localStorage.setItem("location", JSON.stringify(location));
        navigate("/home");
      }
    } catch (error) {
      console.error("활동지 저장 중 오류 발생:", error);
      alert("활동지 저장 중 문제가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
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
            className={`w-full py-3 font-bold rounded-md ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
}
