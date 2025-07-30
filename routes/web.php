<?php

use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\HRLoginController;


Route::middleware(['auth', 'hr'])->group(function () {
    Route::get('/hr/dashboard', function () {
        return Inertia::render('Dashboard');
    });
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');

    Route::resource('departments', DepartmentController::class);
    Route::get('/attendance/history', [AttendanceController::class, 'history'])->name('attendance.history');

});


Route::middleware('guest')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Attendance');
    });

    Route::get('/hr/login', [HRLoginController::class, 'create'])->name('hr.login');
    Route::post('/hr/login', [HRLoginController::class, 'store'])->name('hr.login.attempt');
});

require __DIR__.'/auth.php';
