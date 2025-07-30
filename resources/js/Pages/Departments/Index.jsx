import {
  Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import CreateDepartmentModal from "./CreateDepartmentModal";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Departments() {
  const { departments } = usePage().props;
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);

  const filteredDepartments = departments?.filter((department) =>
    department.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (department) => {
    setEditingDepartment(department);
    setIsOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this department?")) {
      router.delete(route("departments.destroy", id));
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">All Departments</h1>
        <Button 
          className="bg-primary text-white"
          onClick={() => {
            setEditingDepartment(null); 
            setIsOpen(true);
          }}
        >
          + Create New Department
        </Button>
      </div>

      <div className="flex justify-end">
        <Input
          type="text"
          placeholder="Search by department name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3"
        />
      </div>

      <Card className="shadow-md border border-slate-200">
        <CardHeader>
          <CardTitle>Departments</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-100">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Employee Count</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDepartments?.map((department) => (
                <TableRow key={department.id}>
                  <TableCell>{department.name}</TableCell>
                  <TableCell>{department.employees_count}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(department)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(department.id)}
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
        <CreateDepartmentModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          department={editingDepartment}
          setEditingDepartment={setEditingDepartment}
        />
      )}
    </div>
  );
}

Departments.layout = (page) => (
  <AuthenticatedLayout children={page} />
);  
