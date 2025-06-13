import React, { useMemo, useEffect, useState } from 'react';
import { useLocation, NavLink } from 'react-router';

const Aside = ({ expanded, height }) => {
    const location = useLocation();
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('darkMode') === 'true';
        }
        return false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
    }, [darkMode]);

    const mainLinks = useMemo(() => [
        { icon: 'fa-house', text: 'Home', path: '/' },
        { icon: 'fa-fire', text: 'Trending', path: '/trending' },
        { icon: 'fa-bag-shopping', text: 'Shopping', path: '/shopping' },
        { icon: 'fa-gamepad', text: 'Gaming', path: '/gaming' },
    ], []);

    const linkBaseClasses = 'flex items-center rounded-lg transition-colors duration-200';
    const activeLinkClasses = 'font-medium bg-[var(--color-tertiary)] dark:bg-[var(--color-dark-tertiary)]';
    const inactiveLinkClasses = 'hover:bg-[var(--color-tertiary)] dark:hover:bg-[var(--color-dark-tertiary)]';

    return (
        <>
            {/* Desktop Sidebar (on mobile) */}
            <aside
                className={`hidden md:block fixed bg-[var(--color-bg-root)] dark:bg-[var(--color-dark-bg-root)] h-full transition-all duration-300 ease-in-out ${
                    expanded ? 'w-40' : 'w-24'
                }`}
                aria-label="Sidebar navigation"
                style={{ top: height }}
            >
                <div className="h-full overflow-y-auto pb-6 hide-scrollbar">
                    {/* Main Links */}
                    <nav aria-label="Main navigation">
                        <div className={`${expanded ? 'border-b border-[var(--color-secondary)] dark:border-[var(--color-dark-secondary)] flex justify-center flex-col' : 'flex flex-col justify-center'} pt-2 pb-4`}>
                            {mainLinks.map((link, index) => (
                                <NavLink
                                    key={index}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `${linkBaseClasses} ${
                                            isActive ? activeLinkClasses : inactiveLinkClasses
                                        } ${
                                            expanded
                                                ? 'flex-row px-6 py-3 mx-1'
                                                : 'flex-col py-3 -translate-x-2'
                                        }`
                                    }
                                    aria-current={location.pathname === link.path ? 'page' : undefined}
                                >
                                    <i
                                        className={`fa-solid ${link.icon} text-xl text-[var(--color-secondary)] dark:text-[var(--color-dark-secondary)]`}
                                        aria-hidden="true"
                                    />
                                    <span className={`${expanded ? 'ml-6' : 'text-xs mt-1'} text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]`}>
                                        {link.text}
                                    </span>
                                </NavLink>
                            ))}
                        </div>
                    </nav>
                </div>
            </aside>

            {/* Mobile Bottom Navigation (only on mobile) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-bg-root)] dark:bg-[var(--color-dark-bg-root)] border-t border-[var(--color-secondary)] dark:border-[var(--color-dark-secondary)] z-50">
                <nav className="flex justify-around items-center py-2">
                    {mainLinks.map((link, index) => (
                        <NavLink
                            key={index}
                            to={link.path}
                            className={({ isActive }) =>
                                `${linkBaseClasses} ${
                                    isActive ? activeLinkClasses : inactiveLinkClasses
                                } flex-col items-center p-2`
                            }
                            aria-current={location.pathname === link.path ? 'page' : undefined}
                        >
                            <i
                                className={`fa-solid ${link.icon} text-lg text-[var(--color-secondary)] dark:text-[var(--color-dark-secondary)]`}
                                aria-hidden="true"
                            />
                            <span className="text-xs mt-1 text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]">
                                {link.text}
                            </span>
                        </NavLink>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default Aside;