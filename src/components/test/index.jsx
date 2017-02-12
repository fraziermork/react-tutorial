import React    from 'react';
import ReactDOM from 'react-dom';

class Test extends React.Component {
  render() {
    return (
      <h1>Hello World</h1>
    );
  }
}

export default Test;

const app = document.getElementById('app');
ReactDOM.render(<Test />, app);
