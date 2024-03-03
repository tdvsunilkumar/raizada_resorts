<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Models\Setting;

class SettingsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api',['except' => ['getSettings']]);
    }

    public function updateSettings(Request $request){
        $dataTopdateOrCreate = $request->all();
       
        if($request->has('website_logo')){
            $uploadedFile = $_FILES['website_logo'];
            $uploadDir = 'uploads/admin/';
            $uploadedFilePath = $uploadDir . uniqid() . '.jpg'; // You may adjust file name or extension here
            try {
                if (move_uploaded_file($uploadedFile['tmp_name'], $uploadedFilePath)) {
                    $dataTopdateOrCreate['website_logo'] = $uploadedFilePath;
                }
            } catch (\Exception $e) {
                return response()->json(['status' => 'error','message' => $e->getMessage()]);
            }

        }
        $dataTopdateOrCreate['created_at'] = date("Y-m-d H:i:s");
        $dataTopdateOrCreate['updated_at'] = date("Y-m-d H:i:s");
        $checkSettingsHasData = DB::table('settings')->first();
        if($checkSettingsHasData == null){
            try {
                Setting::insert($dataTopdateOrCreate);
                return response()->json(['status' => 'success','message' => 'Settings Updated successfully!']);
            } catch (\Exception $e) {
                return response()->json(['status' => 'error','message' => $e->getMessage()]);
            }
        }else{
            try {
                Setting::find($checkSettingsHasData->id)->update($dataTopdateOrCreate);
                return response()->json(['status' => 'success','message' => 'Settings Updated successfully!']);
            } catch (\Exception $e) {
                return response()->json(['status' => 'error','message' => $e->getMessage()]);
            }

        }
        
    }

    public function getSettings(){
        $data = DB::table('settings')->first();
        return response()->json(['status' => 'success','data' => $data]);
    }
}
