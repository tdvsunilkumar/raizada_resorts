<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [UsersController::class, 'register']);
// Route::post('login', [UsersController::class, 'login']);

// Route::group(['middleware' => 'auth.jwt'], function () {
//     //Route::post('logout', [UsersController::class, 'logout']);
// });
Route::group([

    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers'

], function ($router) {

    Route::post('login', 'UsersController@login');
    Route::post('logout', 'UsersController@logout');
    Route::post('refresh', 'UsersController@refresh');
    Route::post('me', 'UsersController@me');
    Route::post('send-password-email', 'UsersController@sendPasswordResetEmail');
    Route::post('verify-change-password-token', 'UsersController@verifyChangePasswordToken');
    Route::post('forgot-psw/change-psw', 'UsersController@changePswForForgotPaswword');

});