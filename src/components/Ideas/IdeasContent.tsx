import { useState } from "react";
import { frequent as frequentIdeas } from "./frequent";
import Group from "./Group";

const IdeasContent = () => {
  const [frequent, setFrequent] = useState(frequentIdeas);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  return (
    <div className="overflow-scroll w-full h-full p-4">
      <h1 className="font-extralight text-xl text-center pb-6 text-stone-300">
        Gyakori ötletek
      </h1>
      {Object.entries(frequent).map(([category, items]) => (
        <Group
          setFrequent={setFrequent}
          key={category}
          category={category}
          items={items}
          activeGroup={activeGroup}
          setActiveGroup={setActiveGroup}
        />
      ))}
    </div>
  );
};

export default IdeasContent;
