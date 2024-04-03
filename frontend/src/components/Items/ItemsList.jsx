import { useEffect, useState } from "react";

// Components
import Item from "./Item";

// Server
import * as ItemsServer from "./ItemsServer";

const ItemsList = () => {
    
    const [items, Setitems] = useState([])

    const ItemsListed = async () => {
        try {
            const res = await ItemsServer.itemsListed()
            const data = await res.json()
            Setitems(data.items)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        ItemsListed()
    }, [])

    return (
        <div className="row">
            {items.map((item) => (
                <Item key={item.id} item={item} ItemsListed={ItemsListed} />
            ))}
        </div>
    )
}

export default ItemsList;