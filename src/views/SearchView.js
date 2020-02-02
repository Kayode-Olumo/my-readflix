import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {getAll, search} from '../BooksAPI'
import BookComponent from '../components/BookComponent';
// import ShelfComponent from '../components/ShelfComponent';

class SearchView extends Component{
    constructor(props){
        super(props)
        this.state = {
            searchQuery: '',
            searchBooks: []

        }
        this.onHandleSearchChange = this.onHandleSearchChange.bind(this);
    }

    async componentDidMount(){
        try {
            const allBooks = await getAll();
            this.props.updateAllBooks(allBooks)
        } catch(error) {
            console.error('issue with getting all books');
        }
    }

    onHandleSearchChange = async evt => {
        try{
            const searchQuery = evt.target.value;
            this.setState({
                searchQuery
            })
            if(searchQuery.trim()){
                const searchResult = await search(searchQuery);
                if(searchResult.error){
                    this.setState({ searchBooks: [] })
                    return <h1>Sorry no books found</h1>
                }else{
                    this.setState({ searchBooks: searchResult })
                }
            }else{
                this.setState({
                    searchBooks: []
                })
            }
            
        }catch(error){
            console.log(error)
        }
    }

    render(){
        const {searchQuery, searchBooks} = this.state;
        const {changeCategory} = this.props;
        return(
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                    <Link to={'/'}><button className="close-search">Close</button></Link>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            onChange={this.onHandleSearchChange} 
                            value={searchQuery}
                            />

                    </div>
                    </div>
                    <div className="search-books-results">
                    <ol className="books-grid">
                        {searchBooks.length > 0 && 
                            searchBooks.map( book => {
                                const shelfFindings = searchBooks.find(searchBook => searchBook.id === book.id)
                                if(shelfFindings){
                                    book.shelf = shelfFindings.shelf;
                                }else{
                                    book.shelf = 'none'
                                }
                                console.log(shelfFindings)
                                return <BookComponent 
                                            {...book}  
                                            changeCategory={changeCategory} 
                                            key={book.id}
                                            />
                            }
                        )}
                    </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchView;