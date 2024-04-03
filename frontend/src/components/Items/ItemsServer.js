const api_url = 'http://localhost:4000/items/'

export const itemsListed = async () => {
    return await fetch(api_url)
}

export const getItem = async (itemId) => {
    return await fetch(`${api_url}${itemId}`)
}

export const registerItem = async (newItem) => {
    return await fetch(api_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'title': String(newItem.title).trim(),
            'description': String(newItem.description).trim(),
        })
    })
}

export const updateItem = async (itemId, updatedItem) => {
    return await fetch(`${api_url}${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'title': String(updatedItem.title).trim(),
            'description': String(updatedItem.description).trim(),
        })
    })
}

export const deleteItem = async (itemId) => {
    return await fetch(`${api_url}${itemId}`, {
        method: 'DELETE'
    })
}

export const searchItem = async (title) => {
    return await fetch(`http://localhost:4000/search-title?title=${title}`)
}