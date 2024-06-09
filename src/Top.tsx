import { Button } from "@yamada-ui/react";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";


function Top() {
    const [data, setData] = useState(0);
  const onkai: string[] = ["ド", "レ", "ミ", "ファ", "ソ", "ラ", "シ"];

  const tone = (data: number) => {
    return onkai[data];
    }

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      setData(event.data);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
          <h1>Arduino Data</h1>
          <h1 className="text-3xl font-bold underline">
    Hello world!
  </h1>
        <p>{data}</p>
        <p>{tone(data)}</p>
        <Button><Link to="/music">演奏開始</Link></Button>
      </header>
    </div>
  );
  }
  
  export default Top;
  