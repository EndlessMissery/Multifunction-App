import React, { useState, useEffect } from "react";
import Menu from "./components/Menu/Menu.jsx";
import CurrencyConverter from "./components/Currency/CurrencyConverter.jsx";
import Cryptocurrency from "./components/Cryprocurrency/Cryptocurrency.jsx"
import Calculator from "./components/Calculator/Calculator.jsx";
import "/App.css"


function App() {
  const [selectedTopic, setSelectedTopic] = useState("home");

  useEffect(() => {
    const storedTopic = localStorage.getItem("selectedTopic");
    if (storedTopic) {
      setSelectedTopic(storedTopic);
    }
  }, []);

  const handleSelect = (selectedButton) => {
    setSelectedTopic(selectedButton);
    localStorage.setItem("selectedTopic", selectedButton);
  };

  const renderContent = () => {
    switch (selectedTopic) {
      case "Currency converter":
        return <CurrencyConverter />;
      case "Cryptocurrency":
        return <Cryptocurrency />;
      case "Calculator":
        return <Calculator />;
      // case "Weather":
      //   return <Weather />;
      // case "Calendar":
      //   return <Calendar />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="menu-container">
        <ul>
          {["Currency converter", "Cryptocurrency", "Calculator"].map((topic) => (
            <Menu
              key={topic}
              isSelected={selectedTopic === topic}
              onSelect={() => handleSelect(topic)}>
              {topic.charAt(0).toUpperCase() + topic.slice(1)}
            </Menu>
          ))}
        </ul>
      </div>
      <section id="examples">
        {selectedTopic && <div id="tab-content">{renderContent()}</div>}
      </section>
    </div>
  );
}

export default App;
