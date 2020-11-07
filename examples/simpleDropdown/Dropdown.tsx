import React from 'react';
import { useDetectClickOutside } from '../../src/useDetectClickOutside';

interface Props {
  closeToggle: () => void;
}

const Dropdown: React.FC<Props> = ({ closeToggle }) => {
  const ref = useDetectClickOutside({ onClose: closeToggle });
  return (
    <div className="dropdown" ref={ref}>
      <p>I'm a dropdown!</p>
    </div>
  );
};

export default Dropdown;
