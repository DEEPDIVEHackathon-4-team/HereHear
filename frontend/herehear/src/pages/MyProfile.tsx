import BottomBar from "../components/BottomBar";

export default function MyProfile() {
  return (
    <div className="center-content flex flex-col bg-white relative">
      MyProfile
      <footer className="h-20 absolute bottom-0 w-full z-10 bg-white">
        <BottomBar />
      </footer>
    </div>
  );
}
