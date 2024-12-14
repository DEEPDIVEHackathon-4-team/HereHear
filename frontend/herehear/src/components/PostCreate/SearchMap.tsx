import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { selectLocationState } from "../../recoil/locationState";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function SearchMap({
  onClose,
}: {
  onClose: () => void;
  
}) {
  const [search, setSearch] = useState("");
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<{
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    dong: string;
  } | null>(null);
  const setLocation = useSetRecoilState(selectLocationState); // 상태 업데이트

  useEffect(() => {
    const loadKakaoMap = () => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978), // 초기 위치 설정
        level: 3,
      };
      const kakaoMap = new window.kakao.maps.Map(container, options);
      setMap(kakaoMap);

      const kakaoMarker = new window.kakao.maps.Marker({
        position: kakaoMap.getCenter(),
        map: kakaoMap,
        draggable: true,
      });
      setMarker(kakaoMarker);

      // 마커 드래그 이벤트 처리
      window.kakao.maps.event.addListener(kakaoMarker, "dragend", () => {
        const position = kakaoMarker.getPosition();
        updateLocation(position.getLat(), position.getLng());
      });
    };

    const updateLocation = (lat: number, lng: number) => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.coord2Address(lng, lat, (result: any[], status: string) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const addressInfo = result[0]?.address || {};
          const location = {
            name: "선택된 위치", // 장소 이름
            address: addressInfo.address_name || "", // 전체 주소
            latitude: lat, // 위도
            longitude: lng, // 경도
            dong: addressInfo.region_3depth_name || "", // 동 정보 (없으면 빈 문자열)
          };
          setLocation(location);
          setCurrentLocation(location);
        }
      });
    };

    if (window.kakao && window.kakao.maps) {
      loadKakaoMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
        import.meta.env.VITE_KAKAO_MAP_API_KEY
      }&autoload=false&libraries=services`;
      script.onload = () => window.kakao.maps.load(loadKakaoMap);
      document.head.appendChild(script);
    }
  }, [setLocation]);

  useEffect(() => {
    if (!map || !search.trim()) return;

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(search, (data: any[], status: string) => {
      if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
        const place = data[0];
        const position = new window.kakao.maps.LatLng(place.y, place.x);

        map.setCenter(position);
        if (marker) {
          marker.setPosition(position);
        }

        const location = {
          name: place.place_name || "검색된 위치", // 장소 이름
          address: place.address_name || "", // 전체 주소
          latitude: parseFloat(place.y), // 위도
          longitude: parseFloat(place.x), // 경도
          dong: place.region_3depth_name || "", // 동 정보 (없으면 빈 문자열)
        };
        setLocation(location);
        setCurrentLocation(location);
      }
    });
  }, [search, map, marker, setLocation]);

  const handleConfirm = () => {
    onClose(); // 지도 닫기
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full z-10 bg-white">
      {/* 헤더 */}
      <div className="absolute top-0 left-0 w-full flex items-center justify-between p-4 bg-white border-b z-20">
        <button onClick={onClose} className="text-gray-500 text-lg">
          ✕
        </button>
        <h2 className="text-lg font-bold">장소 검색</h2>
        <button onClick={handleConfirm} className="text-blue-500 text-lg">
          확인
        </button>
      </div>

      {/* 지도 영역 */}
      <div id="map" className="absolute inset-0 z-0" />

      {/* 검색 입력 */}
      <div className="absolute top-[78px] left-1/2 transform -translate-x-1/2 z-10 w-[90%]">
        <input
          type="text"
          placeholder="장소를 검색하세요"
          className="w-full p-3 rounded-[8px] shadow-md border border-gray-300 bg-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
