import { useState } from "react";
import TeamList from "./TeamList";
import PerformanceChart from "./PerformanceChart";

const TeamPerformance = () => {
  const [selected, setSelected] = useState<any>(null);

  return (
    <div className="flex">
      <TeamList onSelect={setSelected} />
      {selected && <PerformanceChart val={selected} />}
    </div>
  );
};

export default TeamPerformance;
