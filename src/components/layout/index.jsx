// npm modules
import React    from 'react';
import ReactDOM from 'react-dom';

// components
import Header from '../header';

class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: 'Hello world',
    };
  }

  setTitle(newTitle) {
    this.setState({
      title: newTitle,
    });
  }

  render() {
    return (
      <Header title={this.state.title} setTitle={this.setTitle.bind(this)} />
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Layout />, app);
