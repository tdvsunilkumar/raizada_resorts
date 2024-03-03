<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Section;
use DB;

class SectionsController extends Controller
{
    public $sectionObj = '';
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => []]);
        $this->sectionObj = new Section;
    }

    public function getList(Request $request){
        $data = $this->sectionObj->getList($request);
        $arr=array();
        $i="0";    
        $count = $request->start+1;
        foreach ($data['data'] as $row){
            $arr[$i]['no']=$count;
            $arr[$i]['id']=$row->id;
            $arr[$i]['name']=$row->name;
            $arr[$i]['type']=$row->type;
            $arr[$i]['created_at']=date("d M, Y",strtotime($row->created_at));
            $arr[$i]['action']  = '<div className="action-btn bg-warning ms-2">
                    <a href="javascript:;" className="mx-3 btn btn-sm  align-items-center realpropertyaction" data-actionname="edit" data-propertyid="'.$row->id.'" data-size="xxll"  title="Edit" data-title="Real Property - Land | Plant & Trees">

                        <i className="ti-pencil text-white"></i>
                    </a>   
                </div>
                ';
            $i++;
            $count++;
        }
        
        $totalRecords = $data['cnt'];
        $json_data = array(
            "status" => 'success',
            "cnt"    => intval( $totalRecords ),  
            "recordsFiltered" => intval($totalRecords),
            "data"            => $arr   // total data array
        );
       
        return response()->json((object)$json_data);
    }

    public function getSectionDetails($id){
        $data = DB::table('sections')->where('id',$id)->first();
        return response()->json(['status' => 'success','data' => $data]);

    }
    
    public function addUpdateSection(Request $request){
        $rules = [
            'name'=>'required|unique:sections,name,'.$request->id,
            'type'=>'required|unique:users,email',
        ];
        $validator = \Validator::make(
            $request->all(), $rules,
            [
                'name.required' => 'Section Name is Required Field',
                'type.required' => 'Section Type is Required Field'
            ]
        );
        if($validator->fails()){
            $messages = $validator->getMessageBag();
            $arr['status'] = 'error';
            $arr['message'] = $messages->all()[0];
            return response()->json($arr);
        }
        $dataToSaveOrUpdate = $request->all();
        if($request->has('image') && $request->image != null){
            $uploadedFile = $_FILES['image'];
            $uploadDir = 'uploads/admin/';
            $uploadedFilePath = $uploadDir . uniqid() . '.jpg'; // You may adjust file name or extension here
            try {
                if (move_uploaded_file($uploadedFile['tmp_name'], $uploadedFilePath)) {
                    $dataToSaveOrUpdate['image'] = $uploadedFilePath;
                }
            } catch (\Exception $e) {
                return response()->json(['status' => 'error','message' => $e->getMessage()]);
            }

        }
        //dd($dataToSaveOrUpdate);
        if($request->image == null){
            unset($dataToSaveOrUpdate['image']);
        }
        if($request->id != null){
            try {
                $dataToSaveOrUpdate['updated_at'] = date("Y-m-d H:i:s");
                Section::find($request->id)->update($dataToSaveOrUpdate);
                return response()->json(['status'=>'success','message'=> 'Section updated successfully!']);
            } catch (\Exception $e) {
                return response()->json(['status'=>'success','message'=> $e->getMessage()]);
            }
        }else{
            try {
                $dataToSaveOrUpdate['created_at'] = date("Y-m-d H:i:s");
                $dataToSaveOrUpdate['updated_at'] = date("Y-m-d H:i:s");
                Section::create($dataToSaveOrUpdate);
                return response()->json(['status'=>'success','message'=> 'Section created successfully!']);
            } catch (\Exception $e) {
                return response()->json(['status'=>'error','message'=> $e->getMessage()]);
                //throw $th;
            }

        }

    }

    public function deleteSection(Request $request){
        $id = $request->id;
        try {
            Section::find($id)->delete();
            return response()->json(['status'=>'success','message'=> 'Section Deleted successfully!']);
        } catch (\Exception $e) {
            return response()->json(['status'=>'error','message'=> $e->getMessage()]);
        }
    }
}
