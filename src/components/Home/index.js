import React, {Component} from 'react';
import classnames from 'classnames';
import './style.sass';
import {Button} from 'react-bootstrap';
import OptionModal from './Modals/OptionModal';
import PlayerModal from './Modals/PlayerModal';
import PortModal from './Modals/PortModal';
import FaCog from 'react-icons/lib/fa/cog';
import FaClose from 'react-icons/lib/fa/close';

var DocumentTitle = require('react-document-title');

class Home extends Component {

    constructor(props) {
        super(props);

        var circles = this.defaultCircles();

        this.state = {
            circles: circles,
            scores: localStorage.getItem('scores') ? JSON.parse(localStorage.getItem('scores')): {},
            circle: -1,
            showOptionModal: false,
            showScoreModal: false,
            showPortModal: false,
            options: localStorage.getItem('options') ? JSON.parse(localStorage.getItem('options')): {},
            selectedOption: false,
            selectedOptionKey: 0,
            selectedPlayer: false,
            selectedPlayerKey: 0,
            highlightedOption: -1,
            timeout: false,
            lastRule: -1
        }

        this.handleOption = this.handleOption.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.editOptions = this.editOptions.bind(this);
        this.handlePlayer = this.handlePlayer.bind(this);
        this.editPlayers = this.editPlayers.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handleDeletePlayer = this.handleDeletePlayer.bind(this);
        this.roulette = this.roulette.bind(this);
        this.restart = this.restart.bind(this);
        this.updateScore = this.updateScore.bind(this);
        this.import = this.import.bind(this);
    }

    defaultCircles() {
        return {
            0: {
                name: "First",
                value: ""
            },
            1: {
                name: "Second",
                value: ""
            },
            2: {
                name: "Third",
                value: ""
            },
            3: {
                name: "Fourth",
                value: ""
            },
            4: {
                name: "Fifth",
                value: ""
            },
            5: {
                name: "Sixth",
                value: ""
            },
            6: {
                name: "Seventh",
                value: ""
            },
            7: {
                name: "Eighth",
                value: ""
            }
        };
    }

    handleOption(event, key = false) {
        event.preventDefault();
        var option;
        if (!key) {
            key = Object.keys(this.state.options).length;
            option = false;
        } else {
            option = this.state.options[key];
        }
        this.setState({selectedOptionKey: key, selectedOption: option})
        this.toggleModal(false, 'showOptionModal', true);
    }

    handleDeleteOption(event, key) {
        event.preventDefault();
        var options = this.state.options;
        delete options[key];

        this.setState({options: options});
        localStorage.setItem('options', JSON.stringify(this.state.options));
    }

    toggleModal(event, modal, val) {
        if (event) {
            event.preventDefault();
        }
        var obj = {};
        obj[modal] = val;
        this.setState(obj);
    }

    editOptions(key, name, description, weights) {
        var options = this.state.options;
        options[key] = {
            name: name,
            description: description,
            weights: weights
        }

        this.setState({options: options});
        localStorage.setItem('options', JSON.stringify(this.state.options));
    }

    handlePlayer(event, key = false) {
        event.preventDefault();
        var score;
        if (!key) {
            key = Object.keys(this.state.scores).length;
            score = false;
        } else {
            score = this.state.scores[key];
        }
        this.setState({selectedPlayerKey: key, selectedPlayer: score})
        this.toggleModal(false, 'showPlayerModal', true);
    }

    handleDeletePlayer(event, key) {
        event.preventDefault();
        var scores = this.state.scores;
        delete scores[key];

        this.setState({scores: scores});
        localStorage.setItem('scores', JSON.stringify(this.state.scores));
    }

    editPlayers(key, name, score) {
        var scores = this.state.scores;
        scores[key] = {
            name: name,
            score: score
        }

        this.setState({scores: scores});
        localStorage.setItem('scores', JSON.stringify(this.state.scores));
    }

    restart() {
        var circles = this.defaultCircles();

        this.setState({circles: circles, circle: -1, lastRule: -1});
    }

    updateScore(event, key, shift) {
        event.preventDefault();
        var scores = this.state.scores;
        scores[key].score += shift;

        this.setState({scores: scores});
        localStorage.setItem('scores', JSON.stringify(this.state.scores));
    }

    import(options) {
        try {
            var json = JSON.parse(options);
            this.setState({options: json});
        } catch (e) {

        }
    }

