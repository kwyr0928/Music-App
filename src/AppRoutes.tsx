// ルーティングの設定
import { Route, Routes } from "react-router-dom";
import Music from "./Music";
import Result from "./Result";
import Top from "./Top";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Top />} />
            <Route path="/music" element={<Music />} />
            <Route path="/result" element={<Result />} />
        </Routes>
    );
};

export default AppRoutes;
