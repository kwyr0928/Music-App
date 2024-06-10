// Resultmain.tsx UI
import { Button } from "@yamada-ui/react";
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Resultmain: React.FC = () => {
  const location = useLocation();
  const { duration } = location.state as { duration: number };

  return (
    <div className="flex flex-col items-center mt-10">
     
      <p className="text-xl mb-4">記録：<span className="text-3xl text-red-500">{duration}</span> 秒</p>
      <Button size="lg" colorScheme="primary" className="mb-4">
        <Link to="/">Topに戻る</Link>
      </Button>
    </div>
  );
};

export default Resultmain;
