import { Button } from "@yamada-ui/react";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type MusicProps = {
    song: string;
}

const Musicmain = ({ song }: MusicProps) => {
    const navigate = useNavigate();
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [startTime, setStartTime] = useState<number>(Date.now());
    const [numbers, setNumbers] = useState(0);

    useEffect(() => {
        // コンポーネントがマウントされたときの時間を記録
        setStartTime(Date.now());
        const interval = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, [startTime]); // startTimeを依存配列に追加する
    

    const handleEnd = () => {
        console.log(elapsedTime);
        navigate('/result', { state: { duration: elapsedTime } });
    };

    const [data, setData] = useState(0);
    const onkai: string[] = ["ド", "レ", "ミ", "ファ", "ソ", "ラ", "シ"];
    const kaeru: string[] = ["ド", "レ", "ミ", "ファ", "ミ", "レ", "ド"];
    const kirakira: string[] = ["ド", "ド", "ソ", "ソ", "ラ", "ラ", "ソ"];

    const tone = (data: number) => {
        return onkai[data];
    }

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
        ws.onopen = () => {
            console.log('WebSocket connection established');
        };
        ws.onmessage = (event) => {
            setData(event.data);
            if ((song === "かえるのうた" && tone(event.data) === kaeru[numbers]) ||
                (song === "キラキラ星" && tone(event.data) === kirakira[numbers])) {
                setNumbers((prevNumbers) => {
                    console.log(prevNumbers + 1);
                    return prevNumbers + 1;
                });
            }
            if (numbers === 4) {
                console.log(elapsedTime);
                navigate('/result', { state: { duration: elapsedTime } });
            }
        };
        return () => {
            console.log('Closing WebSocket connection');
            ws.close();
        };
    }, [song, numbers, navigate]);

    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="mb-4">演奏開始しました</h1>
            <h2 className="mb-4">演奏曲：{song}</h2>
            <h2 className="mb-4">次の音は {kaeru[numbers]}</h2>
            <Button onClick={handleEnd} className="mb-4">演奏終了</Button>
            <p className="mb-2">センサーからの受け取り値</p>
            <p className="mb-2">{tone(data)}</p>
            <p>経過時間: {elapsedTime} 秒</p>
        </div>
    );
};

export default Musicmain;
