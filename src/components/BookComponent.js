import React, { Component } from 'react';
import {update} from '../BooksAPI';

class BookComponent extends Component{

    handleMenuChange = async e =>{
        try {
            const book = this.props
            const bookShelf = e.target.value;
            const result = await update(book, bookShelf);
            this.props.changeCategory(book, bookShelf)
            console.log(result)
        }catch(error){
            console.log(error)
        }
        // console.log(e.target.value)
    }

    render(){
        const { title, authors, imageLinks, shelf } = this.props;
        return (
            <div className="book-container">
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks ? imageLinks.thumbnail : ''})`}}></div>
                    <div className="book-shelf-changer">
                        <select onChange={this.handleMenuChange} value={shelf}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{authors ? authors[0] : ''}</div>
                </div>
            </div>
        )
    }
}
 
export default BookComponent;