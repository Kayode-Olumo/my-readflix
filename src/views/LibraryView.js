import React, { Component } from 'react';
import ShelfComponent from '../components/ShelfComponent';
import AddBookComponent from '../components/AddBookComponent';
import {getAll} from '../BooksAPI';

export default class LibraryView extends Component{
    
    async componentDidMount(){
        try {
            const allBooks = await getAll();
            this.props.updateAllBooks(allBooks)
        } catch(error) {
            console.error('issue with getting all books');
        }
    }

    render(){
        const { currentlyReading, wantToRead, read, changeCategory } = this.props
        return(
            <div>
                <div className="list-books">
                    <div className="list-books-title">
                    <h1>ReadFlix</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            <ShelfComponent 
                                category="Currently Reading"
                                books={currentlyReading}
                                changeCategory={changeCategory}
                            />
                            <ShelfComponent 
                                category="Want to Read"
                                books={wantToRead}
                                changeCategory={changeCategory}
                            />
                            <ShelfComponent 
                                category="Read"
                                books={read}
                                changeCategory={changeCategory}
                            />
                        </div>
                    </div>
                    <AddBookComponent />
                </div>
            </div>
        )
    }
}