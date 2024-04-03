
const url = 'https://fakestoreapi.com/products'

export const ItemsData = async () => {

    try {
        const res = await fetch(url)
        const all_items = await res.json()

        const data = all_items.map(item =>{
            return {
                title: item.title,
                description: item.description,
                price: item.price,
                image: item.image
            }
        })

        return data
    } catch (error) {
        console.log('Error fetching data: ', error)
    }
    

}


