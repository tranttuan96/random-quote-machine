import React, { Component } from 'react'
import './randomQuote.scss'
import { randomQuoteService } from './Service/QuoteService';

export default class RandomQuote extends Component {

    colorArr = ['rgb(115, 168, 87)', 'rgb(251, 105, 100)', 'rgb(44, 62, 80)', 'rgb(243, 156, 18)', 'rgb(231, 76, 60)', 'rgb(22, 160, 133)', 'rgb(39, 174, 96)', 'rgb(155, 89, 182)', 'rgb(52, 34, 36)', 'rgb(189, 187, 153)', 'rgb(71, 46, 50)'];

    state = {
        quotesArr: [],
        color: this.colorArr[Math.floor(Math.random()*(this.colorArr.length - 1))],
        currentQuote : {},
    }

    
    changeQuote = () => {
        setTimeout(function() {
            this.setState({
                quotesArr: this.state.quotesArr,
                color: this.colorArr[Math.floor(Math.random()*(this.colorArr.length - 1))],
                currentQuote: this.state.quotesArr[Math.floor(Math.random()*(this.state.quotesArr.length - 1))],
            });
        }.bind(this), 300);
    }

    render() {
        // console.log(currentQuote)
        return (
            <div className="randomQuote" style={{ backgroundColor: this.state.color, color: this.state.color }}>
                <div id="quote-box">
                    <div className="quote-text">
                        <i className="fa fa-quote-left"></i>
                        <span id="text">
                            {this.state.currentQuote?.quote}
                        </span>
                    </div>
                    <div id="author">
                        - {this.state.currentQuote?.author}
                    </div>
                    <div className="buttons">
                        <a id="tweet-quote" style={{ backgroundColor: this.state.color }} href={`https://twitter.com/intent/tweet?hashtags=quotes&text=${this.state.currentQuote?.quote} ${this.state.currentQuote?.author}`} target="_blank"><i className="fab fa-twitter"></i></a>
                        <button id="new-quote" style={{ backgroundColor: this.state.color }} onClick={this.changeQuote}>New quote</button>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount = () => {
        randomQuoteService.getQuotes().then(result => {
            console.log(result.data)
            this.setState({
                quotesArr: result.data,
                color: this.state.color,
                currentQuote: result.data[Math.floor(Math.random()*(result.data.length - 1))],
            });
        }).catch(error => {
            console.log('error', error.response.data)
        })
    }
}
