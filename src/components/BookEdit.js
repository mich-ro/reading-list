import {useState} from 'react';
import useBooksContext from '../hooks/use-books-context';

function BookEdit({ book, onSubmit }) {
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const { editBookById } = useBooksContext();

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        onSubmit();
        editBookById(book.id, title, author);
    };

    return (
        <form className="book-edit" onSubmit={handleSubmit}>
            <label>Title</label>
            <input className="input" value={title} onChange={handleTitleChange} />
            <label>Author</label>
            <input className="input" value={author} onChange={handleAuthorChange} />
            <button className="button is-primary">Save</button>
        </form>
    );
}

export default BookEdit;