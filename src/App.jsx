import { useState } from 'react';

import { Slider } from './components/slider';
import { TooltipProvider } from '@radix-ui/react-tooltip';

function App() {
  const [range, setRange] = useState([2017, 2019]);
  const [year, setYear] = useState([2017])

  const onRangeChange = (e) => {
    setRange(e);
  };

  const onYearChange = (e) => {
    setYear(e)
  }

  return (
    <>
      <div>
        <TooltipProvider>
          <h1>Radix Slider Multi</h1>
          <div style={{ paddingInline: '2rem' }}>
            <Slider value={range} onValueChange={onRangeChange} min={2013} max={2023} step={1}  />
            <div style={{ marginTop: '1em', display: 'flex', gap: '0.5em', alignItems: "center", justifyContent: "center"}}>
              Selected range: {range.join(" - ")}
            </div>
          </div>
        </TooltipProvider>
      </div>
      <div>
        <TooltipProvider>
          <h1>Radix Slider Single</h1>
          <div style={{ paddingInline: '2rem' }}>
            <Slider value={year} onValueChange={onYearChange} min={2013} max={2023} step={1}  />
            <div style={{ marginTop: '1em', display: 'flex', gap: '0.5em', alignItems: "center", justifyContent: "center"}}>
              Selected year: {year}
            </div>
          </div>
        </TooltipProvider>
      </div>
    </>
  );
}

export default App;
