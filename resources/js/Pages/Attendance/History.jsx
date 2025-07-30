import { router, Head } from '@inertiajs/react';
import { useState } from 'react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/Components/ui/select';
import { Card, CardContent } from '@/Components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/Components/ui/table';
import { PDFDownloadLink } from '@react-pdf/renderer';
import AttendancePDF from './AttendancePDF';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


export default function History({ attendances, users, filters }) {
    const [form, setForm] = useState({
        user_id: filters.user_id || '',
        date: filters.date || '',
        month: filters.month || '',
        start_date: filters.start_date || '',
        end_date: filters.end_date || '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route('attendance.history'), form, { preserveState: true });
    };

    return (
        <>
            <Head title="Attendance History" />

            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold">Attendance History</h1>

                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleFilter} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <Select value={form.user_id || "all"} onValueChange={(val) => setForm({ ...form, user_id: val === "all" ? '' : val })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a user" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Users</SelectItem>
                                    {users.map(user => (
                                    <SelectItem key={user.id} value={String(user.id)}>{user.name}</SelectItem>
                                    ))}
                                </SelectContent>
                                </Select>


                            <Input type="date" name="date" value={form.date} onChange={handleChange} />
                            <Input type="month" name="month" value={form.month} onChange={handleChange} />
                            <Input type="date" name="start_date" value={form.start_date} onChange={handleChange} />
                            <Input type="date" name="end_date" value={form.end_date} onChange={handleChange} />

                            <div className="col-span-full flex justify-end">
                                <Button type="submit">Filter</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <div className="flex justify-end mb-4">
                    <PDFDownloadLink
                        document={<AttendancePDF attendances={attendances} />}
                        fileName="attendance_report.pdf"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Download PDF
                    </PDFDownloadLink>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Check In</TableHead>
                                    <TableHead>Check Out</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {attendances.length > 0 ? (
                                    attendances.map((att) => (
                                        <TableRow key={att.id}>
                                            <TableCell>{att.employee?.user?.name || '-'}</TableCell>
                                            <TableCell>{att.check_in}</TableCell>
                                            <TableCell>{att.check_out || '-'}</TableCell>
                                            <TableCell>{att.date}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center text-muted-foreground">
                                            No data found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                
            </div>
        </>
    );
}

History.layout = (page) => (
    <AuthenticatedLayout children={page} />
);
