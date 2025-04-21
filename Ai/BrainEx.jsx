import React, { useState } from "react";
// import { NeuralNetwork } from "brain.js";

const BrainExample = () => {
  const [output, setOutput] = useState("");

  const net = new NeuralNetwork();
  net.train([
    { input: { click: 0, scroll: 1 }, output: { stay: 1 } },
    { input: { click: 1, scroll: 0 }, output: { leave: 1 } },
  ]);

  const predict = () => {
    const result = net.run({ click: 1, scroll: 0 });
    setOutput(result.stay > result.leave ? "User will stay" : "User will leave");
  };

  return (
    <div>
      <button onClick={predict}>Predict User Behavior</button>
      {output && <p>{output}</p>}
    </div>
  );
};

export default BrainExample;
