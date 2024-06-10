// Topmain.tsx
import { Button, Option, Select } from "@yamada-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Topmain() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleClick = () => {
    navigate("/music", { state: { song: name } });
  };

  const handleSelectChange = (value: string) => {
    setName(value);
    console.log(value);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <p className="mb-4">お題に合わせて音を鳴らし、速さを競うゲームです。</p>
      <div className="inline-flex items-center space-x-4">
        <Select
          focusBorderColor="blue.500"
          placeholder="曲名を選択してください"
          onChange={handleSelectChange}
        >
          <Option value="かえるのうた">かえるのうた</Option>
          <Option value="キラキラ星">キラキラ星</Option>
          <Option value="オリジナル">オリジナル</Option>
        </Select>
        <Button size="lg" colorScheme="primary" onClick={handleClick}>
          演奏開始
        </Button>
      </div>
    </div>
  );
}

export default Topmain;
