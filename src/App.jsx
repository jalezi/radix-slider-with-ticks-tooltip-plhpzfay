import { useState } from 'react';

import { Slider } from './components/slider';

function App() {
  const [range, setRange] = useState([1997,1999]);

  const onChange = (e) => {
    setRange(e);
  };

  return (
    <>
      <h1>Radix Slider</h1>
      <div>
        <Slider
          value={range}
          onValueChange={onChange}
          min={1950}
          max={2000}
          step={2}
        />
        <div style={{ marginTop: '1em', display: 'flex', gap: '0.5em' }}>
          {range.map((r,i) => (
            <span key={`range-${i}`}>{r}</span>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
