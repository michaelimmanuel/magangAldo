<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Department;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today()->toDateString();

        $stats = [
            'employees' => Employee::count(),
            'departments' => Department::count(),
            'attendancesToday' => Attendance::where('date', $today)->count(),
        ];

        $recent = Attendance::with(['employee.user', 'employee.department'])
        ->latest()
        ->take(10)
        ->get();

        return response()->json([
            'stats' => $stats,
            'recent_attendance' => $recent
        ]);
    }
}
