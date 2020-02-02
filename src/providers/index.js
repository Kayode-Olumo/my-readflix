import React, { Component } from 'react';

export const Context = React.createContext();

export default class Index extends Component{
    constructor(){
        super()
        this.state = {
                allBooks: [],
                currentlyReading: [],
                wantToRead: [],
                read: [],
                    updateAllBooks: (allBooks) => {
                        //returns a new array if content matches e.g. currentlyReading
                        const currentlyReading = allBooks.filter(book => book.shelf === 'currentlyReading');
                        const wantToRead = allBooks.filter(book => book.shelf === 'wantToRead');
                        const read = allBooks.filter(book => book.shelf === 'read');
                        console.log(allBooks)
                        console.log(allBooks,currentlyReading,wantToRead,read)

                        this.setState({allBooks, currentlyReading, wantToRead, read})
                    },

                    changeCategory: (book, newShelf, allShelfs) => {
                        //moves book from one shelf to another

                        console.log(book, newShelf)
                        const {allBooks} = this.state;
                        const newBooks = allBooks.map(allBooks => {
                            const foundID = allShelfs[newShelf].find(
                                bookID => bookID === allBooks.id
                            );
                            if(foundID){
                                allBooks.shelf = newShelf;
                            }
                            return allBooks;
                        });
                        this.state.updateAllBooks(newBooks);
                    }
            }
        }

    render(){
        return(
        <Context.Provider value={{...this.state}}>
            {this.props.children}
        </Context.Provider>
        );
    }
}