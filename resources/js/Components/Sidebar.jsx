import { Link, usePage } from '@inertiajs/react'
import { sidebarLinks } from '@/sidebarlink'
import { router } from '@inertiajs/react';


export default function Sidebar() {
  const { props } = usePage()
  const user = props.auth?.user
  const userRole = user?.role ?? 'guest'

  const links = sidebarLinks.filter(link =>
    link.roles.includes(userRole)
  )

  function handleLogout(e) {
  e.preventDefault();
  router.post(route('logout'));
}

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-4">
      <nav className="flex flex-col space-y-2">
        {links.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            href={path}
            className="flex items-center p-2 rounded hover:bg-gray-700"
          >
            <Icon className="w-5 h-5 mr-3" />
            {label}
          </Link>
        ))}

        {/* logout link */}
        <Link
          className="flex items-center p-2 rounded hover:bg-gray-700"
          onClick={handleLogout}
        >
          <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-6 6-6-6h5M4 6h16M4 6v12M4 6l6 6M20 6l-6 6" />
          </svg>
          Logout
        </Link>
      </nav>
    </aside>
  )
}
