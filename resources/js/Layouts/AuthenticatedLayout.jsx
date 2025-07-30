

import Sidebar from "@/Components/Sidebar"

export default function AuthenticatedLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
        {children}
      </main>
    </div>
  )
}
