import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState } from 'react';

const BookCreate = () => {
    const router = useRouter()
    const [bookTitle, setBookTitle] = useState('')
    const [errors, setErrors] = useState([])
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()
        // console.log(bookTitle)
        setSubmitting(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`, {
            method: 'POST',
            headers: {
                accept: 'appication/json',
                'content-type': 'appication/json',           
            },
            body: JSON.stringify({
                title: bookTitle
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
            <h1>Create Book</h1>
            {/* <p>{JSON.stringify(errors)}</p> */}
            <form onSubmit={handleSubmit}>
                <input 
                    onChange={(e) => setBookTitle(e.target.value)} 
                    value={bookTitle}
                    disabled={submitting}
                    type="text"
                />
                <button 
                    disabled={submitting}
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

export default BookCreate; 