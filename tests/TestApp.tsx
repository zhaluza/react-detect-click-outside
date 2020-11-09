import React, { useState } from 'react';
import useDetectClickOutside from '../src';

interface ContainerProps {
  disableClick?: boolean;
  disableKeys?: boolean;
  triggerKeys?: string[];
  allowAnyKey?: boolean;
}
interface ToggleProps extends ContainerProps {
  onTriggered: () => void;
}

const ToggleableDiv: React.FC<ToggleProps> = ({
  onTriggered,
  disableClick,
  disableKeys,
  triggerKeys,
  allowAnyKey,
}) => {
  const ref = useDetectClickOutside({
    onTriggered,
    disableKeys,
    disableClick,
    triggerKeys,
    allowAnyKey,
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
  allowAnyKey,
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
            onTriggered={handleClose}
            disableClick={disableClick}
            disableKeys={disableKeys}
            triggerKeys={triggerKeys}
            allowAnyKey={allowAnyKey}
          />
        )}
      </header>
      <div data-testid="dummy"></div>
    </div>
  );
};

export default Container;
