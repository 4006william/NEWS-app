import React, {Component} from 'react';

class Form extends Component {
    state = {
        search: "",
        articles: []
    }
    //

    handleInput = (e) => {
        this.setState({search: e.target.value})
    }
    handleSubmit = (e) => {
        e.preventDefault()
        fetch(`http://hn.algolia.com/api/v1/search?query=${this.state.search}`)
        .then(res=>res.json())
        .then(news=>{
            this.setState({search: '', articles: news.hits})
        })
    }


    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                    placeholder="What are you curious about?...."
                    value={this.state.search}
                    onChange={this.handleInput}
                    name="search" />
                    
                    <button class="search-btn"type="submit">Search News</button>
                </form>
                <div className="article-list">
                    {this.state.articles.map((a,i) =>{
                        return (
                            <div key={i} className="article">
                                <h3>>>>{a.title}>>> </h3>
                                <a href={a.url} target="blank">Click here to read this article</a>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Form;