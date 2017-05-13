import React, {Component} from 'react';
import classnames from 'classnames';

import './style.sass';

class NavBar extends Component {

    render() {
        const {className} = this.props;
        return (
            <div className={classnames('NavBar', className)}>
                <div className="title">
                    <div className="app-name">PUBG Roulette</div>
                </div>
            </div>
        );
    }
}

export default NavBar;