import { useState } from 'react';
import useBooksContext from '../hooks/use-books-context';

function BookCreate() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const { createBook } = useBooksContext();

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createBook(title, author);
        setTitle('');
        setAuthor('');
    };

    return (
        <div className="book-create">
            <h3>Add a Book</h3>
            <form onSubmit={handleSubmit} >
                <label>Title</label>
                <input className="input" value={title} onChange={handleTitleChange} />
                <label>Author</label>
                <input className="input" value={author} onChange={handleAuthorChange} />
                <button className="button">Create</button>
            </form>
        </div>
    );
}

export default BookCreate;