    roulette() {
        var _ = require('lodash');
        var votes = [];
        var circle = this.state.circle + 1;
        var options = Object.keys(this.state.options);
        for (var i = 0; i < options.length; i++) {
            for (var j = 0; j < this.state.options[options[i]].weights[circle]; j++) {
                if (this.state.lastRule !== options[i]) {
                    votes.push(options[i]);
                }
            }
        }

        var winner = Math.floor(Math.random() * (votes.length-1));
        var circles = this.state.circles;

        circles[circle]['value'] = this.state.options[parseInt(votes[winner],10)]['name'];
        var _this = this;
        if (this.state.timeout) {
            clearTimeout(this.state.timeout);
        }
        var timeout = setTimeout(function() {
            _this.setState({highlightedOption: -1, timeout: false})
        }, 1000);

        this.setState({highlightedOption: parseInt(votes[winner],10), circle: circle, circles: circles, timeout: timeout, lastRule: votes[winner]});

    }

    render() {
        const {className, ...props} = this.props;

        return (
            <DocumentTitle title="Home" {...props}>

                <div className={ classnames('Home', className, 'row') }>
                    <div className="col-md-3 circles">
                        <Button className="btn btn-default margin-bottom-20" onClick={this.restart}>Restart</Button>
                        {this.state.circle < 7 && <Button bsStyle="success" className="btn btn-default margin-bottom-20 margin-left-10" onClick={this.roulette}>Roll</Button>}
                        {Object.keys(this.state.circles).map(function(key) {
                            return <div key={key} className={"circle row " + (this.state.circle == key ? 'highlight' : '')}>
                                <span className="col-md-4 circle-title numbers">{"Rule " + (parseInt(key,10)+1) + ":"}</span>
                                <span className="col-md-8 circle-rule">{this.state.circles[key].value}</span>
                            </div>
                        }, this)}
                    </div>
                    <div className="col-md-5 spinner">
                        <Button className="btn btn-default margin-bottom-20" onClick={(e) => this.handleOption(e)}>Add Option</Button>
                        <Button className="btn btn-default margin-bottom-20 margin-left-10" onClick={(e) => this.toggleModal(e, 'showPortModal', true)}>Import/Export</Button>
                        {Object.keys(this.state.options).map(function(key) {
                            return <div key={key} className={"record " + (this.state.highlightedOption == key ? 'highlight' : '')}>
                                <span className="option-title">{this.state.options[key].name}</span>
                                <div className="pull-right">
                                    <Button className="small-btns" bsStyle="primary" onClick={(e) => this.handleOption(e, key)}><FaCog /></Button>
                                    <Button className="small-btns" bsStyle="danger" onClick={(e) => this.handleDeleteOption(e, key)}><FaClose /></Button>
                                </div>
                            </div>
                        }, this)}
                    </div>
                    <div className="col-md-4 scores">
                        <Button className="btn btn-default margin-bottom-20" onClick={(e) => this.handlePlayer(e)}>Add Player</Button>
                        {Object.keys(this.state.scores).map(function(key) {
                            return <div key={key} className={"record score row "}>
                                <span className="col-md-7 score-title">{this.state.scores[key].name}</span>
                                <span className="col-md-5 score-value align-right">
                                    <span className="numbers the-score">{this.state.scores[key].score}</span>
                                    <Button className="small-btns" bsStyle="info" onClick={(e) => this.updateScore(e,key,1)}>+</Button>
                                    <Button className="small-btns" bsStyle="warning" onClick={(e) => this.updateScore(e,key,-1)}>-</Button>
                                    <Button className="small-btns" bsStyle="danger" onClick={(e) => this.handleDeletePlayer(e, key)}><FaClose /></Button>
                                </span>
                            </div>
                        }, this)}
                    </div>
                { this.state.showOptionModal &&
                    <OptionModal show={this.state.showOptionModal} toggleModal={this.toggleModal} optionKey={this.state.selectedOptionKey} option={this.state.selectedOption} editOptions={this.editOptions}/>
                }
                { this.state.showPlayerModal &&
                    <PlayerModal show={this.state.showPlayerModal} toggleModal={this.toggleModal} playerKey={this.state.selectedPlayerKey} player={this.state.selectedPlater} editPlayers={this.editPlayers}/>
                }
                { this.state.showPortModal &&
                    <PortModal show={this.state.showPortModal} import={this.import} toggleModal={this.toggleModal} options={JSON.stringify(this.state.options)}/>
                }
                </div>
            </DocumentTitle>
        );
    }
}

export default Home;