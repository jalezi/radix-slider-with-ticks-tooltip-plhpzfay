import { useState } from 'react';

import { Slider } from './components/slider';
import { TooltipProvider } from '@radix-ui/react-tooltip';

function App() {
  const [range, setRange] = useState([2, 7]);

  const onChange = (e) => {
    setRange(e);
  };

  return (
    <TooltipProvider>
      <h1>Radix Slider</h1>
      <div style={{ paddingInline: '2rem' }}>
        <Slider value={range} onValueChange={onChange} min={0} max={10} step={1} />
        <div style={{ marginTop: '1em', display: 'flex', gap: '0.5em', alignItems: "center", justifyContent: "center"}}>
          Selected range: {range.join(" - ")}
        </div>
      </div>
    </TooltipProvider>
  );
}

export default App;
