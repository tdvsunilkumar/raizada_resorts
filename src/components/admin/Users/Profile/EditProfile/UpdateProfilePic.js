import React, { useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { displayNotification, generateUniqueStringWithDateTime } from "../../../../../utlts/admin/functions";
import Cropper from 'react-easy-crop';
import { getCroppedImg } from "../../../../../utlts/admin/functions";
import { updateProfilePicture } from "../../UserAPI";
import { useLoadder } from "../../../Context/LoaderContext";
import { useNavigate } from "react-router-dom";

const UpdateProfilePic = ({show, handleHide, handleShow,displayEditProfileData}) => {
    
    const navigate = useNavigate();
    const {loading, setLoading, getTesingData} = useLoadder();
    const [imageSrc, setimageSrc] = useState(null); 
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [image, setImage] = useState('');
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const cropSize = { width: 500, height: 600 };

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
  }

    const previewImage = (event) => {
      if(event.target.files && event.target.files.length > 0){
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.addEventListener('load',()=>{
          setimageSrc(reader.result);
          setImage(event.target.value);
        });
      }
    }

    const handleSubmit = async () => {
        if(image == ''){
            displayNotification('No image selected!','error')
        }else{
            setLoading(true);
            try {
                const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels); // Call utility function to get cropped image
                await updateProfilePicture(croppedImage,'pic').then((response)=>{
                  setLoading(false);
                  if(response.data.status == 'success'){
                    displayNotification(response.data.message,'success');
                    handleHide();
                    displayEditProfileData();
  
                  }if(response.data.status == 'error'){
                    displayNotification(response.data.message,'error');
                  }

                }).catch((error)=>{
                  setLoading(false);
                  displayNotification(error.message, error,'error');

                });
              } catch (error) {
                setLoading(false);
                displayNotification('Error saving image:', error,'error');
              }
        }
    }
    return (
        <>
        <Modal 
show={show} 
onHide={handleHide}
backdrop="static"
keyboard={false}
size="lg"
>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row">
                <div className="col-md-12">
                <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">Select File</label>
            <div className="col-md-12 col-lg-12">
              <input name="user_image" type="file" className="form-control" id="user_image" onChange={previewImage} accept="image/*" />
            </div>
                </div>

                <div className="col-md-12">
                <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">Preview</label>
            <div className="col-md-12 col-lg-12 user_image"  >
            <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          cropSize={cropSize}
        /></div>
                </div>
                <div className="col-md-12">
                
            <div className="col-md-12 col-lg-12">
            <input
            className="form-control"
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e) => {
            setZoom(e.target.value)
          }}
        />
            </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" type="button" onClick={handleSubmit}>Save</Button>
          <Button variant="secondary" onClick={handleHide}>
            Close
          </Button>
        </Modal.Footer>
        </Modal></>
    );
}

export default UpdateProfilePic;