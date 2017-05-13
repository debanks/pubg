import React, {Component} from 'react';
import NavBar from '../NavBar'
import Loading from '../Loading';

class MainComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        };
    }

    toggleLoading() {
        this.setState({loading: !this.state.loading});
    }

    render() {
        return (
            <div>
                { this.state.loading && (
                    <Loading />
                ) }
                <NavBar/>
                <main>
                    { this.props.children && React.cloneElement(this.props.children, {
                        toggleLoading: this.toggleLoading,
                        loading: this.state.loading
                     }) }
                </main>
            </div>
        );
    }
}

export default MainComponent;