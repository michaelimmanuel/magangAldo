import {
  Card, CardContent, CardHeader, CardTitle
} from "@/Components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { useState } from "react";
import CreateUserModal from "./CreateUserModal";
import { usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { User } from "lucide-react";


export default function Users() {
  const { users } = usePage().props;
  const [isOpen, setIsOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsOpen(true);
  };

  const handleDelete = (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      router.delete(route("users.destroy", userId));
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">All Users</h1>
        <Button
          className="bg-primary text-white"
          onClick={() => {
            setEditingUser(null);
            setIsOpen(true);
          }}
        >
          + Create New User
        </Button>
      </div>

      <div className="flex justify-end">
        <Input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3"
        />
      </div>

      <Card className="shadow-md border border-slate-200">
        <CardHeader>
          <CardTitle>All Registered Users</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-100">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers?.map((user) => (
       
                <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                            <TableCell>
                                {user.employee ? user.employee.department.name : "N/A"}
                            </TableCell>
                            <TableCell>{user.employee ? user.employee.position : "N/A"}</TableCell>
                            <TableCell>
                            {new Date(user.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                            <Button size="sm" variant="outline" onClick={() => handleEdit(user)}>
                            Edit
                            </Button>
                            <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(user.id)}
                            >
                            Delete
                            </Button>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {isOpen && (
        <CreateUserModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          user={editingUser} // pass editing user if any
        />
      )}
    </div>
  );
}

Users.layout = (page) => (
  <AuthenticatedLayout children={page} />
);
