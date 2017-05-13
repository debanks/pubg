import React, {Component} from 'react';
import classnames from 'classnames';
import {Modal, Button} from 'react-bootstrap';

class OptionModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.option ? this.props.option.name : "",
            description: this.props.option ? this.props.option.description : "",
            weights: this.props.option ? this.props.option.weights : {0:1,1:1,2:1,3:1,4:1,5:1,6:1,7:1}
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submit = this.submit.bind(this);
        this.changeWeight = this.changeWeight.bind(this);
    }

    componentWillMount() {
        this.setState({
            name: this.props.option ? this.props.option.name : "",
            description: this.props.option ? this.props.option.description : "",
            weights: this.props.option ? this.props.option.weights : {0:1,1:1,2:1,3:1,4:1,5:1,6:1,7:1}
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

    changeWeight(event, key) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;

      var weights = this.state.weights;

      weights[key] = value;

      this.setState({
          weights: weights
      });
    }

    submit(event) {

        this.props.editOptions(this.props.optionKey, this.state.name, this.state.description, this.state.weights);
        this.props.toggleModal(null, 'showOptionModal', false);
    }

    render() {
        const {className} = this.props;
        const n = 20;
        return (
            <div className={ classnames('OptionModal', className) }>

                <Modal bsSize="lg" show={ this.props.show }
                       onHide={ (e) => this.props.toggleModal(e, 'showOptionModal', false) } dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">{this.props.name ? "Edit Option" : "Add New Option"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row options">
                                    <div className="col-md-4">Short Name</div>
                                    <div className="col-md-8"><input name="name" onChange={this.handleInputChange} value={this.state.name}/></div>
                                </div>
                                <div className="row options">
                                    <div className="col-md-4">Description</div>
                                    <div className="col-md-8"><textarea name="description" onChange={this.handleInputChange} value={this.state.description}></textarea></div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label>Weights</label>
                                {Object.keys(this.state.weights).map(function(key){
                                    return <div key={key} className="circle-select">
                                        <label for={"circle" + key}>Circle {(parseInt(key,10)+1)}: </label>
                                        <select name={key} onChange={(e) => this.changeWeight(e, key)} defaultValue={this.state.weights[key]}>
                                            {[...Array(n)].map((e, i) => <option value={i} key={i}>{i}</option>)}
                                        </select>
                                    </div>
                                },this)}
                            </div>
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