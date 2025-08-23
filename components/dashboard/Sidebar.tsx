// File: components/dashboard/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  BookOpenIcon,
  ChartBarIcon,
  TrophyIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import { Logo } from "@/components/Logo";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Courses", href: "/courses", icon: BookOpenIcon },
  { name: "Habits", href: "/habits", icon: ChartBarIcon },
  { name: "Goals", href: "/goals", icon: TrophyIcon },
];

const secondaryNavigation = [
  { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-800 px-6 pb-4 border-r border-gray-200 dark:border-gray-700">
        <div className="flex h-16 shrink-0 items-center">
          <Logo />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={classNames(
                        pathname === item.href
                          ? "bg-gray-100 dark:bg-gray-700 text-indigo-600 dark:text-white"
                          : "text-gray-700 dark:text-gray-400 hover:text-indigo-600 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-700/50",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          pathname === item.href ? "text-indigo-600 dark:text-white" : "text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-white",
                          "h-6 w-6 shrink-0"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-auto">
              <ul role="list" className="-mx-2 space-y-1">
                 {secondaryNavigation.map((item) => (
                  <li key={item.name}>
                     <Link href={item.href} className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 dark:text-gray-400 hover:bg-gray-50 hover:text-indigo-600">
                       <item.icon className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600" aria-hidden="true" />
                       {item.name}
                     </Link>
                  </li>
                 ))}
                 <li>
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 dark:text-gray-400 hover:bg-gray-50 hover:text-indigo-600 w-full"
                    >
                        <ArrowLeftOnRectangleIcon className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600" aria-hidden="true" />
                        Sign out
                    </button>
                 </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
