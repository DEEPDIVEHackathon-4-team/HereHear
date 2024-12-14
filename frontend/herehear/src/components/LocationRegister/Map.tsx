import { useEffect, useState } from "react";
import { HiMapPin } from "react-icons/hi2";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  search: string;
}

export default function Map({ search }: MapProps) {
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null); // 기본값 null로 설정

  useEffect(() => {
    const fetchCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error("Geolocation error:", error);
            setCurrentLocation({ lat: 37.5665, lng: 126.978 }); // 기본 위치: 서울
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setCurrentLocation({ lat: 37.5665, lng: 126.978 }); // 기본 위치: 서울
      }
    };

    fetchCurrentLocation();
  }, []);

  useEffect(() => {
    if (!currentLocation) return;

    const loadKakaoMap = () => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(
          currentLocation.lat,
          currentLocation.lng
        ),
        level: 3,
      };
      const kakaoMap = new window.kakao.maps.Map(container, options);

      // 검색어를 기반으로 마커 추가
      if (search) {
        const ps = new window.kakao.maps.services.Places();
        ps.keywordSearch(search, (data: any[], status: string) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const bounds = new window.kakao.maps.LatLngBounds();
            data.forEach((place) => {
              new window.kakao.maps.Marker({
                map: kakaoMap,
                position: new window.kakao.maps.LatLng(place.y, place.x),
              });
              bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
            });

            kakaoMap.setBounds(bounds);
          }
        });
      }
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
  }, [currentLocation, search]);

  return (
    <div className="relative w-full h-full">
      {!currentLocation && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 z-10">
          현재 위치를 불러오는 중입니다...
        </div>
      )}
      <div id="map" className="w-full h-full" />
      {currentLocation && (
        <div
          className="absolute z-10"
          style={{
            fontSize: "32px",
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "50%",
            color: "red",
          }}
        >
          <HiMapPin />
        </div>
      )}
    </div>
  );
}
