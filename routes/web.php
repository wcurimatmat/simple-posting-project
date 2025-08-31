<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RegisterController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::resource("posts", PostController::class);

Route::controller(LoginController::class)->group(function () {
    Route::get('/login', 'create')->name('login.create');
    Route::post('/login', 'store')->name('login.store');
    Route::post('/logout', 'destroy')->name('logout');
});

Route::controller(RegisterController::class)->group(function () {
    Route::get('/register', 'create')->name('register.create');
    Route::post('/register', 'store')->name('register.store');
});