import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {

    switch (action.type) {
        case "ADD":
            let existingIndex = state.findIndex(item => item.id === action.id && item.size === action.size);

            if (existingIndex !== -1) {                                      // if same item with same size exists, update its quantity and price
                let updateState = [...state];
                updateState[existingIndex] = {
                    ...updateState[existingIndex],
                    qty: parseInt(updateState[existingIndex].qty) + parseInt(action.qty),
                    price: parseFloat(updateState[existingIndex].price) + parseFloat(action.price)
                };
                return updateState;
            } else {                                                        // if it's a different size, add a

                return [...state, {
                    id: action.id,
                    name: action.name,
                    qty: parseInt(action.qty),                   // ensure quantity is stored as a number
                    size: action.size,
                    price: parseFloat(action.price),             // ensure price is stored as number
                    img: action.img
                }]
            }


        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;

        case "DROP":
            let empArray = []
            return empArray;

        case "UPDATE":
            return state.map(item =>
                item.id === action.id
                    ? { ...item, qty: parseInt(item.qty) + parseInt(action.qty),
                        price: parseFloat(item.price) + parseFloat(action.price) }
                    : item)

        default:
            console.log("Error in Reducer");
            return state;
    }

}

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, [])

    return (


        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>

    )
}


export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);