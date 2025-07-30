
import {
  Home,
  Users,
  Building2,
  CalendarCheck,
  ClipboardCheck,
} from 'lucide-react'

export const sidebarLinks = [
  {
    label: 'Dashboard',
    path: '/hr/dashboard',
    icon: Home,
    roles: ['hr'],
  },
  {
    label: 'User Management',
    path: '/users',
    icon: Users,
    roles: ['hr'],
  },
  {
    label: 'Departments',
    path: '/departments',
    icon: Building2,
    roles: ['hr'],
  },
  {
    label: 'Attendance History',
    path: '/attendance/history',
    icon: CalendarCheck,
    roles: ['hr'],
  },
  {
    label: 'Attendance Check',
    path: '/',
    icon: ClipboardCheck,
    roles: ['employee', 'guest'],
  },
]
