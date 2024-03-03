import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { enviourment } from "../enviourment/enviourment";
import SectionTypeSelectList from "../CommonElements/CommonElements";
import { useLoadder } from "../Context/LoaderContext";
import { addUpdateSection, getSectionDetails } from "./SectionAPI";
import { displayNotification } from "../../../utlts/admin/functions";
const AddSection = ({handleHide, setrefreshDataTable, id}) => {
    const [validated, setValidated] = useState(false);
    const [sectionData, setsectionData] = useState({});
    const [imageSrc, setimageSrc] = useState(null);
    const {loading, setLoading} = useLoadder();
    const [image, setimage] = useState('');

    const handleAddUpdateSection = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
                const formData = {
                  'id' : event.target.id.value,
                  'name'     : event.target.name.value,
                  'type'    : event.target.type.value,
                  'title_1'   : event.target.title_1.value,
                  'title_2'  : event.target.title_2.value, 
                  'title_3' : event.target.title_3.value,
                  'paragraph_1'     :event.target.paragraph_1.value,
                  'paragraph_2'     : event.target.paragraph_2.value,
                  'paragraph_3'    : event.target.paragraph_3.value,
                  'icon_1'   : event.target.icon_1.value,
                  'icon_2'  : event.target.icon_2.value, 
                  'icon_3' : event.target.icon_3.value,
                  'image'     :image,
                };
                setLoading(true);
                 await addUpdateSection(formData)
                 .then((response)=>{
                    if(response.data.status == 'success'){
                        displayNotification(response.data.message,'success');
                        handleHide();
                        setrefreshDataTable(new Date().getSeconds());
                    }if(response.data.status == 'error'){
                        displayNotification(response.data.message,'error');
                    }
                }).catch((error)=>{
                    displayNotification(error.message,'error');

                });
                setLoading(false);
        }
        setValidated(true);

    }
    const handleImage = (event) => {
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

    const getSingleSectionRecord = async() => {
        setLoading(true);
                 await getSectionDetails(id)
                 .then((response)=>{
                    if(response.data.status == 'success'){
                        setsectionData(response.data.data);
                        setLoading(false);
                        setimageSrc(enviourment.BASE_BACKEND_URL+response.data.data.image);
                    }
                }).catch((error)=>{
                    displayNotification(error.message,'error');
                    setLoading(false);

                });
                setLoading(false);

    }

    useEffect(()=>{
        getSingleSectionRecord();
    },[id]);
    return (
        <div className="row" >
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body"  style={{marginTop:'20px'}}>
                <Form onSubmit={handleAddUpdateSection} className="row g-3" validated={validated} noValidate>
                <div className="col-md-12">
                  <label htmlFor="inputCity" className="form-label">Type</label>
                  <Form.Select
                  name="type"
                  className="form-control"
                  required
                  >
                    <option value="">Select Type</option>
                    <SectionTypeSelectList selectedValue={sectionData?.type}></SectionTypeSelectList>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">Section Type is Invalid</Form.Control.Feedback>
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputCity" className="form-label">Name</label>
                  <Form.Control
                  required
                  name="name"
                  className="form-control"
                  type="text"
                  defaultValue={sectionData?.name}
                  ></Form.Control>
                  <Form.Control
                  name="id"
                  className="form-control"
                  type="hidden"
                  defaultValue={sectionData?.id}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">Section Name is Invalid</Form.Control.Feedback>
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputCity" className="form-label">First Title</label>
                  <Form.Control
                  
                  name="title_1"
                  className="form-control"
                  type="text"
                  defaultValue={sectionData?.title_1}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">Section Name is Invalid</Form.Control.Feedback>
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputCity" className="form-label">Second Title</label>
                  <Form.Control
                  
                  name="title_2"
                  className="form-control"
                  type="text"
                  defaultValue={sectionData?.title_2}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">Section Name is Invalid</Form.Control.Feedback>
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputCity" className="form-label">Third Title</label>
                  <Form.Control
                  
                  name="title_3"
                  className="form-control"
                  type="text"
                  defaultValue={sectionData?.title_3}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">Section Name is Invalid</Form.Control.Feedback>
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputCity" className="form-label">First Paragraph</label>
                <textarea className="form-control" name="paragraph_1" defaultValue={sectionData?.paragraph_1}></textarea>
                  </div>
                  <div className="col-md-12">
                  <label htmlFor="inputCity" className="form-label">Second Paragraph</label>
                <textarea className="form-control" name="paragraph_2" defaultValue={sectionData?.paragraph_2}></textarea>
                  </div>
                  <div className="col-md-12">
                  <label htmlFor="inputCity" className="form-label">Third Paragraph</label>
                <textarea className="form-control" name="paragraph_3" defaultValue={sectionData?.paragraph_3}></textarea>
                  </div>
                  <div className="col-md-12">
                  <label htmlFor="inputCity" className="form-label">First Icon</label>
                  <Form.Control
                  name="icon_1"
                  className="form-control"
                  type="text"
                  defaultValue={sectionData?.icon_1}
                  ></Form.Control>
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputCity" className="form-label">Second Icon</label>
                  <Form.Control
                  
                  name="icon_2"
                  className="form-control"
                  type="text"
                  defaultValue={sectionData?.icon_2}
                  ></Form.Control>
                  
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputCity" className="form-label">Third Icon</label>
                  <Form.Control
                  name="icon_3"
                  className="form-control"
                  type="text"
                  defaultValue={sectionData?.icon_3}
                  ></Form.Control>
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputState" className="form-label">Section Image</label>
                  <Form.Control
                  name="website_logo"
                  className="form-control"
                  onChange={handleImage}
                  type="file"
                  ></Form.Control>
                </div>
                <div className="col-md-6" style={{marginTop:'20px'}}>
                 
                  {imageSrc !== null?(<img src={imageSrc} alt="Website Logo" style={{width:'70px'}} />):('')}
                </div>
                
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Save Section</button>
                 
                </div>
                </Form>

            </div>
          </div>

        </div>
      </div>
    );
}

export default AddSection;