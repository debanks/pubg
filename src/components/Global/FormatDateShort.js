import { IntlProvider } from 'react-intl';
import React, { Component } from 'react';

class FormatDateShort extends Component {

    render() {
        var ReactIntl = require('react-intl');
        var FormattedDate = ReactIntl.FormattedDate;

        return (
            <IntlProvider locale="en">
                <FormattedDate value={ this.props.date ? this.props.date : "0000-00-00" } day="2-digit" month="2-digit" year="2-digit"/>
            </IntlProvider>
        )
    }
}

export default FormatDateShort;