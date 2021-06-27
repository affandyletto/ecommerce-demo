import React, { useEffect,useState } from 'react'
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';
import axios from 'axios'

const Modal = () => {
	const userInfo= localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
  
	const [columns, setColumns] = useState([]);
  	const [data, setData] = useState([]);
  	const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
 	
    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"')
              d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"')
              d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }
 
        // remove the blank rows
        if (Object.values(obj).filter(x => x).length > 0) {
          list.push(obj);
        }
      }
    }
 
    // prepare columns list from headers
    const columns = headers.map(c => ({
      name: c,
      selector: c,
    }));
 
    setData(list);
    setColumns(columns);
  }

	const handleFileUpload = e => {
	    const file = e.target.files[0];
	    const reader = new FileReader();
	    reader.onload = (evt) => {
	      /* Parse data */
	      const bstr = evt.target.result;
	      const wb = XLSX.read(bstr, { type: 'binary' });
	      /* Get first worksheet */
	      const wsname = wb.SheetNames[0];
	      const ws = wb.Sheets[wsname];
	      /* Convert array of arrays */
	      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
	      processData(data);
	    };
	    reader.readAsBinaryString(file);
  }

  	const onSubmit=(e)=>{
	    e.preventDefault()
	    axios.post(
	      `http://letto-ecommerce.herokuapp.com/products/addCsv`,
	      {'columns':columns,'data':data},
	      {headers: {"Authorization" : "Bearer "+ userInfo.token}}
	      ).then(
	        (res)=>{
	          window.location.reload()
	        }        
	      ).catch((err)=>{
	        alert(err)      
	      })
	  }

    return <div>
    	<div className="modal fade" id="skUploadSK" role="dialog" aria-labelledby="skUploadLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content" style={{"width":"1000px", "margin-left":"-250px"}}>
            <form encType="multipart/form-data" onSubmit={onSubmit}>
              <div className="modal-header">
                <h5 className="modal-title" id="skUploadLabel">Upload Products</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  The CSV format must following this pattern :<br/>
                  name, price, brand, description, category, shipping, featured, stock, image, color

                </p>
                <div className="position-relative form-group files">
                  <label>File</label>
                  <input onChange={handleFileUpload} name="file" type="file" className="form-control" multiple=""/>
                  <small className="form-text text-muted">
                    Only accept .csv file
                  </small>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Batal</button>
                <button type="submit" className="btn btn-danger">Upload</button>
              </div>              
            </form>

            <DataTable
		        pagination
		        highlightOnHover
		        columns={columns}
		        data={data}
		      />
          </div>
        </div>
      </div>
      </div>
      
}

export default Modal