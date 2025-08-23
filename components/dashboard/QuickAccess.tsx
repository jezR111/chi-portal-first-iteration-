// File: components/dashboard/QuickAccess.tsx
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

const links = [
    { title: "Latest Course Module", href: "#"},
    { title: "Community Forum", href: "#"},
    { title: "Your Goals", href: "/goals"},
]

export const QuickAccess = () => (
    <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Access</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {links.map(link => (
                <a key={link.title} href={link.href} className="group bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex justify-between items-start">
                        <p className="font-semibold text-gray-900 dark:text-white">{link.title}</p>
                        <ArrowUpRightIcon className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                    </div>
                </a>
            ))}
        </div>
    </div>
);