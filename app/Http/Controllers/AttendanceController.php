<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Attendance;
use App\Models\User;
use App\Models\Employee;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    // app/Http/Controllers/DepartmentController.php
    public function index()
    {
        $departments = Department::all();
        
        return inertia('Departments/Index', [
            'departments' => $departments
        ]);
    }

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
        $attendance = Attendance::firstOrNew([
            'employee_id' => $user->id,
            'date' => $today,
        ]);

        if (!$attendance->exists) {
            // New attendance — check in
            $attendance->check_in = now();
            $attendance->save();
            return response()->json(['message' => 'Checked in successfully.']);
        }

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

    public function history(Request $request)
    {
        $query = Attendance::with('employee.user', 'employee.department');

        if ($request->user_id) {
            $query->where('employee_id', $request->user_id);
        }

        if ($request->date) {
            $query->whereDate('check_in', $request->date);
        }

        if ($request->month) {
            $query->whereMonth('check_in', $request->month);
        }

        if ($request->start_date && $request->end_date) {
            $query->whereBetween('check_in', [$request->start_date, $request->end_date]);
        }

        $attendances = $query->latest()->get();
        $users = User::all();

        return inertia('Attendance/History', [
            'attendances' => $attendances,
            'users' => $users,
            'filters' => $request->only(['user_id', 'date', 'month', 'start_date', 'end_date']),
        ]);
    }

}
