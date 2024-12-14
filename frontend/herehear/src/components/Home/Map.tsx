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
  const [, setMarkers] = useState<any[]>([]);

  useEffect(() => {
    const loadKakaoMap = () => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);

      if (search) {
        const ps = new window.kakao.maps.services.Places();
        ps.keywordSearch(search, (data: any[], status: string) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const bounds = new window.kakao.maps.LatLngBounds();
            const newMarkers: any[] = [];

            data.forEach((place) => {
              const marker = new window.kakao.maps.Marker({
                map,
                position: new window.kakao.maps.LatLng(place.y, place.x),
              });
              newMarkers.push(marker);
              bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
            });

            setMarkers(newMarkers); // 마커 저장
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
  }, [search]);

  return <div id="map" className="w-full h-full" />;
}
