import React, { useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { displayNotification, generateUniqueStringWithDateTime } from "../../../../../utlts/admin/functions";
import loadImage from "blueimp-load-image";
import Cropper from 'react-easy-crop';
import { getCroppedImg } from "../../../../../utlts/admin/functions";

const UpdateProfilePic = ({show, handleHide, handleShow}) => {
    const preciewRef = useRef();
    const cropRef = useRef();
    const [image, setImage] = useState(null); 
    const [imageSrc, setimageSrc] = useState(null); 
    const [imageObj, setimageObj] = useState({});

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const cropSize = { width: 500, height: 600 };

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
    //console.log(croppedArea, croppedAreaPixels)
  }

    const previewImage = (event) => {
           setImage(event.target.value);
           loadImage(event.target.files[0], { noRevoke:true }).then(function (data) {
            setimageSrc(data.image.src);
            setimageObj(event.target.files[0]);
          })
        

    }

    const handleSubmit = async () => {
        if(image == ''){
            displayNotification('No image selected!','error')
        }else{
            try {
                const userProfilePcName = generateUniqueStringWithDateTime();
                alert(userProfilePcName);
                const croppedImage = await getCroppedImg(imageObj, crop, userProfilePcName+'.jpeg'); // Call utility function to get cropped image
                console.log('Cropped image:', croppedImage);
          
                // Upload cropped image to server using fetch or Axios
                // Example: await uploadImageToServer(croppedImage);
              } catch (error) {
                console.error('Error saving image:', error);
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