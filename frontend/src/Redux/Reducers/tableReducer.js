import { GET_TABLE_DATA, UPLOAD_FILE, UPDATE_TABLE_DATA } from '../Actions/tableActions'

  var intialState = {
        loading : true,
        tableData : [],
        filteredData : []
    }
    export default function ( state = intialState, action) {
        switch(action.type) {
            case GET_TABLE_DATA:
            return {...state, table : action.payload};
            break;
            case UPLOAD_FILE:
            return {...state, tableData : action.payload.data, filteredData : action.payload.filteredData};
            case UPDATE_TABLE_DATA:
            return {...state, filteredData : action.payload.filteredData};
            break; 
            default:
            return state;
        }
    }