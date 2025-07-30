import { useState } from 'react';
import { Head } from '@inertiajs/react';

export default function Attendance() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/attendance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || 'Something went wrong.');
            } else {
                setMessage(data.message);
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            setMessage('Network error.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head title="Attendance" />
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-semibold text-center mb-6 text-blue-800">Employee Attendance</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium">Email</label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Password</label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>

                        {message && (
                            <div className="mt-4 text-center text-sm text-gray-700">
                                {message}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}


