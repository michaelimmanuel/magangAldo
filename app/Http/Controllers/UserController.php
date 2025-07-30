<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Employee;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('employee.department')->get();
        $departments = Department::all();

        return inertia('Users/Index', [
            'users' => $users,
            'departments' => $departments
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'position' => 'required|string',
            'department_id' => ['required', Rule::exists('departments', 'id')],
            'role' => 'required|in:employee,hr',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);

        Employee::create([
            'user_id' => $user->id,
            'position' => $validated['position'],
            'department_id' => $validated['department_id'],
        ]);

        return redirect()->route('users.index');
    }

    public function update(Request $request, $id)
    {
        $user = User::with('employee')->findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('users')->ignore($user->id)],
            'password' => 'nullable|string|min:6',
            'position' => 'required|string',
            'department_id' => ['required', Rule::exists('departments', 'id')],
            'role' => 'required|in:employee,hr',
        ]);

        // Update user data
        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password']
                ? Hash::make($validated['password'])
                : $user->password,
        ]);

        // Update or create employee data
        if ($user->employee) {
            $user->employee->update([
                'position' => $validated['position'],
                'department_id' => $validated['department_id'],
            ]);
        } else {
            Employee::create([
                'user_id' => $user->id,
                'position' => $validated['position'],
                'department_id' => $validated['department_id'],
            ]);
        }

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }

}
