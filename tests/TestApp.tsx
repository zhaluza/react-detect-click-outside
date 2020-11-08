import React, { useState } from 'react';
import { useDetectClickOutside } from '../src/useDetectClickOutside';

interface ContainerProps {
  disableClick?: boolean;
  disableKeys?: boolean;
  triggerKeys?: string[];
}
interface ToggleProps extends ContainerProps {
  onClose: () => void;
}

const ToggleableDiv: React.FC<ToggleProps> = ({
  onClose,
  disableClick,
  disableKeys,
  triggerKeys,
}) => {
  const ref = useDetectClickOutside({
    onClose,
    disableKeys,
    disableClick,
    triggerKeys,
  });
  return (
    <div data-testid="toggle-component" ref={ref}>
      <p>I'm toggled</p>
    </div>
  );
};

const Container: React.FC<ContainerProps> = ({
  disableClick,
  disableKeys,
  triggerKeys,
}) => {
  const [displayComponent, setDisplayComponent] = useState(false);
  const handleDisplay = () => {
    setDisplayComponent((prevState) => !prevState);
  };
  const handleClose = () => {
    setDisplayComponent(false);
  };

  return (
    <div>
      <header>
        <button data-testid="clickable-button" onClick={handleDisplay}>
          Click Me
        </button>
        {displayComponent && (
          <ToggleableDiv
            onClose={handleClose}
            disableClick={disableClick}
            disableKeys={disableKeys}
            triggerKeys={triggerKeys}
          />
        )}
      </header>
      <div data-testid="dummy"></div>
    </div>
  );
};

export default Container;
