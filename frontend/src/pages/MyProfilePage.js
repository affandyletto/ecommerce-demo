import React from 'react'
import styled from 'styled-components'
import Header from "../utils/Header"
const MyProfilePage =()=> {
	return (
		<Wrapper>
	<Header/>		
	 <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">          
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6"><label className="labels">Name</label><input type="text" className="form-control" placeholder="first name" defaultValue /></div>
                <div className="col-md-6"><label className="labels">Surname</label><input type="text" className="form-control" defaultValue placeholder="surname" /></div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12"><label className="labels">PhoneNumber</label><input type="text" className="form-control" placeholder="enter phone number" defaultValue /></div>
                <div className="col-md-12"><label className="labels">Address</label><input type="text" className="form-control" placeholder="enter address" defaultValue /></div>
                <div className="col-md-12"><label className="labels">Email ID</label><input type="text" className="form-control" placeholder="enter email id" defaultValue /></div>
                <div className="col-md-12"><label className="labels">Education</label><input type="text" className="form-control" placeholder="education" defaultValue /></div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control" placeholder="country" defaultValue /></div>
                <div className="col-md-6"><label className="labels">State/Region</label><input type="text" className="form-control" defaultValue placeholder="state" /></div>
              </div>
              <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button">Save Profile</button></div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus" />&nbsp;Experience</span></div><br />
              <div className="col-md-12"><label className="labels">Experience in Designing</label><input type="text" className="form-control" placeholder="experience" defaultValue /></div> <br />
              <div className="col-md-12"><label className="labels">Additional Details</label><input type="text" className="form-control" placeholder="additional details" defaultValue /></div>
            </div>
          </div>
        </div>
      </div>
      </Wrapper>

	)
}
const Wrapper = styled.div`
	body {
    background: rgb(99, 39, 120)
}

.form-control:focus {
    box-shadow: none;
    border-color: #BA68C8
}

.profile-button {
    background: rgb(99, 39, 120);
    box-shadow: none;
    border: none
}

.profile-button:hover {
    background: #682773
}

.profile-button:focus {
    background: #682773;
    box-shadow: none
}

.profile-button:active {
    background: #682773;
    box-shadow: none
}

.back:hover {
    color: #682773;
    cursor: pointer
}

.labels {
    font-size: 11px
}

.add-experience:hover {
    background: #BA68C8;
    color: #fff;
    cursor: pointer;
    border: solid 1px #BA68C8
}
`
export default MyProfilePage