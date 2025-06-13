// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { FaCheckCircle } from 'react-icons/fa'; // Correct FaCheckCircle import
// import { fetchData } from '../utils';

// const ChannelPage = () => {
//     const { id } = useParams();
//     const [channel, setChannel] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const getChannel = async () => {
//             setLoading(true); // Ensure loading is true when starting fetch
//             setError(null); // Clear previous errors

//             try {
//                 const cached = sessionStorage.getItem(`channel-${id}`);
//                 if (cached) {
//                     setChannel(JSON.parse(cached));
//                 } else {
//                     const res = await fetchData(`/channel/details/?id=${id}&hl=en&gl=US`);
//                     // IMPORTANT FIX: Check res.success and set channel.data
//                     if (res.success) {
//                         sessionStorage.setItem(`channel-${id}`, JSON.stringify(res.data)); // Cache only data
//                         setChannel(res.data); // Set state with actual channel data
//                     } else {
//                         setError(res.error || 'Failed to fetch channel details.');
//                     }
//                 }
//             } catch (err) {
//                 console.error("Error fetching channel data:", err); // Log the actual error
//                 setError('Failed to load channel information.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (id) { // Only fetch if ID exists
//             getChannel();
//         } else {
//             setLoading(false);
//             setError("No channel ID provided.");
//         }
//     }, [id]);

//     if (loading) return <div className="p-4 text-center text-lg">Loading channel data...</div>;
//     if (error) return <div className="p-4 text-red-500 text-center text-lg">{error}</div>;
//     if (!channel) return <div className="p-4 text-gray-500 text-center text-lg">No channel data available.</div>;

//     // Destructure with default values for robustness, confirmed by API data
//     const {
//         title = 'Unknown Channel',
//         avatar,
//         banner,
//         badges = [],
//         description = 'No description available.',
//         subscribersText = '0 subscribers',
//         joinedDateText,
//         links = [],
//     } = channel;

//     // Find the optimal banner URL based on available desktop sizes
//     const bannerUrl = banner?.desktop?.[3]?.url || banner?.desktop?.[0]?.url || null; // Prioritize 2120px, then 1060px

//     // Find the optimal avatar URL based on available sizes
//     const avatarUrl = avatar?.[2]?.url || avatar?.[1]?.url || avatar?.[0]?.url || 'https://via.placeholder.com/112'; // Prioritize 176px, then 88px, then 48px

//     return (
//         <div className="flex flex-col w-full min-h-screen bg-gray-50">
//             {/* Banner */}
//             {bannerUrl && (
//                 <img
//                     src={bannerUrl}
//                     alt={`${title} channel banner`}
//                     className="w-full h-48 md:h-56 lg:h-64 object-cover" // Responsive height
//                 />
//             )}

//             {/* Profile Section */}
//             <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 px-4 md:px-6 py-4 max-w-7xl mx-auto w-full">
//                 <img
//                     src={avatarUrl}
//                     alt={`${title} channel avatar`}
//                     className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-white shadow-lg bg-white" // Added border and shadow
//                 />
//                 <div className="flex flex-col items-center md:items-start gap-1 md:gap-2 text-center md:text-left mt-2 md:mt-0">
//                     <div className="flex items-center gap-2 text-xl md:text-2xl font-bold">
//                         {title}
//                         {/* Check for badges and specific type for verification */}
//                         {badges.some(b => b.type === 'VERIFIED_CHANNEL') && (
//                             <FaCheckCircle className="text-blue-500 text-lg md:text-xl" title="Verified Channel" />
//                         )}
//                     </div>
//                     <div className="text-sm text-gray-600">{subscribersText}</div>
//                     {joinedDateText && <div className="text-sm text-gray-600">{joinedDateText}</div>}
//                 </div>
//             </div>

//             {/* Description */}
//             {description && description !== 'No description available.' && ( // Only show if not empty default
//                 <div className="px-4 md:px-6 max-w-4xl mx-auto mt-4 text-sm text-gray-800 whitespace-pre-line leading-relaxed w-full">
//                     <h3 className="font-semibold text-base mb-2">Description</h3>
//                     {description}
//                 </div>
//             )}

//             {/* Links */}
//             {links.length > 0 && (
//                 <div className="px-4 md:px-6 mt-4 max-w-4xl mx-auto flex flex-wrap gap-x-6 gap-y-3 w-full">
//                     <h3 className="font-semibold text-base w-full mb-1">Links</h3>
//                     {links.map((link, idx) => (
//                         <a
//                             key={link.targetUrl || idx} // Use targetUrl as a key if unique, otherwise fallback to index
//                             href={link.targetUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-2 text-sm text-blue-600 hover:underline hover:text-blue-800 transition-colors"
//                         >
//                             {link.icon?.[0] && ( // Only render img if icon URL exists
//                                 <img src={link.icon[0]} alt={`${link.title} external link icon`} className="w-4 h-4 object-contain" />
//                             )}
//                             {link.title}
//                         </a>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ChannelPage;
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import wwebanner from '../assets/banner.jpg';
import wwelogo from '../assets/wwe.jpg';

const ChannelPage = () => {
    const channel = {
        title: "WWE",
        avatar: [
            { url: "https://yt3.ggpht.com/ytc/AKedOLQhW5ilWNDmw4kpwrVc899jT-sx0AJjg5pZJVpqbGY=s176-c-k-c0x00ffffff-no-rj" }
        ],
        banner: {
            desktop: [
                { url: {wwebanner} }
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

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Channel Banner */}
            <div className="relative">
                <img 
                    src={wwebanner} 
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
                            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                        />
                    </div>

                    {/* Channel Metadata */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                            {badges.some(b => b.type === "VERIFIED_CHANNEL") && (
                                <FaCheckCircle className="text-blue-500" title="Verified" />
                            )}
                        </div>
                        
                        <div className="mt-2 text-gray-600">
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
                    <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
                        <h2 className="text-lg font-semibold mb-2">About</h2>
                        <p className="text-gray-700 whitespace-pre-line">{description}</p>
                    </div>
                )}

                {/* Links */}
                {links.length > 0 && (
                    <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
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

                {/* Tabs (Placeholder) */}
                <div className="mt-6 border-b border-gray-200">
                    <nav className="flex space-x-8">
                        <button className="px-1 py-3 border-b-2 border-red-600 font-medium text-red-600">
                            Home
                        </button>
                        <button className="px-1 py-3 font-medium text-gray-500 hover:text-gray-700">
                            Videos
                        </button>
                        <button className="px-1 py-3 font-medium text-gray-500 hover:text-gray-700">
                            Playlists
                        </button>
                        <button className="px-1 py-3 font-medium text-gray-500 hover:text-gray-700">
                            Community
                        </button>
                    </nav>
                </div>

                {/* Content Placeholder */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                            <div className="relative pt-[56.25%] bg-gray-200">
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
            </div>
        </div>
    );
};

export default ChannelPage;
