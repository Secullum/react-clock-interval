import * as React from 'react';

export interface ClockProps {
  initialDateTime?: Date;
  children: (dateTime: Date) => React.ReactNode;
  forceUpdateInitialDateTime?: boolean;
}

export interface ClockState {
  dateTime: Date;
}

class Clock extends React.Component<ClockProps, ClockState> {
  timeoutId?: number;
  delta: number;

  state: ClockState = {
    dateTime: new Date()
  };

  constructor(props: ClockProps) {
    super(props);

    this.delta = props.initialDateTime
      ? Date.now() - props.initialDateTime.getTime()
      : 0;
  }

  componentDidMount() {
    this.tick();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  componentDidUpdate(prevProps: ClockProps) {
    if (
      this.props.forceUpdateInitialDateTime &&
      prevProps.initialDateTime != this.props.initialDateTime
    ) {
      this.delta = this.props.initialDateTime
        ? Date.now() - this.props.initialDateTime.getTime()
        : 0;
    }
  }

  tick = () => {
    const newDateTime = Date.now() - this.delta;

    this.setState({ dateTime: new Date(newDateTime) }, () => {
      // If it was just `setInterval` of 1000ms, there'd be a couple of problems:
      // - Sometimes, a second could be "skipped" because `setInterval` isn't very precise
      // - It could start at the "middle" of the second (like, "10:52:30.789"), which won't be in sync with the system clock
      // To mitigate this, we calculate how many miliseconds there is until the next second and schedule the next update based on that
      const msUntilNextSec = 1000 - (Date.now() % 1000);
      this.timeoutId = setTimeout(this.tick, msUntilNextSec);
    });
  };

  render() {
    return this.props.children(this.state.dateTime);
  }
}

export default Clock;
