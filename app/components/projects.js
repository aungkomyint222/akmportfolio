import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Poster Design',
      description: 'Project about poster design and visual communication history.',
      url: 'https://www.behance.net/gallery/218784707/Poster-Design-and-Visual-Communication-History',
      tags: ['design', 'poster', 'visual-communication']
    },
    {
      title: 'The Identity',
      description: 'Various project about identity and branding.',
      url: 'https://www.behance.net/gallery/218783839/the-identiy-logo-projects/modules/1246874971',
      tags: ['branding', 'logo', 'identity']
    },
    {
      title: 'Photography',
      description: 'Photography project about Still life Photography.',
      url: 'https://www.behance.net/gallery/218782367/Art-of-Still-life-Photography-Project/modules/1246867225',
      tags: ['photography', 'still-life']
    },
    {
      title: 'Maha Branding',
      description: 'A brand design for an all in one app MAHA.',
      url: 'https://www.behance.net/gallery/218782719/MAHA-VISUAL-BRANDING/modules/1246868983',
      tags: ['branding', 'app', 'design']
    },
    {
      title: 'KM Web Design',
      description: 'Web development Project for KM Web agency',
      url: 'https://kmwebdesign.netlify.app/',
      tags: ['web', 'development', 'agency']
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const allTags = ['all', ...new Set(projects.flatMap(project => project.tags))];

  useEffect(() => {
    let filtered = projects;
    
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedTag !== 'all') {
      filtered = filtered.filter(project =>
        project.tags.includes(selectedTag)
      );
    }
    
    setFilteredProjects(filtered);
  }, [searchTerm, selectedTag]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-900 text-white p-4 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold">My Projects</h2>
          
          {/* Search and Filter Section */}
          <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
          <div className="relative flex items-center">
  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
    <Search className="text-gray-400 w-5 h-5" />
  </div>
  <input
    type="text"
    placeholder="Search projects..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="pl-10 pr-4 py-2 bg-gray-800 rounded-lg text-white w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-red-500"
  />
</div>

            
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedTag === tag
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredProjects.map((project, index) => (
              <motion.a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="block bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4 text-sm">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-gray-700 rounded-full text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-400"
          >
            <p>No projects found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Projects;