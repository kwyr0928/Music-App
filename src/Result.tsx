import { Button } from "@yamada-ui/react";
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Result: React.FC = () => {
  const location = useLocation();
  const { duration } = location.state as { duration: number };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1>結果ページ</h1>
      <p>結果: {duration} ミリ秒</p>
      <Button><Link to="/">Topに戻る</Link></Button>
    </div>
  );
};

export default Result;
