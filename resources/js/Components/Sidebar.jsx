import { Link, usePage } from '@inertiajs/react'
import { sidebarLinks } from '@/sidebarlink'

export default function Sidebar() {
  const { props } = usePage()
  const user = props.auth?.user
  const userRole = user?.role ?? 'guest'

  const links = sidebarLinks.filter(link =>
    link.roles.includes(userRole)
  )

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
      </nav>
    </aside>
  )
}
