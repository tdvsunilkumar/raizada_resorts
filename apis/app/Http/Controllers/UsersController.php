<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }
    public function register (Request $request){
        $rules = [
            'name'=>'required',
            'email'=>'required|unique:users,email',
            'mobile'=>'required|unique:users,mobile', 
            'address'=>'required',
            'password'=>'required'
        ];
        $validator = \Validator::make(
            $request->all(), $rules,
            [
                'name.required' => 'Name is Required Field',
                'email.required' => 'Email is Required Field',
                'mobile.required' => 'Mobile is Required Field',
                'email.unique' => 'Email is already exists',
                'mobile.required' => 'Mobile is already exists',
                'address.required' => 'Address is Required Field',
                'password.required' => 'Password is Required Field',
            ]
        );
        if($validator->fails()){
            $messages = $validator->getMessageBag();
            $arr['status'] = 'error';
            $arr['message'] = $messages->all()[0];
            return response()->json($arr);
        }

        $dataToSave = [
            'name' => $request->name,
            'email' => $request->email,
            'mobile' => $request->mobile,
            'address' => $request->address,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ];
        try {
           DB::beginTransaction();
           DB::table('users')->insert($dataToSave);
           DB::commit();
           return response()->json(['status' => 'success','message' => 'User created successfully!']);
        } catch (\Exception $e) {
           DB::rollback();
           return response()->json(['status' => 'success','message' => $e->getMessage()]);
        }
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        //dd($credentials);

        if ($token = $this->guard()->attempt($credentials)) {
            $userDetails = DB::table('users')->where('id',Auth::user()->id)->first();
            $response = [
                'token' => $token,
                'status' => 'success',
                'message' => 'Loggedin Successfully!',
                'userData' => $userDetails
            ];
            return response()->json($response);
        }

        return response()->json(['status' => 'error','message' => 'Username or password is in correct!']);
    }

    public function me()
    {
        return response()->json(['status' => 'success','message' => 'Logged In','userData' => $this->guard()->user()]);
    }

    public function logout()
    {
        $this->guard()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken($this->guard()->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60
        ]);
    }

    public function guard()
    {
        return Auth::guard();
    }
}
