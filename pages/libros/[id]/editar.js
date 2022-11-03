import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState } from 'react';


export async function getServerSideProps({params}){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.id}`)
    const data = await res.json()

    return {
        props: {
            book: data
        }
    }
}

const BookEdit = ({ book }) => {
    const router = useRouter()
    const [bookTitle, setBookTitle] = useState(book.title)
    const [errors, setErrors] = useState([])
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()
        // console.log(bookTitle)
        setSubmitting(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${book.id}`, {
            method: 'POST',
            headers: {
                accept: 'appication/json',
                'content-type': 'appication/json',           
            },
            body: JSON.stringify({
                title: bookTitle,
                _method: 'PATCH'
            })
        })
        // console.log(res)
        if(res.ok) {
            // success
            setErrors([])
            setBookTitle('')
            return router.push('/libros')
        }
        // failure
        const data = await res.json()
        setErrors(data.errors)
        setSubmitting(false)
    }
    
    return (
        <div>
            <h1>Book Edit</h1>
            {/* <p>{JSON.stringify(errors)}</p> */}
            <form onSubmit={handleSubmit}>
                <input 
                    onChange={(e) => setBookTitle(e.target.value)} 
                    value={String(bookTitle)}
                    disabled={submitting}
                    type="text"
                    data-cy="input-book-title"
                />
                <button 
                    disabled={submitting}
                    data-cy="button-submit-book"
                >{submitting ? 'Enviando..' : 'Enviar'}</button>
                {errors.title && (
                    <span style={{
                        color:'red', display: 'block'
                    }}>{errors.title}</span>
                )}
            </form>
            <br/>
            <Link href="/libros">Book List</Link>
        </div>
    );
};

export default BookEdit; 