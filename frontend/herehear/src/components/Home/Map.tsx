import { useEffect, useState } from "react";

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
            // 위치 가져오기 실패 시 기본 위치로 설정
            setCurrentLocation({ lat: 37.5665, lng: 126.978 });
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        // Geolocation 미지원 시 기본 위치로 설정
        setCurrentLocation({ lat: 37.5665, lng: 126.978 });
      }
    };

    fetchCurrentLocation();
  }, []);

  useEffect(() => {
    if (!currentLocation) return; // 위치 정보가 없으면 지도 로딩 중단

    const loadKakaoMap = () => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(
          currentLocation.lat,
          currentLocation.lng
        ),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);

      // 현재 위치에 커스텀 오버레이(빨간 동그라미) 추가
      new window.kakao.maps.CustomOverlay({
        map,
        position: new window.kakao.maps.LatLng(
          currentLocation.lat,
          currentLocation.lng
        ),
        content: `<div style="
          width: 15px; 
          height: 15px; 
          background-color: red; 
          border-radius: 50%; 
          border: 2px solid white;
          box-shadow: 0 0 5px rgba(0,0,0,0.5);">
        </div>`,
        zIndex: 1,
      });

      if (search) {
        const ps = new window.kakao.maps.services.Places();
        ps.keywordSearch(search, (data: any[], status: string) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const bounds = new window.kakao.maps.LatLngBounds();
            data.forEach((place) => {
              new window.kakao.maps.Marker({
                map,
                position: new window.kakao.maps.LatLng(place.y, place.x),
              });
              bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
            });

            map.setBounds(bounds);
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
  }, [search, currentLocation]);

  return (
    <div className="w-full h-full">
      {!currentLocation && (
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          현재 위치를 불러오는 중입니다...
        </div>
      )}
      <div id="map" className="w-full h-full" />
    </div>
  );
}
