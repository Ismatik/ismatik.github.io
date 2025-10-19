// src/components/ProjectCard.js
import React from 'react';

const ProjectCard = ({ project, index }) => (
    <a
        href={project.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className={`
            relative group block p-6 md:p-10 border-b border-r border-indigo-200
            hover:bg-gradient-to-br hover:from-indigo-50 hover:to-white
            transition-all duration-500 ease-out transform hover:scale-[1.01] cursor-pointer
            overflow-hidden
        `}
        style={{ transitionDelay: `${index * 50}ms` }}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
        <div className="flex justify-between items-start mb-4 relative z-10">
            <h3 className="text-3xl md:text-5xl font-extrabold text-indigo-700
                group-hover:text-indigo-900 transition-colors duration-300">
                {project.name}
            </h3>
            {project.language && (
                <span className="text-xs font-mono text-gray-600 bg-indigo-100 px-3 py-1 rounded-full whitespace-nowrap">
                    {project.language}
                </span>
            )}
        </div>
        <p className="text-lg text-gray-700 mb-4 relative z-10">
            {project.description || 'No description provided.'}
        </p>
        <div className="flex items-center text-sm font-semibold text-gray-500 relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.243.588 1.81l-2.817 2.042a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.817-2.042a1 1 0 00-1.175 0l-2.817-2.042c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.022 8.729c-.783-.567-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {project.stargazers_count} Stars
        </div>
    </a>
);

export default ProjectCard;