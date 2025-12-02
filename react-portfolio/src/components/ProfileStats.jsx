
import React from 'react';
import { useProfileData } from '../hooks/useProfileData';

const ProfileStats = () => {
    const { leetcode, github, loading, error } = useProfileData();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <div className="section-header">
                <h2 className="text-3xl font-bold text-center mb-8">Live Profile Stats</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* LeetCode Card */}
                <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-yellow-500 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="bg-gray-900 p-4 border-b border-gray-700 flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-yellow-500 flex items-center gap-2">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.173 5.798a1.375 1.375 0 0 0-.013 1.948l.872.865a1.379 1.379 0 0 0 1.954.007l3.724-3.722a.5.5 0 0 1 .708.708l-3.724 3.722a2.38 2.38 0 0 1-3.366-.012L6.456 8.448l-.872-.865a2.375 2.375 0 0 1 .022-3.362l5.349-5.359a2.375 2.375 0 0 1 1.66-.756c.636 0 1.272.242 1.758.728l5.349 5.359a2.375 2.375 0 0 1 .022 3.362l-.872.865a2.38 2.38 0 0 1-3.366.012l-3.724-3.722a.5.5 0 0 1 .708-.708l3.724 3.722a1.379 1.379 0 0 0 1.954-.007l.872-.865a1.375 1.375 0 0 0-.013-1.948L14.444.438A1.374 1.374 0 0 0 13.483 0zm-2.42 7.406a1.374 1.374 0 0 0-.961.438L4.753 13.204a1.375 1.375 0 0 0-.013 1.948l.872.865a1.379 1.379 0 0 0 1.954.007l3.724-3.722a.5.5 0 0 1 .708.708l-3.724 3.722a2.38 2.38 0 0 1-3.366-.012L3.036 15.854l-.872-.865a2.375 2.375 0 0 1 .022-3.362l5.349-5.359a2.375 2.375 0 0 1 1.66-.756c.636 0 1.272.242 1.758.728l5.349 5.359a2.375 2.375 0 0 1 .022 3.362l-.872.865a2.38 2.38 0 0 1-3.366.012l-3.724-3.722a.5.5 0 0 1 .708-.708l3.724 3.722a1.379 1.379 0 0 0 1.954-.007l.872-.865a1.375 1.375 0 0 0-.013-1.948L12.024 7.844a1.374 1.374 0 0 0-.961-.438z" /></svg>
                            LeetCode
                        </h3>
                        <span className="text-gray-400 text-sm">@{leetcode?.username}</span>
                    </div>

                    {leetcode ? (
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={leetcode.profile?.userAvatar}
                                    alt={leetcode.username}
                                    className="w-16 h-16 rounded-full border-2 border-yellow-500"
                                />
                                <div>
                                    <h4 className="text-xl font-bold text-white">{leetcode.profile?.realName}</h4>
                                    <p className="text-gray-400">Rank: #{leetcode.profile?.ranking.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {leetcode.submitStats?.totalSubmissionNum.map((stat) => (
                                    stat.difficulty !== 'All' && (
                                        <div key={stat.difficulty} className="flex items-center justify-between">
                                            <span className={`text-sm font-medium ${stat.difficulty === 'Easy' ? 'text-green-400' :
                                                stat.difficulty === 'Medium' ? 'text-yellow-400' :
                                                    'text-red-400'
                                                }`}>
                                                {stat.difficulty}
                                            </span>
                                            <div className="flex-1 mx-4 h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${stat.difficulty === 'Easy' ? 'bg-green-500' :
                                                        stat.difficulty === 'Medium' ? 'bg-yellow-500' :
                                                            'bg-red-500'
                                                        }`}
                                                    style={{ width: `${Math.min(stat.count, 100)}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-white font-bold">{stat.count}</span>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="p-6 text-center text-gray-400">
                            No LeetCode data available.
                        </div>
                    )}
                </div>

                {/* GitHub Card */}
                <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-gray-500 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="bg-gray-900 p-4 border-b border-gray-700 flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            GitHub
                        </h3>
                        <a
                            href={github?.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 text-sm hover:text-white transition-colors"
                        >
                            @{github?.login}
                        </a>
                    </div>

                    {github ? (
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={github.avatar_url}
                                    alt={github.login}
                                    className="w-16 h-16 rounded-full border-2 border-gray-500"
                                />
                                <div>
                                    <h4 className="text-xl font-bold text-white">{github.name || github.login}</h4>
                                    <p className="text-gray-400 text-sm">{github.bio}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="bg-gray-700 p-2 rounded-lg">
                                    <span className="block text-xl font-bold text-white">{github.public_repos}</span>
                                    <span className="text-xs text-gray-400">Repos</span>
                                </div>
                                <div className="bg-gray-700 p-2 rounded-lg">
                                    <span className="block text-xl font-bold text-white">{github.followers}</span>
                                    <span className="text-xs text-gray-400">Followers</span>
                                </div>
                                <div className="bg-gray-700 p-2 rounded-lg">
                                    <span className="block text-xl font-bold text-white">{github.following}</span>
                                    <span className="text-xs text-gray-400">Following</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <img
                                    src={`https://ghchart.rshah.org/${github.login}`}
                                    alt="GitHub Contributions"
                                    className="w-full rounded-lg opacity-80 hover:opacity-100 transition-opacity"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="p-6 text-center text-gray-400">
                            No GitHub data available.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileStats;
