import React, {Component} from 'react';
import classnames from 'classnames';
import './style.sass';
import {Button,OverlayTrigger,Tooltip} from 'react-bootstrap';
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

        var theDefault = '{"0":{"name":"Spooked","description":"Speak over voice chat when hearing enemy footsteps","weights":{"0":"2","1":"2","2":1,"3":"1","4":"1","5":"2","6":"2","7":"3"}},"1":{"name":"No Shotguns","description":"","weights":{"0":"2","1":"2","2":1,"3":1,"4":"2","5":"2","6":"2","7":"3"}},"2":{"name":"Echo","description":"Anytime someone says something in all chat the other 2 must say it in all chat","weights":{"0":"4","1":"2","2":"1","3":"1","4":"2","5":"2","6":"2","7":"3"}},"3":{"name":"Strip","description":"Remove any non-weapon equipment","weights":{"0":1,"1":1,"2":1,"3":1,"4":1,"5":1,"6":1,"7":1}},"4":{"name":"No ARs","description":"","weights":{"0":1,"1":"2","2":"2","3":1,"4":1,"5":"2","6":"2","7":1}},"5":{"name":"Tourist","description":" travel to the closest city","weights":{"0":1,"1":1,"2":1,"3":1,"4":1,"5":1,"6":1,"7":1}},"6":{"name":"Pistol Only","description":"","weights":{"0":"2","1":1,"2":"2","3":"2","4":1,"5":1,"6":1,"7":1}},"7":{"name":"United","description":"Stay within the line of sight of your teammates","weights":{"0":"0","1":1,"2":1,"3":1,"4":1,"5":1,"6":1,"7":1}},"8":{"name":"Hotwire","description":"Actively try to find and drive in a vehicle","weights":{"0":1,"1":1,"2":1,"3":1,"4":1,"5":1,"6":1,"7":1}},"9":{"name":"No Proning","description":"","weights":{"0":1,"1":1,"2":1,"3":1,"4":1,"5":1,"6":1,"7":1}},"10":{"name":"Broadcast","description":"All chatting must be over all chat","weights":{"0":"4","1":"2","2":1,"3":1,"4":"2","5":"3","6":"3","7":"3"}},"11":{"name":"Spelunker ","description":"Explore any building within a block","weights":{"0":1,"1":1,"2":1,"3":1,"4":1,"5":1,"6":1,"7":1}},"12":{"name":"No Crouching","description":"","weights":{"0":1,"1":1,"2":1,"3":1,"4":1,"5":1,"6":1,"7":1}},"13":{"name":"Hitchhike","description":"Stay within 1 block of major road","weights":{"0":1,"1":1,"2":1,"3":1,"4":1,"5":1,"6":1,"7":1}},"14":{"name":"Swap","description":"Give a teammate one of your weapons","weights":{"0":1,"1":1,"2":1,"3":1,"4":1,"5":1,"6":1,"7":1}}}';

        this.state = {
            circles: circles,
            scores: localStorage.getItem('scores') ? JSON.parse(localStorage.getItem('scores')): {},
            circle: -1,
            showOptionModal: false,
            showScoreModal: false,
            showPortModal: false,
            options: localStorage.getItem('options') ? JSON.parse(localStorage.getItem('options')): JSON.parse(theDefault),
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
                value: "",
                description: ""
            },
            1: {
                name: "Second",
                value: "",
                description: ""
            },
            2: {
                name: "Third",
                value: "",
                description: ""
            },
            3: {
                name: "Fourth",
                value: "",
                description: ""
            },
            4: {
                name: "Fifth",
                value: "",
                description: ""
            },
            5: {
                name: "Sixth",
                value: "",
                description: ""
            },
            6: {
                name: "Seventh",
                value: "",
                description: ""
            },
            7: {
                name: "Eighth",
                value: "",
                description: ""
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
            localStorage.setItem('options', JSON.stringify(this.state.options));
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
        circles[circle]['description'] = this.state.options[parseInt(votes[winner],10)]['description'];
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
            <DocumentTitle title="PUBG Roulette - Home" {...props}>

                <div className={ classnames('Home', className, 'row') }>
                    <div className="col-md-3 circles">
                        {this.state.circle < 7 && <Button bsStyle="success" className="btn btn-default large-btn margin-bottom-20" onClick={this.roulette}>Roll</Button>}
                        {this.state.circle > 6 && <Button bsStyle="warning" className="btn btn-default large-btn margin-bottom-20" disabled>Restart to Roll More</Button>}

                        <div className="option-container">
                            <a className={"the-btn" + (this.state.circle > 6 ? " highlight" : "")} onClick={this.restart}>Restart</a>
                            <a className="the-btn" onClick={(e) => this.handlePlayer(e)}>Add Player</a>
                            <a className="the-btn" onClick={(e) => this.handleOption(e)}>Add Option</a>
                            <a className="the-btn" onClick={(e) => this.toggleModal(e, 'showPortModal', true)}>Import/Export</a>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-7 spinner">
                                <div className="records-container">
                                    <div className="records-title">Rules</div>
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
                            </div>
                            <div className="col-md-5 scores">
                                <div className="records-container">
                                    <div className="records-title">Players</div>
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
                                    {Object.keys(this.state.scores).length === 0 && <div className={"record score row "}>
                                            <span className="col-md-12">No Players</span>
                                        </div>
                                    }
                                </div>

                                <div className="records-container">
                                    <div className="records-title">Current Game</div>
                                    {Object.keys(this.state.circles).map(function(key) {
                                        let tooltip = <Tooltip id={key}>{this.state.circles[key].description}</Tooltip>;
                                        return <div key={key} className={"record record-scores " + (this.state.circle == key ? 'highlight' : '')}>
                                            <span className="align-right numbers">{"Rule " + (parseInt(key,10)+1) + ":"}</span>
                                            <span className="circle-rule">
                                        {this.state.circles[key].description !== '' && <OverlayTrigger placement="left" overlay={tooltip}>
                                            <span>{this.state.circles[key].value}</span>
                                        </OverlayTrigger>}
                                                {this.state.circles[key].description === '' && <span>{this.state.circles[key].value}</span>}
                                    </span>
                                        </div>
                                    }, this)}
                                </div>
                            </div>
                        </div>
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