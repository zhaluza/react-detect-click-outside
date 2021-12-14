# react-detect-click-outside

A lightweight React hook that detects clicks outside elements and triggers a callback. Can also detect keypresses.

📈&nbsp;&nbsp;Over 3,500 weekly users (as of December 2021).

👍&nbsp;&nbsp;Great for toggling dropdowns!

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Requirements](#requirements)

<!-- ABOUT THE PROJECT -->

### Features

- 🖱 💻&nbsp;&nbsp;Detects clicks outside an element and/or keypresses.
- 🔨&nbsp;&nbsp;Customizable: disable clicks, disable keypresses, or specify keys that will trigger the callback
- 🎣&nbsp;&nbsp;Built with React hooks
- 🔥&nbsp;&nbsp;Written in TypeScript

### Installation

Install with [Yarn](https://yarnpkg.com/):

```sh
yarn add react-detect-click-outside
```

Or with [NPM](https://www.npmjs.com/):

```sh
npm i react-detect-click-outside
```

Import into your component like so:

```javascript
import { useDetectClickOutside } from 'react-detect-click-outside';
```

<!-- USAGE EXAMPLES -->

## Usage

Here's an [example](https://codesandbox.io/s/react-detect-click-outside-example-v2osy) of how to use the hook.

This library was built with UI features like dropdowns in mind. Below is a quick and functioning example of how to include it in a dropdown component:

```javascript
const Dropdown = ({ closeDropdown }) => {
  const ref = useDetectClickOutside({ onTriggered: closeDropdown });
  return (
    <div className="dropdown" ref={ref}>
      <p>This is a dropdown!</p>
    </div>
  );
};
```

How to implement the hook inside a function component:

1. Assign the hook to a variable before the component's return statement (above we use `ref`). Pass an empty object into the hook as an argument.

```javascript
const ref = useDetectClickOutside({});
```

2. The object you just passed into the `useDetectClickOutside` hook requires a property called `onTriggered`. The value of `onTriggered` must be a function — by default, it'll be called anytime a user clicks outside the component or hits the `Escape` key.

   In the example above, we used a function called `closeToggle`. This function is passed down from a parent component (let's call it `Container`) and controls a piece of state that determines whether the `Dropdown` component is visible.

   Here's a quick, trimmed-down example:

   ```javascript
   const Container = () => {
       const [displayDropdown, setDisplayDropdown] = useState(false);

       const closeDropdown = () => {
           setDisplayDropdown(false);
       }
       return (
           { displayDropdown && <Dropdown/> }
       )
   }
   ```

   Now, go ahead and pass your callback into the `useDetectClickOutside` hook!

   ```javascript
   const ref = useDetectClickOutside({ onTriggered: closeDropdown });
   ```

   3. Assign your `ref` constant (or whatever constant you assigned the `useDetectClickOutside` hook to) as a ref to the outermost element returned by your target component.

   ```javascript
   return (
     <div className="dropdown" ref={ref}>
       <p>This is a dropdown!</p>
     </div>
   );
   ```

   Here's what the whole component should look like now:

   ```javascript
   const Dropdown = ({ closeDropdown }) => {
     const ref = useDetectClickOutside({ onTriggered: closeDropdown });
     return (
       <div className="dropdown" ref={ref}>
         <p>This is a dropdown!</p>
       </div>
     );
   };
   ```

   Congrats! Your `useDetectClickOutside` should now trigger anytime a user clicks outside your component or presses the `Escape` key.

   Want to customize your hook? Check out some of the additional options below.

## Options

The object passed into the `useDetectClickOutside` hook accepts the following properties. Note that only `onTriggered` is required.

### `onTriggered` (required)

#### **Type:** `() => void`

A callback function, e.g. one that toggles the visibility of the component. By default, this function is triggered by a click outside the component, and by an `Escape` keyup event.

**Example:**

```javascript
const ref = useDetectClickOutside({ onTriggered: closeDropdown });
```

### `disableClick` (optional)

#### **Type:** `boolean`

When passed to the hook, this option will prevent clicks from triggering the `onTriggered` callback when the component is in the DOM. This option is disabled by default.

**Example:**

```javascript
const ref = useDetectClickOutside({
  onTriggered: closeDropdown,
  disableClick: true,
});
```

### `disableTouch` (optional)

#### **Type:** `boolean`

When passed to the hook, this option will prevent touch events from triggering the `onTriggered` callback when the component is in the DOM. This option is disabled by default.

**Example:**

```javascript
const ref = useDetectClickOutside({
  onTriggered: closeDropdown,
  disableTouch: true,
});
```

### `disableKeys` (optional)

#### **Type:** `boolean`

This option will prevent keypresses from triggering the `onTriggered` callback when the component is in the DOM. This option is disabled by default.

**Example:**

```javascript
const ref = useDetectClickOutside({
  onTriggered: closeDropdown,
  disableKeys: true,
});
```

### `allowAnyKey` (optional)

#### **Type:** `boolean`

This option will let any keypress trigger the `onTriggered` callback when the component is in the DOM - not just the `Escape` key. This option is disabled by default.

**Example:**

```javascript
const ref = useDetectClickOutside({
  onTriggered: closeDropdown,
  allowAnyKey: true,
});
```

### `triggerKeys` (optional)

#### **Type:** `string[]`

An array of [key values](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) that will trigger the `onTriggered` callback.

**Example:**

```javascript
const ref = useDetectClickOutside({
  onTriggered: closeDropdown,
  triggerKeys: ['Enter', 'Tab', 'x'],
});
```

_Note:_ This option overrides the default hook behavior of triggering the `onTriggered` callback with the `Escape` key. If you still wish to trigger the `onTriggered` function with `Escape`, you need to add it to the array (e.g. `triggerKeys=['Escape', 'Enter']`).

<!-- REQUIREMENTS -->

## Requirements

You must be using [React 16.8.0](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html) or later. In other words, your version of React must support hooks.
