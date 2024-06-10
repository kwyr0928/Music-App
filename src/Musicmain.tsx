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
    const [numbers, setNumbers] = useState(2);

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

    const getColorClass = (toneValue: string) => {
        switch (toneValue) {
            case "ド":
                return "text-red-500";
            case "レ":
                return "text-orange-500";
            case "ミ":
                return "text-yellow-500";
            case "ファ":
                return "text-green-500";
            case "ソ":
                return "text-blue-500";
            case "ラ":
                return "text-indigo-500";
            case "シ":
                return "text-purple-500";
            default:
                return "text-black";
        }
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


    const toneValue1 = tone(data);
    const toneClass1 = getColorClass(toneValue1);
    const toneValue2 = kaeru[numbers];
    const toneClass2 = getColorClass(toneValue2);
    
    return (
        <div className="flex flex-col items-center mt-10">
            <h2 className="mb-4 text-2xl">演奏曲：{song}</h2>
            <h2 className="mb-4">次の音は <span className={`text-5xl ${toneClass2}`}>{kaeru[numbers]}</span></h2>
            <Button size="lg" colorScheme="primary" onClick={handleEnd} className="mb-4">演奏中断</Button>
            <p className="mb-2">センサーからの受け取り値 <span className={`text-5xl ${toneClass1}`}>{tone(data)}</span></p>
            <p className="mb-2"></p>
            <p>経過時間：<span className="text-3xl">{elapsedTime} </span> 秒</p>
        </div>
    );
};

export default Musicmain;
