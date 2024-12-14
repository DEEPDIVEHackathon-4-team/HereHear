import { useEffect, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  search: string;
  setLocation: React.Dispatch<
    React.SetStateAction<{
      name: string;
      address: string;
      x: number;
      y: number;
      dong: string;
    }>
  >;
}

export default function Map({ search, setLocation }: MapProps) {
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);

  useEffect(() => {
    const loadKakaoMap = () => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978), // 기본 위치: 서울
        level: 3,
      };

      const kakaoMap = new window.kakao.maps.Map(container, options);
      setMap(kakaoMap);

      // 마커 생성
      const kakaoMarker = new window.kakao.maps.Marker({
        position: kakaoMap.getCenter(), // 초기 지도 중심 위치
        map: kakaoMap,
      });
      setMarker(kakaoMarker);

      // 지도 이동 이벤트
      window.kakao.maps.event.addListener(kakaoMap, "dragend", () => {
        const center = kakaoMap.getCenter();
        kakaoMarker.setPosition(center); // 마커를 지도 중심으로 이동

        // 좌표로 주소 변환
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(
          center.getLng(),
          center.getLat(),
          (result: any[], status: string) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const address = result[0]?.address?.address_name || "";
              const dong = result[0]?.address?.region_3depth_name || "";
              setLocation({
                name: "지도에서 선택된 위치",
                address,
                x: center.getLng(),
                y: center.getLat(),
                dong,
              });
            }
          }
        );
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
    if (!map || !search) return;

    // 검색어 기반 위치 업데이트
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(search, (data: any[], status: string) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const place = data[0]; // 첫 번째 검색 결과를 사용
        if (!place) return;

        const position = new window.kakao.maps.LatLng(place.y, place.x);

        // 지도 중심 이동
        map.setCenter(position);
        if (marker) {
          marker.setPosition(position); // 마커도 검색 위치로 이동
        }

        // 좌표로 주소 변환
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(
          place.x,
          place.y,
          (result: any[], status: string) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const address = result[0]?.address?.address_name || "";
              const dong = result[0]?.address?.region_3depth_name || "";
              setLocation({
                name: place.place_name,
                address,
                x: parseFloat(place.x),
                y: parseFloat(place.y),
                dong,
              });
            }
          }
        );
      }
    });
  }, [search, map, marker, setLocation]);

  return <div id="map" className="w-full h-full" />;
}
