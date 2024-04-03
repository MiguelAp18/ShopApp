/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'

// Server
import * as ItemsServer from './ItemsServer'

const Item = ({ item, ItemsListed }) => {

  const navigate = useNavigate()
  
  const handleDelete = async(itemId) => {
    await ItemsServer.deleteItem(itemId)
    ItemsListed()
  }

  return (
    <div className='col-md-4 mb-4'>
        <div className='card card-body'>
            <h3 className='card-title'>
              {item.title}
              <button onClick={() => item.id && handleDelete(item.id)} className="ms-3 btn btn-sm btn-danger">
                Delete
              </button>
            </h3>
            <p className='card-text mt-3'>Description: {item.description}</p>
            <p className='card-text mt-3'>Price: {item.price}</p>
            <img src={item.image}/>
            <button onClick={() => navigate(`/update-item/${item.id}`)} className="btn btn-primary">
              Update
            </button>
        </div>
    </div>
  )
}

export default Item;