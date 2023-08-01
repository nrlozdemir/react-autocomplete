import React from "react";
import { render } from "react-dom";

import Autocomplete from "./Autocomplete";

require("./styles.css");

function App() {
  return (
    <div>
      <Autocomplete
        suggestions={[
          { id: 1, label: "Ankara" },
          { id: 2, label: "Istanbul" },
          { id: 3, label: "Berlin" },
          { id: 4, label: "London" },
          { id: 5, label: "New York" },
          { id: 6, label: "Washington" }
        ]}
      />
    </div>
  );
}

const container = document.createElement("div");
document.body.appendChild(container);
render(<App />, container);
