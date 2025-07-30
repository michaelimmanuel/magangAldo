import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard() {
  const [stats, setStats] = useState({
    employees: 0,
    departments: 0,
    attendancesToday: 0,
  });
  const [recentAttendance, setRecentAttendance] = useState([]);

  useEffect(() => {
    axios.get("/api/dashboard").then(res => {
      setStats(res.data.stats);
      setRecentAttendance(res.data.recent_attendance);
    });
  }, []);

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-primary shadow-md border border-slate-200">
            <CardHeader>
                <CardTitle className="text-white">Total Employees</CardTitle>
            </CardHeader>
            <CardContent className=" text-3xl font-bold text-white">{stats.employees}</CardContent>
            </Card>

            <Card className="bg-primary shadow-md border border-slate-200">
            <CardHeader>
                <CardTitle className="text-white">Total Departments</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold text-white">{stats.departments}</CardContent>
            </Card>

            <Card className="bg-primary shadow-md border border-slate-200">
            <CardHeader>
                <CardTitle className="text-white">Today's Attendance</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold text-white">{stats.attendancesToday}</CardContent>
            </Card>
        </div>

        <div className="mt-8">
            <h2 className="text-xl font-semibold text-primary mb-4">Recent Check-ins</h2>
            <Table className="bg-white shadow-md border border-slate-200">
            <TableHeader className="bg-slate-100">
                <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {recentAttendance.map((item, index) => (
                <TableRow key={index}>
                    <TableCell>{item.employee.user.name}</TableCell>
                    <TableCell>{item.employee.department?.name}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.check_in}</TableCell>
                    <TableCell>{item.check_out || 'N/A'}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
    </div>

  );
}

Dashboard.layout = (page) => <AuthenticatedLayout children={page} />;
