import { useState } from "react";
import { frequent as frequentIdeas } from "./frequent";
import Group from "./Group";

const IdeasContent = () => {
  const [frequent, setFrequent] = useState(frequentIdeas);
  return (
    <div className="overflow-scroll w-full h-full p-4">
      {Object.entries(frequent).map(([category, items]) => (
        <Group
          setFrequent={setFrequent}
          frequent={frequent}
          key={category}
          category={category}
          items={items}
        />
      ))}
    </div>
  );
};

export default IdeasContent;
