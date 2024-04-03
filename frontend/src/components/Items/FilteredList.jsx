/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// Components
import Item from '../Items/Item.jsx';
import Spinner from './Spinner.jsx';

// Server
import * as ItemsServer from '../Items/ItemsServer.js'

// eslint-disable-next-line react/prop-types
const FilteredList = () => {
    
    const [title, setTitle] = useState("")
    const [items, setItems] = useState([])
    const [searchParams, setSearchParams] =  useSearchParams()

    const [isLoading, setIsLoading] = useState(true);

    const param = searchParams.get("title")
    
    useEffect(() => {
        
        try {        
            setTitle(param)
            
            if(title) {
                getFilteredItems(title)
                setIsLoading(false);
                console.log('Title: ', title)
            } else {
                console.log("Title not found")
            }
        } catch (error) {
            console.log("Server error: ", error)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param, title])

    const getFilteredItems = async (title) => {
        const res = await ItemsServer.searchItem(title);
        const data = await res.json();
        
        console.log('Data: ', data)
        setItems(data.items)
    }
    

    return (
        <div>
            { isLoading ? (
                <Spinner />
            ) : (
                <div className="row">
                    {items.map((item) => (
                        <Item key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default FilteredList;
