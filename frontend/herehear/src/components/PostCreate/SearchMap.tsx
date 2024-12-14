import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { selectLocationState } from "../../recoil/locationState";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function SearchMap() {
  const [search, setSearch] = useState("");
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const setLocation = useSetRecoilState(selectLocationState); // 상태 업데이트만 수행

  const navigate = useNavigate();

  useEffect(() => {
    const loadKakaoMap = () => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
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

      window.kakao.maps.event.addListener(kakaoMarker, "dragend", () => {
        const position = kakaoMarker.getPosition();
        updateLocation(position.getLat(), position.getLng());
      });
    };

    const updateLocation = (lat: number, lng: number) => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.coord2Address(lng, lat, (result: any[], status: string) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const address = result[0]?.address?.address_name || "";
          const dong = result[0]?.address?.region_3depth_name || "";
          setLocation({
            name: "선택된 위치",
            address,
            x: lng,
            y: lat,
            dong,
          });
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

        setLocation({
          name: place.place_name,
          address: place.address_name || "",
          x: parseFloat(place.x),
          y: parseFloat(place.y),
          dong: place.road_address_name || "",
        });
      }
    });
  }, [search, map, marker, setLocation]);

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-0 left-0 w-full flex items-center justify-between p-4 bg-white border-b z-20">
        <button onClick={() => navigate(-1)} className="text-gray-500 text-lg">
          ✕
        </button>
        <h2 className="text-lg font-bold">장소 검색</h2>
        <div />
      </div>

      <div id="map" className="absolute inset-0 z-0" />

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
