import React, { Component } from 'react';
import BookComponent from './BookComponent';



class ShelfComponent extends Component{
    render(){
    const {books, category, changeCategory} = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{category}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books && 
                      books.map( book => 
                        <BookComponent key={book.id} changeCategory={changeCategory} {...book} book={books}/>)}
                    </ol>
                  </div>
                </div>
        )
    }
}

export default ShelfComponent;