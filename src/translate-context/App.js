import { useState } from "react";
import UserCreate from "./components/UserCreate";
import ColorContext from "./contexts/ColorContext";
import LanguageContext from "./contexts/LanguageContext";

const App = () => {
  const [language, setLanguage] = useState("english");
  return (
    <div className="ui container">
      <div>
        Select Language:
        <i className="flag us" onClick={() => setLanguage("english")} />
        <i className="flag nl" onClick={() => setLanguage("dutch")} />
      </div>
      <ColorContext.Provider value={"red"}>
        <LanguageContext.Provider value={language}>
          <UserCreate />
        </LanguageContext.Provider>
      </ColorContext.Provider>
    </div>
  );
};

export default App;
