import React, { useEffect, useState } from "react";
import Main from "../Layout/Main/Main";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import AddSection from "./AddSection";
import DataTable from "react-data-table-component";
import { deleteSection, loadSectionData } from "./SectionAPI";
import { displayNotification } from "../../../utlts/admin/functions";
import { useLoadder } from "../Context/LoaderContext";
import Swal from "sweetalert2";
import { Form } from "react-bootstrap";
import SectionTypeSelectList from "../CommonElements/CommonElements";
const Sections = () => {
    const [data, setdata] = useState({});
    const [tableLoading, settableLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(10);
    const [refreshDataTable,setrefreshDataTable] = useState(false);
    const [sectionIdToEdit, setsectionIdToEdit] = useState(null);
    const {loading, setLoading} = useLoadder();
    const [searchWithType, setsearchWithType] = useState(null);
    const [searchWithText, setsearchWithText] = useState(null);
    const [show, setShow] = useState(false);
    const customStyles = {
        row:{
            fontSize:'25px',
            textAlign:'center'
        },
        headCells: {
            style: {
               fontWeight:'900',
               fontSize:'15px',
               backgroundColor:'#4154f1',
               color:'#FFFFFF',
               textAlign:'center'
                
            },
        }
    };
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Type',
            selector: row => row.type,
            sortable: true,
        },
        {
            name: 'Created Date',
            selector: row => row.created_at,
            sortable: true,
        },
        {
            name: 'Updated Date',
            selector: row => row.updated_at,
            sortable: true,
        }, {
            name:'Action',
            cell: row => (
                <>
                <div className="action-btn bg-info ms-2" style={{borderRadius:'5px'}}>
                <a href="#"  className="mx-3 btn btn-sm  align-items-center realpropertyaction" onClick={()=>handleEditSection(row)}  title="Edit">
                    <i className="ri ri-edit-2-fill text-black"></i>
                </a>   
            </div>
            <div className="action-btn bg-danger ms-2" style={{borderRadius:'5px'}}>
            <a href="#"  className="mx-3 btn btn-sm  align-items-center realpropertyaction" onClick={()=>handleDeleteSection(row)}  title="Edit">
                <i className="bx bxs-trash text-black"></i>
            </a>   
        </div></>
              ),
        },
    ];
    
    const handlefilterData = async(event)=> {
        event.preventDefault();
        setsearchWithType(event.target.searchBySectionType.value);
        setsearchWithText(event.target.searchByText.value);
       setrefreshDataTable(new Date().getSeconds());
    }
    const handleShow = () => {
        setShow(true);
    }

    const handleHide = () => {
        setShow(false);
    }

    const handleEditSection = async(row)=>{
        setsectionIdToEdit(row.id);
        handleShow();
    }

    const handleDeleteSection = async(row)=>{
        Swal.fire({
            title : 'Are you sure, You want to delete this Section?',
            confirmButtonText : 'Yes',
            cancelButtonText : 'No',
            showCancelButton : true,
            icon:'warning',
        }).then(async (response)=>{
            if(response.isConfirmed){
                setLoading(true);
                await deleteSection({id:row.id}).then((response)=>{
                    if(response.data.status == 'success'){
                        displayNotification(response.data.message,'success');
                        setrefreshDataTable(new Date().getSeconds());
                        setLoading(false);
                    }if(response.data.status == 'error'){
                        displayNotification(response.data.message,'error');
                        setrefreshDataTable(new Date().getSeconds());
                        setLoading(false);
                    }
                    
                }).catch((error)=>{
                        displayNotification(error.message,'error');
                        setrefreshDataTable(new Date().getSeconds());
                        setLoading(false);
                });
            }
        });
    }

    const fetchSections = async(page) => {
        const otherData = {page:page,per_page:perPage,q:searchWithText,section_type:searchWithType};
        settableLoading(true);
        await loadSectionData(otherData).then((response)=>{
            settableLoading(false);
          if(response.data.status == 'success'){
            setdata(response.data.data);
            setTotalRows(response.data.cnt);
          }if(response.data.status == 'error'){
            displayNotification(response.data.message,'error');
            setdata({});
          }
        }).catch((error)=>{
            settableLoading(false);
            displayNotification(error.message,'error');

        });

    }

    const handlePageChange = page => {
		fetchSections(page);
	};

	const handlePerRowsChange = async (newPerPage, page) => {
		settableLoading(true);
        
		fetchSections(page);

		
		setPerPage(newPerPage);
		settableLoading(false);
	};

    useEffect(()=>{
        fetchSections(1);
        
    },[refreshDataTable]);


    return (
        <Main>
            <div className="pagetitle">
      <div className="row">
        <div className="col-md-6">
            <h1>Sections</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
          <li className="breadcrumb-item active">Sections</li>
        </ol>
      </nav>
      </div>
      <div className="col-md-6" style={{textAlign:'right'}}>
      <button type="button" onClick={handleShow} className="btn btn-primary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Tooltip on top"><i className="ri ri-add-circle-line me-1"></i> Add New Section</button>
      </div>
      </div>
      
    </div>
             <section className="section">
      <div className="row">
      
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
                
              <div className="row" style={{marginTop:'15px'}}> 
              <Form onSubmit={handlefilterData} noValidate className="row">
              <div className="col-md-3"></div>
                <div className="col-md-4">
                  <label htmlFor="inputCity" className="form-label">Section Type</label>
                  <Form.Select
                  name="searchBySectionType"
                  >
                    <option value="">Select Type</option>
                    <SectionTypeSelectList selectedValue={'null'}></SectionTypeSelectList>
                  </Form.Select>
                </div>

                <div className="col-md-4">
                  <label htmlFor="inputCity" className="form-label">Search</label>
                  <Form.Control
                  name="searchByText"
                  ></Form.Control>
                </div>

                <div className="col-md-1">
                <div className="text-center" style={{marginTop:'30px'}}>
                  <button type="submit"  className="btn btn-primary">Search</button>
                 
                </div>
                </div>
                </Form>
               
                <div className="col-md-12" style={{marginTop:'15px'}}>
                <DataTable 
              highlightOnHover={true}
              striped={true}
              columns={columns} 
              progressPending={tableLoading}
              pagination
              paginationServer
              paginationTotalRows={totalRows}
			  onChangeRowsPerPage={handlePerRowsChange}
              onChangePage={handlePageChange}
              customStyles={customStyles }
              data={data}/>
                </div>
              </div>
            

            </div>
          </div>
        </div>
      </div>
    </section>
    <Modal 
show={show} 
onHide={handleHide}
size="lg"
backdrop="static"
keyboard={false}
>
<Modal.Header closeButton>
          <Modal.Title>Add New Section</Modal.Title>
        </Modal.Header>
        <Modal.Body><AddSection handleHide={handleHide} setrefreshDataTable={setrefreshDataTable} id={sectionIdToEdit}/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHide} >
            Close
          </Button>
        </Modal.Footer>
</Modal>
        </Main>
    );
}
export default Sections