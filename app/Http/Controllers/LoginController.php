<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Providers\AppServiceProvider;
use Illuminate\Support\Facades\Redirect;

class LoginController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/Login');
    }

    public function store(Request $request)
    {
        // 1. Validate credentials
        $credentials = $request->validate([
            "email" => ['required', 'email'],
            'password' => ['required']
        ]);

        // 2. Login Process
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return Redirect::intended(AppServiceProvider::HOME);
        }

        return Redirect::back()->with('error', 'Error given credentials');
    }

    public function destroy(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return Redirect::to(AppServiceProvider::HOME);
    }
}
