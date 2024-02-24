<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Str;
use App\Mail\SendMail;
use Mail;

class UsersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register','sendPasswordResetEmail','verifyChangePasswordToken','changePswForForgotPaswword']]);
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

        return response()->json(['status'=>'success','message' => 'Successfully logged out']);
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

    public function sendPasswordResetEmail(Request $request){
        // If email does not exist
        if(!$this->validEmail($request->email)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Email does not exist.'
            ]);
        } else {
            // If email exists
            $token = $this->generateToken($request->email);
            $url = config('constants.website_url')."/change-password?token=".$token;
            try {
                
                $html = '<html>
                <body>
                Please click on below link to change your paswword
                <a href="'.$url.'" >Click here</a>
                </body>    
                </html';
                $mailSent = mail($request->email, 'Forgot Password', $html);
                return response()->json([
                    'status' => 'success',
                    'message' => 'Check your inbox, we have sent a link to reset email.'
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'status' => 'error',
                    'message' => $url
                ]);
            }            
        }
    }

   
    public function validEmail($email) {
       return !!User::where('email', $email)->first();
    }
    public function generateToken($email){
      $isOtherToken = DB::table('password_resets')->where('email', $email)->first();
      if($isOtherToken) {
        return $isOtherToken->token;
      }
      $token = Str::random(80);;
      $this->storeToken($token, $email);
      return $token;
    }
    public function storeToken($token, $email){
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => date("Y-m-d H:i:s")            
        ]);
    }

    public function verifyChangePasswordToken(Request $request){
        $rules = [
            'token'=>'required',
        ];
        $validator = \Validator::make(
            $request->all(), $rules,
            [
                'token.required' => 'Token not Found!',
            ]
        );
        if($validator->fails()){
            $messages = $validator->getMessageBag();
            $arr['status'] = 'error';
            $arr['message'] = $messages->all()[0];
            return response()->json($arr);
        }

        $checkTokenExists = DB::table('password_resets as pr')
                                ->join('users as u',function($j){
                                    $j->on('u.email','=','pr.email')->where('role',2);
                                })
                                ->where('token',$request->token)
                                ->first();
        if($checkTokenExists != null){
            return response()->json(['status' => 'success','data' => json_encode($checkTokenExists)]);
        }else{
            return response()->json(['status' => 'error','message' => 'Invalid token!']);
        }
    }

    public function changePswForForgotPaswword(Request $request) {
        $rules = [
            'password'=>'required|same:confirm_password',
            'confirm_password'=>'required',
            'token'=>'required', 
            'user_id'=>'required'
        ];
        $validator = \Validator::make(
            $request->all(), $rules,
            [
                'password.required' => 'Name is Required Field',
                'confirm_password.required' => 'Email is Required Field',
                'token.required' => 'Mobile is Required Field',
                'user_id.unique' => 'Email is already exists',
            ]
        );
        if($validator->fails()){
            $messages = $validator->getMessageBag();
            $arr['status'] = 'error';
            $arr['message'] = 'Something went wrong, please try again!';
            return response()->json($arr);
        }
        
        $checkTokenValidOrnot = DB::table('password_resets as pr')
        ->join('users as u',function($j)use($request){
            $j->on('u.email','=','pr.email')->where('role',2)->where('u.id',$request->user_id);
        })
        ->where('token',$request->token)
        ->first();
        if($checkTokenValidOrnot != null){
            $dataToUpdate = [
                'password' => Hash::make($request->password),
                'updated_at' => date("Y-m-d H:i:s")
            ];
            try {
               DB::beginTransaction();
               DB::table('users')->where('id',$request->user_id)->update($dataToUpdate);
               DB::commit();
               return response()->json(['status' => 'success','message' => 'Password changed successfully!']);
            } catch (\Exception $e) {
               DB::rollback();
               return response()->json(['status' => 'error','message' => $e->getMessage()]);
            }

        }else{
            return response()->json(['status' => 'error','message' => 'Something went wrong, Please try again!']);
        }
        
        
    }
}
