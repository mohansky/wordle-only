'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
 
const navLinks =  [ 
  { name: 'Home', href: '/',},
  { name: 'All Scores', href: '/all-scores', }
]

export default function NavBar( ) {
  const pathname = usePathname()
 
  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href
        return (
          <Link
            className={isActive ? 'rounded-sm py-1.5 px-2 focus:bg-accent' : 'hover:bg-accent rounded-sm py-1.5 px-2'}
            href={link.href}
            key={link.name}
          >
            {link.name}
          </Link>
        )
      })}
    </>
  )
}
