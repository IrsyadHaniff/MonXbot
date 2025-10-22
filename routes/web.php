<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GeminiController;


Route::get('/', function () {
    return view('index');
});

Route::get('/login', function () {
    return view('login.login');
})->name('login');
