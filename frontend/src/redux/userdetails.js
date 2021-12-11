export default function UserdetailsReducer(state={}, action){
    
    switch(action.type){
        case 'AUTH_SUCCESS' :{
            const user = action.payload
            return user
        }

        case 'DELETE_AUTH': {
            return {}
        }

        default : {
            return state
        }
    }
}