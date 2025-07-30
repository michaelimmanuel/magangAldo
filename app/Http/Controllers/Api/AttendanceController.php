<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Attendance;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;

class AttendanceController extends Controller
{


    public function handle(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $today = Carbon::today();
        $attendance = Attendance::firstOrCreate(
            ['employee_id' => $user->id, 'date' => $today],
            ['check_in' => now()]
        );

        if ($attendance->check_out) {
            return response()->json(['message' => 'Already checked out today.'], 200);
        }

        if (!$attendance->check_in) {
            $attendance->check_in = now();
            $attendance->save();
            return response()->json(['message' => 'Checked in successfully.']);
        }

        $attendance->check_out = now();
        $attendance->save();

        return response()->json(['message' => 'Checked out successfully.']);
    }

}
