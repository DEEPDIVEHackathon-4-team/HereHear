import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const MapComponent = () => {
  useEffect(() => {
    const loadKakaoMapScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (document.getElementById("kakao-map-script")) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.id = "kakao-map-script";
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
          import.meta.env.VITE_KAKAO_MAP_API_KEY
        }&autoload=false&libraries=services`;
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error("Failed to load Kakao Maps API"));
        document.head.appendChild(script);
      });
    };

    const initializeMap = async () => {
      try {
        await loadKakaoMapScript();
        window.kakao.maps.load(() => {
          const container = document.getElementById("map"); // 지도 표시할 div
          const options = {
            center: new window.kakao.maps.LatLng(37.5665, 126.978), // 중심 좌표
            level: 3, // 확대 레벨
          };
          new window.kakao.maps.Map(container, options); // 지도 생성
        });
      } catch (error) {
        console.error(error);
      }
    };

    initializeMap();
  }, []);

  return <div id="map" style={{ width: "100%", height: "400px" }} />;
};

export default MapComponent;
