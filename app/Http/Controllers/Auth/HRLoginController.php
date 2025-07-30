<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HRLoginController extends Controller
{
    public function create()
    {
        return inertia('Auth/HRLogin'); 
    }

    public function store(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            if (Auth::user()->role !== 'hr') {
                Auth::logout();
                return back()->withErrors([
                    'email' => 'You are not authorized as HR.',
                ]);
            }

            return redirect()->intended('/hr/dashboard');
        }

        return back()->withErrors([
            'email' => 'Invalid credentials.',
        ]);
    }
}
