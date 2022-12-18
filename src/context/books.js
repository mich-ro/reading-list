import {createContext, useState, useCallback} from 'react';
import axios from 'axios';

const BooksContext = createContext();

function Provider({children}){
    const [books, setBooks] = useState([]);

    //useCallback passes function from first render (unless passed some elements that have changed)
    //keeps useEffect from re-running when passed function in array (creates loop)
    const fetchBooks = useCallback(async () => {
        const response = await axios.get('http://localhost:3001/books');
        setBooks(response.data);
    }, []);

    const editBookById = async (id, newTitle, newAuthor) => {
        const response = await axios.put('http://localhost:3001/books/' + id, {
            title: newTitle, author: newAuthor
        });

        console.log(response); 

        const updatedBooks = books.map((book) => {
            if (book.id === id){
                return { ...book, ...response.data };
            }
            //else
            return book;
        });

        setBooks(updatedBooks);
    };

    const deleteBookById = async (id) => {
        const response = await axios.delete('http://localhost:3001/books/' + id);

        const updatedBooks = books.filter((book) => {
            return book.id !== id;
        });
        setBooks(updatedBooks);
    };

    const createBook = async (title, author) => {
        const response = await axios.post('http://localhost:3001/books', {
            title: title, author: author
        });

        const updatedBooks = [
            ...books,
            response.data
        ];
        setBooks(updatedBooks);
    };

    const valueToShare = {
        books,
        deleteBookById,
        editBookById,
        createBook,
        fetchBooks
    };

    return <BooksContext.Provider value={valueToShare}>
        {children}
    </BooksContext.Provider>
}

export { Provider };
export default BooksContext;