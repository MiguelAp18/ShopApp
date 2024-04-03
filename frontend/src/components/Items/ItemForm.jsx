import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Server
import * as ItemsServer from './ItemsServer'

const ItemForm = () => {

    const navigate = useNavigate()
    const params = useParams()

    const initialState = {id: 0, title: '', description: ''}
    const [item, setItem] = useState(initialState)

    const handleInputChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value })   
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            if(!params.id) {       
                await ItemsServer.registerItem(item)
                setItem(initialState)
            } else {
                await ItemsServer.updateItem(params.id, item)
            }
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const getItem = async (itemId) => {
        try {
            const res = await ItemsServer.getItem(itemId)
            const data = await res.json()
            const { title, description } = data.item
            setItem({title, description})
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(params.id) {
            getItem(params.id)
        }
        // eslint-disable-next-line
    }, [])

    return (
    <div className='col-md-3 mx-auto'>
        <h2 className='mb-3 text-center'>Item</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                <input type="text" name='title' value={item.title} onChange={handleInputChange} className="form-control" minLength={2} maxLength={50} autoFocus required/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                <input type="text" name='description' value={item.description} onChange={handleInputChange} className="form-control" minLength={2} maxLength={300} required/>
            </div>
            <div className='d-grid gap-2'>
                {
                    params.id ? (
                        <button type="submit" className="btn btn-primary">Update</button>
                    ): (
                        <button type="submit" className="btn btn-success">Submit</button>
                    )
                }
            </div>
        </form>
    </div>
    )
}

export default ItemForm