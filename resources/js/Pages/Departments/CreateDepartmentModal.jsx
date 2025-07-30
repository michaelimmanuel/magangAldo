import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function CreateDepartmentModal({ isOpen, setIsOpen, department = null }) {
    const isEdit = !!department;
    
    const { data, setData, post, put, processing, reset } = useForm({
        name: "",
    });
    
    useEffect(() => {
        if (isEdit && department) {
        setData({
            name: department.name || "",
            description: department.description || "",
        });
        } else {
        reset();
        }
    }, [isEdit, department]);
    
    const submit = (e) => {
        e.preventDefault();
    
        if (isEdit) {
        put(`/departments/${department.id}`, {
            onSuccess: () => {
            reset();
            setIsOpen(false);
            },
        });
        } else {
        post("/departments", {
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
            <DialogTitle>{isEdit ? "Edit Department" : "Create Department"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={submit}>
            <div className="space-y-4">
                <div>
                <Label htmlFor="name">Department Name</Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    required
                />
                </div>
            </div>
            <div className="mt-4 flex justify-end">
                <Button type="submit" disabled={processing}>
                {isEdit ? "Update Department" : "Create Department"}
                </Button>
            </div>
            </form>
        </DialogContent>
        </Dialog>
    );
    }