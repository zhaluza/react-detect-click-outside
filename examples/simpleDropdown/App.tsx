import React, { useState } from 'react';
import Dropdown from './Dropdown';
import 'styles.css';

function App() {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const handleToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setToggleDropdown((prevState) => !prevState);
  };
  const closeToggle = () => {
    setToggleDropdown(false);
  };
  return (
    <div className="app">
      <header>
        <button onClick={handleToggle}>Click Me</button>
        {toggleDropdown && <Dropdown closeToggle={closeToggle} />}
      </header>
      <div className="message">
        <p>
          After toggling the dropdown, click anywhere or hit the "escape" key to
          close it!
        </p>
      </div>
    </div>
  );
}

export default App;
