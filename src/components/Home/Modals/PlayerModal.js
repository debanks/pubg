import React, {Component} from 'react';
import classnames from 'classnames';
import {Modal, Button} from 'react-bootstrap';

class OptionModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.player ? this.props.player.name : "",
            score: this.props.player ? this.props.player.score : 0
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        this.setState({
            name: this.props.player ? this.props.player.name : "",
            score: this.props.player ? this.props.player.score : 0
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

        this.props.editPlayers(this.props.playerKey, this.state.name, this.state.score);
        this.props.toggleModal(null, 'showPlayerModal', false);
    }

    render() {
        const {className} = this.props;
        return (
            <div className={ classnames('OptionModal', className) }>

                <Modal bsSize="lg" show={ this.props.show }
                       onHide={ (e) => this.props.toggleModal(e, 'showPlayerModal', false) } dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">{this.props.name ? "Edit Player" : "Add New Player"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row options">
                            <div className="col-md-4">Name</div>
                            <div className="col-md-8"><input name="name" onChange={this.handleInputChange} value={this.state.name}/></div>
                        </div>
                        <div className="row options">
                            <div className="col-md-4">Score</div>
                            <div className="col-md-8"><input name="score" type="integer" onChange={this.handleInputChange} value={this.state.score}/></div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={ (e) => this.props.toggleModal(e, 'showOptionModal', false) }>Close</Button>
                        <Button onClick={ (e) => this.submit(e) }>Finish</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

export default OptionModal;