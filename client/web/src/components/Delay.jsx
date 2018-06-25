import { Component } from 'react';
import PropTypes from 'prop-types';

class Delay extends Component {
  static propTypes = {
    children: PropTypes.node,
    wait: PropTypes.number,
  };

  static defaultProps = {
    children: null,
    wait: 500,
  };

  constructor(props) {
    super(props);
    this.state = {
      waiting: true,
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({
        waiting: false,
      });
    }, this.props.wait);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    if (this.state.waiting) {
      return null;
    }
    return this.props.children;
  }
}

export default Delay;
