import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Layout from '../Auth/Layout/Layout';

function FormExample() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    
      event.preventDefault();
      event.stopPropagation();
    

    setValidated(true);
  };

  return (
    <Layout>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
          
          <Form.Control
            required
            type="text"
            placeholder="First name"
          
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    
        
          
          <Form.Control
            required
            type="text"
            placeholder="Last name"
      
          />
          <Form.Control.Feedback  type="valid">Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback  type="invalid">Not good!</Form.Control.Feedback>
        
       
          
         
    
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
            />
    
   
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
     
      <Button type="submit">Submit form</Button>
    </Form>
    </Layout>
  );
}

export default FormExample;