import React, { Component } from 'react';
import classnames from 'classnames';
import FaSpinner from 'react-icons/lib/fa/spinner';
import './style.sass';

class Loading extends Component {

  render() {
    const { className } = this.props;
    return (
      <div className={classnames('Loading', className)}>
        <div className="icon">
          <FaSpinner className="spin" />
        </div>
        <div className="text">
          Loading
        </div>
      </div>
    );
  }
}

export default Loading;