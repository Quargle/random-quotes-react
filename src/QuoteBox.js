import React from "react";


class QuoteBox extends React.Component {
    constructor(props) {
        super(props);
        this.getQuotes = this.getQuotes.bind(this);
        this.getQuote = this.getQuote.bind(this);
        this.getRandomNumber = this.getRandomNumber.bind(this);
        this.state = {
          quotesData: {},
          currentQuote: {
            quote: '',
            author: ''
          }
        }
    }

    componentDidMount() {
      window.addEventListener('load', this.getQuotes);
    }

    getQuotes() {
      fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then(response => response.json())
      .then(data => {
        this.setState({quotesData: data.quotes});
        console.log(this.state.quotesData);
        this.getQuote();
      })
      .catch(error => {
        console.log(error);
      })
    }

    getQuote() {
      const randomIndex = this.getRandomNumber(this.state.quotesData.length);
      console.log(`Random number selected: ${randomIndex}`)
      this.setState({currentQuote: this.state.quotesData[randomIndex]})
    }

    getRandomNumber(max) {
      const randomNumber = Math.floor(Math.random() * max);
      return randomNumber;
    }

    render() {
        const quote = this.state.currentQuote.quote;
        const author = this.state.currentQuote.author
        return (
            <div id="quote-box">
            <div id="text">{quote}</div>
              <div id="author"> -- {author}</div>
              <div id="buttons">
                <button className="button" id="new-quote" onClick={this.getQuote}>New Quote</button>
                <a className="button" id="tweet-quote"  
                href={"https://www.twitter.com/intent/tweet?hashtags=quotes&text="+quote+"  -- "+author}
                >
                  Tweet
                </a>
              </div>
            </div>
        )
    }
}

export default QuoteBox;