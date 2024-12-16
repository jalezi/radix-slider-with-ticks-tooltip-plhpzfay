import { useState } from 'react';

import { Slider } from './components/slider';

function App() {
  const [range, setRange] = useState([2015, 2017]);

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
          min={2013}
          max={2023}
          step={1}
        />
        <div style={{ marginTop: '1em', display: 'flex', gap: '0.5em' }}>
          {range.map((r) => (
            <span>{r}</span>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
