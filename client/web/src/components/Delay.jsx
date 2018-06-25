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
    const { wait } = this.props;
    this.timer = setTimeout(() => {
      this.setState({
        waiting: false,
      });
    }, wait);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const { waiting } = this.state;
    const { children } = this.props;
    if (waiting) {
      return null;
    }
    return children;
  }
}

export default Delay;
