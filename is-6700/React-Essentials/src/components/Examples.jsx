import { useState } from "react";

import TabButton from "./TabButton.jsx";
import Section from "./Section.jsx";
import Tabs from "./Tabs.jsx";
import { EXAMPLES } from "../data.js";

export default function Examples() {
   // const [ selectedTab, setSelectedTab ] = useState('Please selecte a topic.');
   const [selectedTab, setSelectedTab] = useState();

   function handleSelect(selectedTabButton) {
      setSelectedTab(selectedTabButton);
      console.log(selectedTab);
   }

   let tabContent = <p>Please selecte a topic.</p>;
   if (selectedTab) {
      tabContent = (
         <div id="tab-content">
            <h3>{EXAMPLES[selectedTab].title}</h3>
            <p>{EXAMPLES[selectedTab].description}</p>
            <pre>
               <code>{EXAMPLES[selectedTab].code}</code>
            </pre>
         </div>
      );
   }

   return (
      <Section title="Examples" id="examples">
         <Tabs
            buttons={
               <>
                  <TabButton
                     isSelected={selectedTab === "components"}
                     onClick={() => handleSelect("components")}
                  >
                     Components
                  </TabButton>
                  <TabButton
                     isSelected={selectedTab === "jsx"}
                     onClick={() => handleSelect("jsx")}
                  >
                     JSX
                  </TabButton>
                  <TabButton
                     isSelected={selectedTab === "props"}
                     onClick={() => handleSelect("props")}
                  >
                     Props
                  </TabButton>
                  <TabButton
                     isSelected={selectedTab === "state"}
                     onClick={() => handleSelect("state")}
                  >
                     State
                  </TabButton>
               </>
            }
         >
            {tabContent}
         </Tabs>
      </Section>
   );
}
