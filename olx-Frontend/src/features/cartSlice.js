import { createSlice } from '@reduxjs/toolkit'

// slice to store the cart properties
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        properties: [],
    },
    reducers: {
        addToCart: (state, action) => {
            // get the property from action to add to the state
            const property = action.payload

            // add the property to the collection
            state.properties.push(property)
        },
        removeFromCart: (state, action) => {
            // get the property from action to remove from state
            const propertyId = action.payload

            // keep all the items except the property
            state.properties = state.properties.filter(
                (item) => item['id'] != propertyId
            )

            /*
            // search the property's index to be removed from array
            const index = state.properties.findIndex(
              (item) => item['id'] == property['id']
            )
      
            // check if the index is > 0
            if (index > 0) {
              // 1st: index of the value to be removed
              // 2nd: count of values to be removed
              state.properties.splice(index, 1)
            }
            */
        },
        emptyCart: (state) => {
            state.properties = []
        },
    },
})

// export actions
export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions

// export default the reducer
export default cartSlice.reducer
