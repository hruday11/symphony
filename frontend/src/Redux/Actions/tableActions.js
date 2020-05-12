import axios from 'axios';
import { URL } from '../../constants';

export const GET_TABLE_DATA = 'get_table_data';
export const UPLOAD_FILE = 'upload_file';
export const UPDATE_TABLE_DATA = 'update_table_data';

export function uploadFile(file, filters){
    return dispatch => {
        const tableData = {
            data:[], 
            filteredData : []
        }
        axios.post(`${URL}upload`, file).then(res =>{
            tableData.data = res.data;
            tableData.filteredData = tableData.data.filter((key, i)=>{
                if(i < filters.lines){
                    return key
                }
            })
            dispatch({
                type: UPLOAD_FILE,
                payload : tableData
            })
        })
        
    }
}

export function updateTableData(fullData, filters){
    return dispatch => {
        const tableData = {
            data : fullData, 
            filteredData : []
        }
            tableData.filteredData = tableData.data.filter((key, i)=>{
                if(i < filters.lines){
                    return key
                }
            })
            dispatch({
                type: UPDATE_TABLE_DATA,
                payload : tableData
            })
    }
}

