import { CATEGORY_DATA } from "./actionType";

export const categoryDataAction = (category) => ({
    type:CATEGORY_DATA,
    payload : category
})

export const categoryDataFetching = () => {
    return(dispatch) => {
        
    }
}