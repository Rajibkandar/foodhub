import React,{createContext, useContext, useReducer} from 'react'


const cartStateContext=createContext()
const cartDispatchContext=createContext()
const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        // Check if the item already exists in the cart
        const existingItemIndex = state.findIndex(item => item.id === action.id);
  
        if (existingItemIndex !== -1) {
          // Item exists, update the quantity
          const updatedState = [...state];
          updatedState[existingItemIndex] = {
            ...updatedState[existingItemIndex],
            qty: updatedState[existingItemIndex].qty + action.qty,
          };
          return updatedState;
        } else {
          // Item doesn't exist, add it to the cart
          return [
            ...state,
            {
              id: action.id,
              name: action.name,
              qty: action.qty,
              size: action.size,
              price: action.price,
              img: action.img,
            },
          ];
        }
  
      case 'REMOVE':
        // Handle remove action
        let newArr = [...state];
        newArr.splice(action.index, 1);
        return newArr;
  
      case 'UPDATE':
        // Handle update action
        return state.map(item =>
          item.id === action.id
            ? { ...item, qty: parseInt(action.qty) + item.qty, price: action.price + item.price }
            : item
        );
        case 'DROP':
            let empArray=[]
            return empArray
      default:
        console.log("error in reducer");
        return state;
    }
  };
// const reducer=(state,action)=>{
//     switch(action.type){
//         case 'ADD':
//             return [...state,{id:action.id,name:action.name,qty:action.qty,size:action.size,price:action.price,img:action.img}]
        
//         case 'REMOVE':
//             let newArr=[...state]
//             newArr.splice(action.index,1)
//             return newArr;
        
//         case 'UPDATE':
//             let arr=[...state]
//             arr.find((food,index)=>{
//                 if(food.id === action.id){
//                     // console.log(food.qty,parseInt(action.qty)+food.qty,price:action.price+food.price)
//                     arr[index]={...food,qty:parseInt(action.qty) +food.qty,price:action.price + food.price}
//                 }
//                 return arr;
//             })
//             break;
//         default:
//             console.log("error in reducer")
//             break;
//     }

// }

export default function CartProvider({children}) {
  const [state,dispatch]=useReducer(reducer,[])
  
    return (
    <cartDispatchContext.Provider value={dispatch}>
        <cartStateContext.Provider value={state}>{children}</cartStateContext.Provider>
    </cartDispatchContext.Provider>
  )
}

export const useCart=()=> useContext(cartStateContext)
export const useDispatchCart=()=> useContext(cartDispatchContext)