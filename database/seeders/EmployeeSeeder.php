<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Employee;
use App\Models\Department;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        $departments = Department::all();

        // foreach (range(1, 10) as $i) {
        //     $user = User::create([
        //         'name' => "Employee $i",
        //         'email' => "employee$i@example.com",
        //         'password' => Hash::make('password'), // default password
        //         'role' => 'employee',
        //     ]);

        //     Employee::create([
        //         'user_id' => $user->id,
        //         'position' => fake()->jobTitle(),
        //         'department_id' => $departments->random()->id,
        //     ]);
        // }

        // Create an admin user
        User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'), // default password
            'role' => 'hr',
        ]);
        Employee::create([
            'user_id' => User::where('email', 'admin@example.com')->first()->id,
            'position' => 'HR Manager',
            'department_id' => $departments->random()->id,
        ]);
    }
}
