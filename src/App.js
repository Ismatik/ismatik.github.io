// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import './index.css'; // Ensure global styles are applied
import ProjectCard from './components/ProjectCard'; // Import the ProjectCard component

// --- Constants ---
const GITHUB_PROFILE_URL = "https://api.github.com/users/Ismatik";
const GITHUB_REPOS_URL = "https://api.github.com/users/Ismatik/repos";

// --- Utility Functions ---
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch ${url}:`, error);
        throw error;
    }
};

// --- Main Application Component ---
const App = () => {
    const [profile, setProfile] = useState({
        username: 'Ismatik',
        name: 'Ismatik',
        bio: 'Crafting digital experiences and building cool stuff.',
        avatar_url: 'https://placehold.co/150x150/4F46E5/FFFFFF?text=User',
        html_url: 'https://github.com/Ismatik',
    });
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState('HOME');

    const fetchGitHubData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const profileData = await fetchData(GITHUB_PROFILE_URL);
            setProfile({
                username: profileData.login,
                name: profileData.name || profileData.login,
                bio: profileData.bio || 'Crafting digital experiences and building cool stuff.',
                avatar_url: profileData.avatar_url,
                html_url: profileData.html_url,
            });

            const reposData = await fetchData(GITHUB_REPOS_URL);
            const featuredRepos = reposData
                .filter(repo => repo.name === 'tajmotors' || repo.name === 'mehnat')
                .map(repo => ({
                    name: repo.name,
                    description: repo.description,
                    language: repo.language || 'Unknown',
                    stargazers_count: repo.stargazers_count,
                    html_url: repo.html_url,
                }));

            if (featuredRepos.length < 2) {
                const allRepos = reposData.map(repo => ({
                    name: repo.name,
                    description: repo.description,
                    language: repo.language || 'Unknown',
                    stargazers_count: repo.stargazers_count,
                    html_url: repo.html_url,
                }));
                const combinedRepos = [...featuredRepos];
                allRepos.forEach(repo => {
                    if (!combinedRepos.some(r => r.name === repo.name)) {
                        combinedRepos.push(repo);
                    }
                });
                setProjects(combinedRepos);
            } else {
                setProjects(featuredRepos);
            }
        } catch (err) {
            setError("Failed to load GitHub data. Please check your internet connection or try again later.");
            setProjects([
                { name: 'tajmotors', description: 'Failed to load description.', language: 'JS', stargazers_count: 0, html_url: 'https://github.com/Ismatik/tajmotors' },
                { name: 'mehnat', description: 'Failed to load description.', language: 'C++/Python', stargazers_count: 0, html_url: 'https://github.com/Ismatik/mehnat' },
            ]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGitHubData();
    }, [fetchGitHubData]);

    const renderContent = () => {
        if (currentPage === 'HOME') {
            return (
                <div className="flex flex-col justify-center items-start h-full p-8 md:p-16 text-left">
                    <p className="text-xl md:text-2xl font-light text-gray-500 mb-4 tracking-widest uppercase">
                        Hello, I'm
                    </p>
                    <h2 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-gray-800 leading-tight">
                        {profile.name}'s
                        <br />
                        <span className="text-indigo-600">PORTFOLIO.</span>
                    </h2>
                    <p className="mt-8 text-xl md:text-3xl max-w-2xl font-light text-gray-600 leading-relaxed">
                        {profile.bio}
                    </p>
                    <div className="mt-12 flex flex-wrap space-x-4">
                        <a
                            href="https://t.me/ismat_assistant_bot"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl font-semibold px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300 shadow-xl mb-4 md:mb-0"
                        >
                            My Telegram Assistant
                        </a>
                        <a
                            href={profile.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl font-semibold px-8 py-3 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 transition duration-300"
                        >
                            GitHub Profile
                        </a>
                    </div>
                </div>
            );
        }

        if (currentPage === 'PROJECTS') {
            return (
                <div className="h-full overflow-y-auto p-8 md:p-16">
                    <h2 className="text-5xl md:text-7xl font-extrabold text-gray-800 mb-10 border-b-4 border-indigo-200 pb-4 inline-block">
                        Featured Projects
                    </h2>
                    {loading && <p className="text-center text-xl text-indigo-500 py-10">Loading projects...</p>}
                    {error && <p className="text-center text-red-500 py-10">{error}</p>}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.length > 0 ? (
                            projects.map((project, index) => (
                                <ProjectCard key={project.name || index} project={project} index={index} />
                            ))
                        ) : (
                            !loading && !error && <p className="text-center text-xl text-gray-500 py-10 col-span-full">No projects found.</p>
                        )}
                    </div>
                    <div className="mt-12 text-center">
                        <a
                            href={profile.html_url ? `${profile.html_url}?tab=repositories` : '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl font-semibold px-8 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition duration-300 shadow-xl"
                        >
                            View All Repositories
                        </a>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 relative overflow-hidden font-sans antialiased">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-200 rounded-full opacity-30 filter blur-xl animate-float"></div>
                <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-purple-300 rounded-full opacity-40 filter blur-lg animate-float-slow"></div>
                <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-blue-300 rounded-full opacity-40 filter blur-lg animate-float-faster"></div>
                <div className="absolute inset-0 opacity-20 animate-particle-drift">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute bg-indigo-400 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                width: '4px',
                                height: '4px',
                                animationDelay: `${Math.random() * 5}s`,
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            <header className="fixed top-0 left-0 w-full z-20 flex justify-between items-center p-8 backdrop-blur-md bg-white/60 shadow-sm">
                <div
                    className="text-3xl font-extrabold cursor-pointer text-gray-800 hover:text-indigo-700 transition duration-300"
                    style={{ fontFamily: '"Poppins", sans-serif' }}
                    onClick={() => setCurrentPage('HOME')}
                >
                    Ismatik
                </div>
                <nav className="space-x-6 flex">
                    <button
                        onClick={() => setCurrentPage('HOME')}
                        className={`text-lg font-medium transition duration-300
                            ${currentPage === 'HOME' ? 'text-indigo-700 font-bold border-b-2 border-indigo-600 pb-1' : 'text-gray-600 hover:text-indigo-700'}`}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => setCurrentPage('PROJECTS')}
                        className={`text-lg font-medium transition duration-300
                            ${currentPage === 'PROJECTS' ? 'text-indigo-700 font-bold border-b-2 border-indigo-600 pb-1' : 'text-gray-600 hover:text-indigo-700'}`}
                    >
                        Projects
                    </button>
                </nav>
            </header>

            <main className="relative z-10 pt-32 min-h-screen transition-opacity duration-700 ease-in-out flex items-center justify-center">
                {renderContent()}
            </main>

            <footer className="fixed bottom-0 left-0 w-full z-20 p-8 flex justify-center md:justify-end">
                <a
                    href={`mailto:ismatullo.yuldoshev@gmail.com`} // Your email here
                    className="text-lg font-medium text-gray-500 hover:text-indigo-700 transition duration-300 tracking-wide"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Get In Touch
                </a>
            </footer>

            {/* Custom CSS Keyframes */}
            <style jsx global>{`
                @keyframes float {
                    0% { transform: translate(0, 0) rotate(-3deg); }
                    50% { transform: translate(-15px, -15px) rotate(-3deg); }
                    100% { transform: translate(0, 0) rotate(-3deg); }
                }
                .animate-float { animation: float 6s ease-in-out infinite; }
                @keyframes float-slow {
                    0% { transform: translate(0, 0); }
                    50% { transform: translate(-10px, -10px); }
                    100% { transform: translate(0, 0); }
                }
                .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
                @keyframes float-faster {
                    0% { transform: translate(0, 0); }
                    50% { transform: translate(10px, 10px); }
                    100% { transform: translate(0, 0); }
                }
                .animate-float-faster { animation: float-faster 5s ease-in-out infinite; }
                @keyframes particle-drift {
                    0% { transform: translate(0, 0) scale(1); opacity: 0.5; }
                    50% { transform: translate(50px, -50px) scale(1.2); opacity: 1; }
                    100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
                }
                .animate-particle-drift > div { animation: particle-drift 15s linear infinite; }
            `}</style>
        </div>
    );
};

export default App;