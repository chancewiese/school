import Header from "./components/Header";
import Concept1 from "./components/Concept1";
import Concept2 from "./components/Concept2";
import Concept3 from "./components/Concept3";

import { concepts } from "./data/concepts";

const concept1 = concepts[0];
function App() {
   return (
      <div>
         <Header />
         <ul id="concepts">
            <Concept1 />

            <Concept2 />
            <Concept3 />
         </ul>
      </div>
   );
}

export default App;
