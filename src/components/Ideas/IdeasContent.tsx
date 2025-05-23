import { useState } from "react";
import { frequent as frequentIdeas } from "./frequent";
import Group from "./Group";

const IdeasContent = () => {
  const [frequent, setFrequent] = useState(frequentIdeas);
  return (
    <div className="overflow-scroll w-full h-full p-4">
      <h1 className="font-extralight text-xl text-center pb-6 text-stone-300">
        Gyakori ötletek
      </h1>
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
