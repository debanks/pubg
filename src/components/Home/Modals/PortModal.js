import React, {Component} from 'react';
import classnames from 'classnames';
import {Modal, Button} from 'react-bootstrap';

class PortModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: this.props.options ? this.props.options : ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        this.setState({
            options: this.props.options ? this.props.options : ""
        });
    }

    /**
    * If the input boxes change, update the state values for it
    */
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
          [name]: value
      });
    }

    submit(event) {

        this.props.import(this.state.options);
        this.props.toggleModal(null, 'showPortModal', false);
    }

    render() {
        const {className} = this.props;
        return (
            <div className={ classnames('PortModal', className) }>

                <Modal bsSize="lg" show={ this.props.show }
                       onHide={ (e) => this.props.toggleModal(e, 'showPortModal', false) } dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">Import/Export</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <textarea className="full" name="options" onChange={this.handleInputChange} value={this.state.options}></textarea>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={ (e) => this.props.toggleModal(e, 'showPortModal', false) }>Close</Button>
                        <Button onClick={ (e) => this.submit(e) }>Update</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

export default PortModal;