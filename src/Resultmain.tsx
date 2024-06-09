// Resultmain.tsx UI
import { Button } from "@yamada-ui/react";
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Resultmain: React.FC = () => {
  const location = useLocation();
  const { duration } = location.state as { duration: number };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-4">結果ページ</h1>
      <p className="text-xl mb-4">結果: {duration} 秒</p>
      <Button className="mb-4">
        <Link to="/">Topに戻る</Link>
      </Button>
    </div>
  );
};

export default Resultmain;
