// Music.tsx 完成
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Musicmain from "./Musicmain";

function Music() {
  const location = useLocation();
  const { song } = location.state as { song: string };

  return (
    <div>
      <Header />
      <Musicmain song={song} />
      <Footer />
    </div>
  );
}

export default Music;
