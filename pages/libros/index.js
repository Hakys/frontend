import Link from 'next/link';

export async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`)
    // console.log(res)
    const data = await res.json()
    //console.log(data)
    return {
        props: {
            books: data,
        }
    }
}

// <pre>{JSON.stringify(books)}</pre>
const BookList = ({ books }) => {
    async function handleDelete(e, bookId){
        e.preventDefault()
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${bookId}`, {
            method: 'POST',
            headers: {
                accept: 'appication/json',
                'content-type': 'appication/json',           
            },
            body: JSON.stringify({
                _method: 'DELETE'
            })
        })
        if(res.ok){
            // success
            window.location.href='/libros'
        }
    }

    return (
        <div>
            <h1>Books List</h1>
            <ul>
                {books.map(book => (
                    <li key={`book-${book.id}`}>
                        <Link href={`/libros/${book.id}`}>{book.title}</Link> 
                        {' - '}
                        <Link href={`/libros/${book.id}/editar`}>Editar</Link>
                        {' - '}
                        <form 
                            onSubmit={(e) => handleDelete(e, book.id)}
                            style={{display: 'inline'}}
                        >
                            <button>Eliminar</button>
                        </form>    
                    </li>
                ))}
            </ul>
            <Link href="/libros/crear">Create Book</Link>
        </div> 
    );
};

export default BookList;