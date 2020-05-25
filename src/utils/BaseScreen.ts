import React from 'react';

export class BaseScreen extends React.Component {
  constructor(props: any) {
    super(props);

    // @ts-ignore
    this.props.navigation.addListener('focus', () => {
      this.onScreenFocused();
    });
  }

  onScreenFocused() {}

  refresh() {
    this.forceUpdate();
  }
}
