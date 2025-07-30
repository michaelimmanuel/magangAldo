import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function CreateUserModal({ isOpen, setIsOpen, user = null }) {
  const isEdit = !!user;

  const { data, setData, post, put, processing, reset } = useForm({
    name: "",
    email: "",
    password: "",
    role: "",
    department_id: "",
    position: "",
  });

  const [department, setDepartment] = useState([]);

  useEffect(() => {
    axios.get("/api/departments").then(res => {
      setDepartment(res.data);
    });
  }, []);

  useEffect(() => {
    if (isEdit && user) {
      setData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        role: user.role || "employee",
        department_id: user.department_id || "",
        position: user.position || "",
      });
    } else {
      reset();
    }
  }, [isEdit, user]);

  const submit = (e) => {
    e.preventDefault();

    if (isEdit) {
      put(`/users/${user.id}`, {
        onSuccess: () => {
          reset();
          setIsOpen(false);
        },
      });
    } else {
      post("/users", {
        onSuccess: () => {
          reset();
          setIsOpen(false);
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary">
            {isEdit ? "Edit User" : "Create New User"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input value={data.name} onChange={(e) => setData("name", e.target.value)} required />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" value={data.email} onChange={(e) => setData("email", e.target.value)} required />
          </div>
          {!isEdit && (
            <div>
              <Label>Password</Label>
              <Input type="password" value={data.password} onChange={(e) => setData("password", e.target.value)} required />
            </div>
          )}
          <div>
            <Label>Role</Label>
            <select
              className="w-full border border-gray-300 rounded-md p-2"
              value={data.role}
              onChange={(e) => setData("role", e.target.value)}
            >
              <option value="employee">Employee</option>
              <option value="hr">HR</option>
            </select>
          </div>
          <div>
            <Label>Department</Label>
            <select
              className="w-full border border-gray-300 rounded-md p-2"
              value={data.department_id}
              onChange={(e) => setData("department_id", e.target.value)}
            >
              <option value="">Select Department</option>
              {department.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Position</Label>
            <Input
              value={data.position}
              onChange={(e) => setData("position", e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-primary text-white" disabled={processing}>
            {processing ? (isEdit ? "Updating..." : "Creating...") : isEdit ? "Update User" : "Create User"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
