import { AccordionActions } from "@material-ui/core";
import {
    LOGIN_REQUSET,
    LOGIN_SUCCSESS,
    LOGIN_FAIL,

    RIGESTER_REQUSET,
    RIGESTER_SUCCSESS,
    RIGESTER_FAIL,

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    LOGOUT_SUCCESS,
    LOGOUT_FAIL,

    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,
    
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,

    CLEAR_ERRORS,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_RESET,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_RESET,
    UPDATE_USER_FAIL,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_REQUEST,
} from "../constants/userConstants";


const authReducer = (state = { user: {} }, action)=>{
    switch (action.type) {
        //Login
        case LOGIN_REQUSET:
        case RIGESTER_REQUSET:
        case LOAD_USER_REQUEST:
            return{
                loading: true,
                isAuthenticated: false,
            }


        case LOGIN_SUCCSESS:
        case RIGESTER_SUCCSESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };
            

        case LOGIN_FAIL:
        case RIGESTER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: AccordionActions.payload,
            };
        

        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: AccordionActions.payload,
            };


        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
            };
        
        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        


            
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            }
    
        default:
            return state;
    }
}




const profileReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_PROFILE_REQUEST:
      case DELETE_USER_REQUEST:
      case UPDATE_USER_REQUEST:
        return {
          ...state,
          loading: true,
        };

      case UPDATE_PROFILE_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };

      case DELETE_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload.success,
          message: action.payload.message,
        };

      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };

      case UPDATE_PROFILE_FAIL:
      case DELETE_USER_FAIL:
      case UPDATE_USER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

      case UPDATE_PROFILE_RESET:
        return {
          ...state,
          isUpdated: false,
        };

      case UPDATE_USER_RESET:
        return {
          ...state,
          isUpdated: false,
        };

      case DELETE_USER_RESET:
        return {
          ...state,
          isDeleted: false,
        };

      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };

      default:
        return state;
    }
};




const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ALL_USERS_REQUEST:
        return {
            ...state,
            loading: true,
        };
        case ALL_USERS_SUCCESS:
        return {
            ...state,
            loading: false,
            users: action.payload,
        };

        case ALL_USERS_FAIL:
        return {
            ...state,
            loading: false,
            error: action.payload,
        };

        case CLEAR_ERRORS:
        return {
            ...state,
            error: null,
        };

        default:
        return state;
    }
};







const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};


export { authReducer, profileReducer, allUsersReducer, userDetailsReducer };