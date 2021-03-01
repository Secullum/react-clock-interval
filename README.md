# react-clock-interval

🕰 Almost accurate clock component for react

This component implements the `setInterval` logic to render a clock and prevent the following issues:

- Skip some seconds
- Not on sync with system clock

## Features

- Works on react-dom and react-native (it should work on other renderers too)
- You can render it whatever you like
- TypeScript support

## Install

### npm

```
npm install react-clock-interval
```

### yarn

```
yarn add react-clock-interval
```

## API

| Prop            | Type     | Required | Description                                                                                                              |
| --------------- | -------- | :------: | ------------------------------------------------------------------------------------------------------------------------ |
| children        | function |    ✔     | A render prop that will give you the current date and you can render it whatever you like.                               |
| initialDateTime | Date     |    ❌    | By default, the clock provides the system date. If you wish to start on some specific date instead, set it on this prop. |
| forceUpdateInitialDateTime | boolean     |    ❌    | Forces the clock time to update. |

## Example

```js
import React from 'react';
import Clock from 'react-clock-interval';

class Example extends React.Component {
  render() {
    return (
      <Clock>
        {dateTime => <div>{dateTime.toString()}</div>}
      </Clock>
    );
  }
}
```

## Thanks

- https://taylorhakes.com/posts/creating-a-clock-with-setinterval/
