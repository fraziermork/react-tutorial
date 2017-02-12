import React from 'react';

import Title from '../title';

export default class Header extends React.Component {
  updateTitle(e) {
    console.log(e);
    const newTitle = e.target.value;
    this.props.setTitle(newTitle);
  }

  render() {
    return (
      <header>
        <Title title={this.props.title} />
        <input value={this.props.title} onChange={this.updateTitle.bind(this)} />
      </header>
    );
  }
}
