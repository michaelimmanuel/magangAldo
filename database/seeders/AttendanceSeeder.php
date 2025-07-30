<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Attendance;
use App\Models\Employee;
use Carbon\Carbon;


class AttendanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = Employee::all();

        foreach ($employees as $employee) {
            foreach (range(0, 4) as $dayOffset) {
                Attendance::create([
                    'employee_id' => $employee->id,
                    'date' => Carbon::now()->subDays($dayOffset)->toDateString(),
                    'check_in' => '09:00',
                    'check_out' => '17:00',
                ]);
            }
        }
    }
}
