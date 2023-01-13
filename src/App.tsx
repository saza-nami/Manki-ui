import React from 'react';
import Main from 'Main';

function App() {
  const [phase, setPhase] = React.useState<string>('1');

  return (
    <Main phase={phase} setPhase={setPhase}/>
  );
}

export default App;
