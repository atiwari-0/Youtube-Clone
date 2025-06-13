import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import wwebanner from '../assets/banner.jpg';
import wwelogo from '../assets/wwe.jpg';

const ChannelPage = () => {
    const [activeTab, setActiveTab] = useState('home');
    
    const channel = {
        title: "WWE",
        avatar: [
            { url: "https://yt3.ggpht.com/ytc/AKedOLQhW5ilWNDmw4kpwrVc899jT-sx0AJjg5pZJVpqbGY=s176-c-k-c0x00ffffff-no-rj" }
        ],
        banner: {
            desktop: [
                { url: wwebanner }
            ]
        },
        badges: [{ type: "VERIFIED_CHANNEL" }],
        description: "WWE on YouTube is your number one spot to catch WWE original shows and exclusives! Watch videos from all of your favorite WWE Superstars, backstage fallout from live shows including Raw, SmackDown, NXT and original shows such as Top 10, List This, WWE's The Bump and much more!",
        subscribersText: "88.9M subscribers",
        joinedDateText: "Joined May 10, 2007",
        links: [
            { 
                title: "WWE on Peacock", 
                targetUrl: "https://www.peacocktv.com/sports/wwe",
                icon: ["https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcR2Ly_siMJWnRW2XdwZLUxTiwlB4ctsmIm2YY-OWLOB-dBxxb3_BeqpkqbVcZpX52-O9dMEj7LvWBwVkppnyX6MYvYi--M0bnMCcB_G4iis1ueI2asbUA"]
            },
            {
                title: "WWE Network",
                targetUrl: "http://www.wwe.com/wwenetwork",
                icon: ["https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcT7H1ONQ3rAUqi4TUEh9i-1CTF6Wpjx0mqi97NarEByH7id0B1kOddSAIFO0Tjsva1dtKRMgHZZ2MFPJMOao6UgWn48Yn2zpKyn1fKP1EgC"]
            },
            {
                title: "WWE on Facebook",
                targetUrl: "https://www.facebook.com/wwe",
                icon: ["https://encrypted-tbn3.gstatic.com/favicon-tbn?q=tbn:ANd9GcSxUwGjsJZApoUKonOfNzxpFkEMyf29jwvspkLH1CA-JP5Nx06tcApyuGcjdsPZWzHuoyTRot1jS2gOtE_pzWKSSaJg0t0MtrRw6u7ZcItl78fGxuhb"]
            }
        ]
    };

    const {
        title = 'Channel',
        avatar = [],
        banner = { desktop: [] },
        badges = [],
        description = '',
        subscribersText = '0 subscribers',
        joinedDateText = '',
        links = []
    } = channel;

    const avatarUrl = avatar[0]?.url || wwelogo;
    const bannerUrl = banner.desktop[0]?.url || wwebanner;

    const renderHomeContent = () => (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-[var(--color-text-tertiary)] text-[var(--color-text-primary)] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                    <div className="relative pt-[56.25%] bg-[var(--color-text-secondary)]">
                        {/* Thumbnail placeholder */}
                    </div>
                    <div className="p-3">
                        <h3 className="font-medium line-clamp-2">Video Title {item}</h3>
                        <p className="text-sm text-gray-600 mt-1">Channel Name</p>
                        <p className="text-xs text-gray-500 mt-1">1M views • 1 day ago</p>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderVideosContent = () => (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                <div key={item} className="bg-[var(--color-text-tertiary)] text-[var(--color-text-primary)] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                    <div className="relative pt-[56.25%] bg-[var(--color-text-secondary)]">
                        {/* Thumbnail placeholder */}
                    </div>
                    <div className="p-3">
                        <h3 className="font-medium line-clamp-2">Video {item}</h3>
                        <p className="text-sm text-gray-600 mt-1">100K views</p>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderPlaylistsContent = () => (
        <div className="mt-6">
            <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center gap-4 p-3 bg-[var(--color-text-tertiary)] rounded-lg">
                        <div className="relative w-1/3 pt-[25%] bg-[var(--color-text-secondary)]">
                            {/* Playlist thumbnail placeholder */}
                        </div>
                        <div>
                            <h3 className="font-medium">Playlist {item}</h3>
                            <p className="text-sm text-gray-600 mt-1">10 videos</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderCommunityContent = () => (
        <div className="mt-6 space-y-4">
            {[1, 2, 3].map((item) => (
                <div key={item} className="p-4 bg-[var(--color-text-tertiary)] rounded-lg">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-text-secondary)]"></div>
                        <div>
                            <h3 className="font-medium">Community Post {item}</h3>
                            <p className="text-xs text-gray-500">2 days ago</p>
                        </div>
                    </div>
                    <p className="mt-2">This is a sample community post content...</p>
                </div>
            ))}
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'videos':
                return renderVideosContent();
            case 'playlists':
                return renderPlaylistsContent();
            case 'community':
                return renderCommunityContent();
            default:
                return renderHomeContent();
        }
    };

    return (
        <div className="bg-[var(--color-tertiary)] text-[var(--color-primary)] min-h-screen">
            {/* Channel Banner */}
            <div className="relative">
                <img 
                    src={bannerUrl} 
                    alt={`${title} channel banner`}
                    className="w-full h-48 md:h-56 lg:h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
            </div>

            {/* Channel Info Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    {/* Channel Avatar */}
                    <div className="relative -mt-16">
                        <img
                            src={avatarUrl}
                            alt={`${title} channel avatar`}
                            className="w-32 h-32 rounded-full shadow-lg"
                        />
                    </div>

                    {/* Channel Metadata */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <h1 className="text-2xl font-bold">{title}</h1>
                            {badges.some(b => b.type === "VERIFIED_CHANNEL") && (
                                <FaCheckCircle className="text-blue-500" title="Verified" />
                            )}
                        </div>
                        
                        <div className="mt-2 text-[var(--color-secondary)]">
                            <span className="font-medium">{subscribersText}</span>
                            {joinedDateText && (
                                <>
                                <span className="mx-2">•</span>
                                <span>{joinedDateText}</span>
                                </>
                            )}
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                            <button className="px-4 py-2 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition">
                                Subscribe
                            </button>
                            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full font-medium hover:bg-gray-300 transition">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                {/* Description */}
                {description && (
                    <div className="mt-6 p-4 rounded-lg shadow-sm">
                        <h2 className="text-lg font-semibold mb-2">About</h2>
                        <p className="text-[var(--color-primary)] whitespace-pre-line">{description}</p>
                    </div>
                )}

                {/* Links */}
                {links.length > 0 && (
                    <div className="mt-6 p-4 rounded-lg shadow-sm">
                        <h2 className="text-lg font-semibold mb-3">Links</h2>
                        <div className="flex flex-wrap gap-4">
                            {links.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.targetUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-blue-600 hover:underline"
                                >
                                    {link.icon?.[0] && (
                                        <img 
                                            src={link.icon[0]} 
                                            alt="" 
                                            className="w-4 h-4" 
                                        />
                                    )}
                                    <span>{link.title}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="mt-6 border-b border-gray-200">
                    <nav className="flex space-x-8">
                        <button 
                            onClick={() => setActiveTab('home')}
                            className={`px-1 py-3 font-medium ${activeTab === 'home' ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Home
                        </button>
                        <button 
                            onClick={() => setActiveTab('videos')}
                            className={`px-1 py-3 font-medium ${activeTab === 'videos' ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Videos
                        </button>
                        <button 
                            onClick={() => setActiveTab('playlists')}
                            className={`px-1 py-3 font-medium ${activeTab === 'playlists' ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Playlists
                        </button>
                        <button 
                            onClick={() => setActiveTab('community')}
                            className={`px-1 py-3 font-medium ${activeTab === 'community' ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Community
                        </button>
                    </nav>
                </div>

                {/* Render content based on active tab */}
                {renderContent()}
            </div>
        </div>
    );
};

export default ChannelPage;