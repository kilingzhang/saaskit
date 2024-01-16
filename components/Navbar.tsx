"use client";
import {Fragment} from 'react';
import {redirect, usePathname} from 'next/navigation';
import {Disclosure, Menu, Transition} from '@headlessui/react';
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from "next/link";
import {signOut} from "@/utils/supabase/auth";

const navigation = [
    {name: 'Dashboard', href: '/'},
    {name: 'Playground', href: '/playground'}
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}


export default function Navbar({user}: { user: any }) {
    const pathname = usePathname();
    console.log("user", user)
    if (!user && !user?.value || user?.value == "null") {
        user = null
    }
    return (
        <Disclosure as="nav" className="bg-white shadow-sm">
            {({open}) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex">
                                <div className="flex flex-shrink-0 items-center">
                                    <a
                                        className="py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border"
                                        href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkilingzhang%2Fone-saas%2Ftree%2Fmain%26project-name%3Done-saas%26repository-name%3Done-saas%26demo-title%3Done-saas%26demo-description%3Done-saas%20app%26demo-url%3Dhttps%3A%2F%2Fone-saas.vercel.app%26external-id%3Dhttps%3A%2F%2Fgithub.com%2Fkilingzhang%2Fone-saas%2Ftree%2Fmain%26demo-image%3Dhttps%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2Fopengraph-image.png%26integration-ids%3Doac_VqOgBHqhEoFTPzGkPd7L0iH6"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <svg
                                            width="32"
                                            height="32"
                                            viewBox="0 0 32 32"
                                            fill="none"
                                            className="text-gray-100"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                width="100%"
                                                height="100%"
                                                rx="16"
                                                fill="currentColor"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                                                fill="black"
                                            />
                                        </svg>
                                    </a>
                                </div>
                                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                pathname === item.href
                                                    ? 'border-slate-500 text-gray-900'
                                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                                            )}
                                            aria-current={pathname === item.href ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button
                                            className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                                            <span className="sr-only">Open user menu</span>
                                            <Image
                                                className="h-8 w-8 rounded-full"
                                                src={user?.user_metadata?.avatar_url || 'https://avatar.vercel.sh/leerob'}
                                                height={32}
                                                width={32}
                                                alt={`${user?.user_metadata?.name || 'placeholder'} avatar`}
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items
                                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {user ? (
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <form
                                                            className={classNames(active ? 'bg-gray-100' : '', 'flex w-full px-4 py-2 text-sm text-gray-700')}
                                                            action={signOut}
                                                        >
                                                            <button>Sign out</button>
                                                        </form>
                                                    )}
                                                </Menu.Item>
                                            ) : (
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <Link
                                                            href="/login"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'flex w-full px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Sign in
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            )}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                            <div className="-mr-2 flex items-center sm:hidden">
                                <Disclosure.Button
                                    className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 pt-2 pb-3">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        pathname === item.href
                                            ? 'bg-slate-50 border-slate-500 text-slate-700'
                                            : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                                        'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                                    )}
                                    aria-current={pathname === item.href ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                        <div className="border-t border-gray-200 pt-4 pb-3">
                            {user ? (
                                <>
                                    <div className="flex items-center px-4">
                                        <div className="flex-shrink-0">
                                            <Image
                                                className="h-8 w-8 rounded-full"
                                                src={user?.user_metadata?.image}
                                                height={32}
                                                width={32}
                                                alt={`${user?.user_metadata?.name} avatar`}
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium text-gray-800">
                                                {user?.user_metadata?.name}
                                            </div>
                                            <div className="text-sm font-medium text-gray-500">
                                                {user?.user_metadata?.email}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3 space-y-1">
                                        <button
                                            className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                            onClick={signOut}
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="mt-3 space-y-1">
                                    <button
                                        className="flex w-full px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                        onClick={() => {
                                            redirect("/login")
                                        }}
                                    >
                                        Sign in
                                    </button>
                                </div>
                            )}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}