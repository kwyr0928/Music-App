import { Button } from "@yamada-ui/react";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Music: React.FC = () => {
    const navigate = useNavigate();
    const [startTime, setStartTime] = useState<number>(Date.now());
    const [numbers, setNumbers] = useState(0);
  useEffect(() => {
    // コンポーネントがマウントされたときの時間を記録
    setStartTime(Date.now());
  }, []);

  const handleEnd = () => {
    const endTime = Date.now();
    const timeSpent = endTime - startTime;
    console.log(`User spent ${timeSpent} milliseconds on the page.`);
    navigate('/result', { state: { duration: timeSpent } });
};

const [data, setData] = useState(0);
const onkai: string[] = ["ド", "レ", "ミ", "ファ", "ソ", "ラ", "シ"];
const kaeru: string[] = ["ド", "レ", "ミ", "ファ", "ミ","レ","ド"];

const tone = (data: number) => {
  return onkai[data];
  }

useEffect(() => {
  const ws = new WebSocket('ws://localhost:8080');

  ws.onmessage = (event) => {
    setData(event.data);
    if(tone(event.data) === kaeru[numbers]){
        setNumbers((prevNumbers) => prevNumbers + 1);
        console.log(numbers);
    }
    if(numbers === 4){
        const endTime = Date.now();
        const timeSpent = endTime - startTime;
        console.log(`User spent ${timeSpent} milliseconds on the page.`);
        navigate('/result', { state: { duration: timeSpent } });
    }
  };

  return () => {
    ws.close();
  };
}, [numbers, startTime, navigate]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1>演奏開始しました</h1>
      <h1>今は {kaeru[numbers]}</h1>
      <Button onClick={handleEnd}>演奏終了</Button>
      <p>{data}</p>
        <p>{tone(data)}</p>

      
    </div>
  );
};

export default Music;
