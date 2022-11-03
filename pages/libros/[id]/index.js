import Link from 'next/link';

export async function getStaticProps({params}) {
    // console.log(context.params.id)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.id}`)
    const data = await res.json()
    return {
        props: {
            book: data
        }
    }
}

export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`)
    const data = await res.json()
    return {
        paths: data.map(book => ({
            params: {id: String(book.id)}
        })),
        fallback: false 
    }
}

const BookDetail = ({ book }) => {
    return (
        <div>
            <h1>Book Detail: {book.title}</h1>

            <Link href="/libros">Book List</Link>
        </div>
    );
};

export default BookDetail;