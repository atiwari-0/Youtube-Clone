import React, { useMemo } from 'react';
import { useLocation, NavLink } from 'react-router';

const Aside = ({ expanded, height }) => {
    const location = useLocation();

    const mainLinks = useMemo(() => [
        { icon: 'fa-house', text: 'Home', path: '/' },
        { icon: 'fa-fire', text: 'Trending', path: '/trending' },
        { icon: 'fa-bag-shopping', text: 'Shopping', path: '/shopping' },
        { icon: 'fa-gamepad', text: 'Gaming', path: '/gaming' },
    ], []);

    const subscriptions = useMemo(() => [
        { icon: 'fa-circle-user', text: 'Channel 1', color: 'text-red-500' },
        { icon: 'fa-circle-user', text: 'Channel 2', color: 'text-blue-500' },
        { icon: 'fa-circle-user', text: 'Channel 3', color: 'text-green-500' },
    ], []);

    // Base classes for consistent styling
    const linkBaseClasses = 'flex items-center rounded-lg transition-colors duration-200';
    const activeLinkClasses = 'font-medium bg-yt-light-200 dark:bg-yt-dark-700';
    const inactiveLinkClasses = 'hover:bg-yt-light-100 dark:hover:bg-yt-dark-800';

    return (
        <aside
            className={`fixed  bg-white dark:bg-dark-900 h-full transition-all duration-300 ease-in-out ${expanded ? 'w-40' : 'w-24'
                }`}
            aria-label="Sidebar navigation"
        >
            <div className="h-full overflow-y-auto pb-6 hide-scrollbar">
                {/* Main Links */}
                <nav aria-label="Main navigation">
                    <div className={`${expanded ? 'border-b flex juatify-center flex-col' : 'flex flex-col justify-center'} pt-2 pb-4`}>
                        {mainLinks.map((link, index) => (
                            <NavLink
                                key={index}
                                to={link.path}
                                className={({ isActive }) =>
                                    `${linkBaseClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses} ${expanded ? 'flex-row px-6 py-3 mx-1' : 'flex-col py-3 -translate-x-2'
                                    } ${location.pathname === link.path ? 'bg-secondary text-white' : 'text-primary'}`
                                }
                                aria-current={location.pathname === link.path ? 'page' : undefined}
                            >
                                <i
                                    className={`fa-solid ${link.icon} text-xl `}
                                    aria-hidden="true"
                                />
                                <span className={`${expanded ? 'ml-6' : 'text-xs mt-1'}`}>
                                    {link.text}
                                </span>
                            </NavLink>
                        ))}
                    </div>
                </nav>

                {/* Subscriptions */}
                {expanded && (
                    <nav aria-label="Subscriptions">
                        <div className="pt-2">
                            <h2 className="px-4 py-2 text-sm font-medium text-yt-text-secondary dark:text-yt-text-inverted">
                                SUBSCRIPTIONS
                            </h2>
                            {subscriptions.map((channel, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className={`${linkBaseClasses} ${inactiveLinkClasses} px-4 py-2 mx-1`}
                                >
                                    <i
                                        className={`fa-solid ${channel.icon} text-xl ${channel.color}`}
                                        aria-hidden="true"
                                    />
                                    <span className="ml-6 text-yt-text-primary dark:text-yt-text-inverted">
                                        {channel.text}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </nav>
                )}
            </div>
        </aside>
    );
};

export default Aside;