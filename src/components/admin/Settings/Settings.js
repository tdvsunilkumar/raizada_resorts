import React, { useEffect, useState } from "react";
import Main from "../Layout/Main/Main";
import { Form } from "react-bootstrap";
import { useLoadder } from "../Context/LoaderContext";
import { loadSettingsData, updateSettings } from "./SettingsAPI";
import { displayNotification } from "../../../utlts/admin/functions";
import { enviourment } from "../enviourment/enviourment";
import { Link } from "react-router-dom";

const Settings = () => {
    const [validated, setvalidated] = useState(false);
    const [imageSrc,setimageSrc] = useState(null);
    const [image,setimage] = useState(null);
    const {loading, setLoading} = useLoadder();
    const [settingsData, setsettingsData] = useState({});

    const handleLogo = (event) => {
        //console.log(event.target);
        if(event.target.files && event.target.files.length > 0){
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.addEventListener('load',()=>{
              setimageSrc(reader.result);
              setimage(event.target.files[0]);
            });
          }
    }
    const handleUpdateSettings= async(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        
        if (form.checkValidity() === true) {
            const formData = {
              'website_name'    : event.target.website_name.value,
              'website_logo' : image,
              'contact_person'    : event.target.contact_person.value,
              'hotel_address' : event.target.hotel_address.value,
              'hotel_contact_no'    : event.target.hotel_contact_no.value,
              'contact_person_mobile' : event.target.contact_person_mobile.value,
              'hotel_email'    : event.target.hotel_email.value,
              'hotel_facebook_page' : event.target.hotel_facebook_page.value,
              'hotel_instagram_page'    : event.target.hotel_instagram_page.value,
              'hotel_twitter_page' : event.target.hotel_twitter_page.value,
              'hotel_short_info'    : event.target.hotel_short_info.value,
              'persons_allowed_for_spa' : event.target.persons_allowed_for_spa.value,
              'persons_allowed_for_Jacuzzi'    : event.target.persons_allowed_for_Jacuzzi.value,
              'gst' : event.target.gst.value,

            };
            console.log(formData);
            setLoading(true);
            await updateSettings(formData)
            .then((response)=>{
                if(response.data.status == 'success'){
                    displayNotification(response.data.message,'success');
                }if(response.data.status == 'error'){
                    displayNotification(response.data.message,'error');
                }
            })
            .catch((error)=>{
                displayNotification(error.message,'error');
            });
            setLoading(false);

        }
        setvalidated(true);

    }

    const fetchSettingsData = async() => {
        setLoading(true);
        await loadSettingsData().then((response)=>{
            setsettingsData(response.data.data);
            
            if(response.data.data !== null && response.data.data.website_logo != null){
                setimageSrc(enviourment.BASE_BACKEND_URL+response.data.data.website_logo);
            }
            
        }).catch((error)=>{
            displayNotification(error.message,'error');

        });
        setLoading(false);
    }

    useEffect(()=>{
        fetchSettingsData();
    },[]);
    return (
        <Main>
          <div className="pagetitle">
      <h1>Settings</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
          <li className="breadcrumb-item active">Settings</li>
        </ol>
      </nav>
    </div>

    <section className="section">
      <div className="row" >
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body"  style={{marginTop:'20px'}}>
                <Form onSubmit={handleUpdateSettings} className="row g-3" validated={validated} noValidate>
                <div className="col-md-4">
                  <label htmlFor="inputCity" className="form-label">Website Name</label>
                  <Form.Control
                  name="website_name"
                  className="form-control"
                  type="text"
                  defaultValue={settingsData?.website_name}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">Website Name is Invalid</Form.Control.Feedback>
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputState" className="form-label">Website Logo</label>
                  <Form.Control
                  name="website_logo"
                  className="form-control"
                  onChange={handleLogo}
                  type="file"
                  ></Form.Control>
                </div>
                <div className="col-md-4">
                 
                  {imageSrc !== null?(<img src={imageSrc} alt="Website Logo" style={{width:'70px'}} />):('')}
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputCity" className="form-label">Contact Person</label>
                  <Form.Control
                  name="contact_person"
                  className="form-control"
                  type="text"
                  defaultValue={settingsData?.contact_person}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">Contact Person is Invalid</Form.Control.Feedback>
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputCity" className="form-label">Contact Person Mobile No.</label>
                  <Form.Control
                  name="contact_person_mobile"
                  className="form-control"
                  type="text"
                  defaultValue={settingsData?.contact_person_mobile}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">Contact Person Mobile No.</Form.Control.Feedback>
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputCity" className="form-label">Hotel Address</label>
                  <Form.Control
                  name="hotel_address"
                  className="form-control"
                  type="text"
                  defaultValue={settingsData?.hotel_address}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">Hotel Address is Invalid</Form.Control.Feedback>
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputCity" className="form-label">Hotel Contact No.</label>
                  <Form.Control
                  name="hotel_contact_no"
                  className="form-control"
                  type="text"
                  defaultValue={settingsData?.hotel_contact_no}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">Hotel Contact No. is Invalid</Form.Control.Feedback>
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputCity" className="form-label">Hotel Email</label>
                  <Form.Control
                  name="hotel_email"
                  className="form-control"
                  type="email"
                  defaultValue={settingsData?.hotel_email}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">Hotel Email is Invalid</Form.Control.Feedback>
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputCity" className="form-label">GST %</label>
                  <Form.Control
                  name="gst"
                  className="form-control"
                  type="text"
                  pattern="[0-9]+([\.,][0-9]+)?"
                  defaultValue={settingsData?.gst}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">Hotel GST is Invalid</Form.Control.Feedback>
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputCity" className="form-label">Persons allowed for Spa</label>
                  <Form.Control
                  name="persons_allowed_for_spa"
                  className="form-control"
                  type="number"
                  defaultValue={settingsData?.persons_allowed_for_spa}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">Hotel Email is Invalid</Form.Control.Feedback>
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputCity" className="form-label">Persons allowed for Jacuzzi</label>
                  <Form.Control
                  name="persons_allowed_for_Jacuzzi"
                  className="form-control"
                  type="number"
                  defaultValue={settingsData?.persons_allowed_for_Jacuzzi}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">Hotel Email is Invalid</Form.Control.Feedback>
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputCity" className="form-label">Hotel Facebook Page</label>
                  <Form.Control
                  name="hotel_facebook_page"
                  className="form-control"
                  type="url"
                  defaultValue={settingsData?.hotel_facebook_page}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">Hotel Facebook Page is Invalid</Form.Control.Feedback>
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputCity" className="form-label">Hotel Instagram Page</label>
                  <Form.Control
                  name="hotel_instagram_page"
                  className="form-control"
                  type="url"
                  defaultValue={settingsData?.hotel_instagram_page}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">Hotel Instagram Page is Invalid</Form.Control.Feedback>
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputCity" className="form-label">Hotel Twitter Page</label>
                  <Form.Control
                  name="hotel_twitter_page"
                  className="form-control"
                  type="url"
                  defaultValue={settingsData?.hotel_twitter_page}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">Hotel Twitter Page is Invalid</Form.Control.Feedback>
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputCity" className="form-label">Hotel Info</label>
                <textarea className="form-control" name="hotel_short_info" defaultValue={settingsData?.hotel_short_info}></textarea>
                  </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Update Settings</button>
                 
                </div>
                </Form>

            </div>
          </div>

        </div>
      </div>
    </section>
        </Main>
        
    );
}

export default Settings;