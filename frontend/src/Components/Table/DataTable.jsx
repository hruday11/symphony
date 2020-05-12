import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadFile, updateTableData } from '../../Redux/Actions/tableActions';
import Table from 'react-bootstrap/Table'

class DataTable extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedFile : null,
            filters : {
                delimiter : ",",
                lines:2
            }
        }
    }

    uploadFileToServer = () => {
        const { selectedFile, filters }= this.state;
        if(!selectedFile){
            alert("select a file pls");
            return;
        }
        // Create an object of formData 
        const formData = new FormData();
        // Update the formData object 
        formData.append(
            "file",
            selectedFile,
            selectedFile.name
        );
        formData.append("delimiter", filters.delimiter)

        // Details of the uploaded file 
        this.props.uploadFile(formData, filters);
    }

    onFileChange = event => {
        // Update the state 
        this.setState({ selectedFile: event.target.files[0]});

    };

    onChange = (value, key) =>{
        const { table: { tableData }} = this.props;
        const updatedFilter = this.state.filters;
        if(tableData.length == 0){
            alert("no table data yet upload file");
            return;
        }
        updatedFilter[key] = value;
        this.setState({
            filters : updatedFilter
        }, function(){
            this.props.updateTableData(tableData, this.state.filters)
        })
    }

    render() {
        const { filters : { delimiter, lines} } = this.state;
        const { table : { filteredData } } = this.props;
        return <div>
            <div className="formDiv">
            <input type="file" onChange={this.onFileChange} />
            <button onClick={this.uploadFileToServer}>uploadFile</button>
            </div>
            <div className="formDiv">
            <div className="inputDiv">
                <label htmlFor="delimiter">Delimiter :</label>
                <input value={delimiter} name="delimiter" type="text" onChange={(e)=>{this.onChange(e.target.value, 'delimiter')}} />
            </div>
            <div className="inputDiv">
                <label htmlFor="lines">Lines :</label>
                <input value={lines} name="lines" type="number" onChange={(e)=>{this.onChange(e.target.value, 'lines')}} />
            </div>
            </div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>State</th>
                        <th>Country</th>
                        <th>Zip</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((key, i) => {
                       return <tr key={i}>
                            <th>{i+1}</th>
                            <th>{key.name}</th>
                            <th>{key.address}</th>
                            <th>{key.state}</th>
                            <th>{key.country}</th>
                            <th>{key.zip}</th>
                        </tr>
                    })}

                </tbody>
            </Table>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        table: state.table
    };
}

export default connect(
    mapStateToProps,
    { uploadFile, updateTableData }
)(DataTable);