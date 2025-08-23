import { useState, useEffect } from 'react';

const OurProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const apiBase = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${apiBase}/api/projects`);
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          setError('Failed to fetch projects');
        }
      } catch (error) {
        setError('Error fetching projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [apiBase]);

  // Dummy property image placeholder
  const getDummyImage = () => {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='16' fill='%239ca3af'%3EProperty Image%3C/text%3E%3C/svg%3E`;
  };

  if (loading) {
    return (
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-[#003A80] text-2xl sm:text-3xl font-bold mb-8">Our Projects</h2>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003A80]"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-[#003A80] text-2xl sm:text-3xl font-bold mb-8">Our Projects</h2>
        <div className="text-center text-red-600">
          {error}
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-[#003A80] text-2xl sm:text-3xl font-bold mb-8">Our Projects</h2>
        <div className="text-center text-gray-600">
          No projects available at the moment.
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-[#003A80] text-2xl sm:text-3xl font-bold mb-8">Our Projects</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between border border-gray-100"
          >
            {/* Image */}
            <div className="h-48 sm:h-52 bg-gray-100 flex items-center justify-center overflow-hidden">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <img
                  src={getDummyImage()}
                  alt="Property placeholder"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-[#003A80] text-base sm:text-lg font-bold leading-tight flex-1 mr-2">
                  {project.name}
                </h3>
                <div className="bg-gradient-to-r from-[#5f0aff] to-[#9d00ff] text-white font-bold px-2 py-1 rounded-lg text-xs sm:text-sm whitespace-nowrap flex-shrink-0">
                  {project.price}
                </div>
              </div>

              <div className="flex items-center mb-3">
                <img
                  src="/icons/pin.png"
                  alt="location"
                  className="w-4 h-4 mr-2 flex-shrink-0"
                />
                <span className="text-sm text-[#333] leading-tight">
                  {project.location}
                </span>
              </div>
              
              <div className="flex-1">
                <p className="text-sm text-[#333] leading-relaxed mb-3">
                  {project.description}
                </p>
              </div>

              <div className="mt-auto">
                <button className="w-full bg-gradient-to-r from-[#5f0aff] to-[#9d00ff] text-white border-none px-4 py-2 rounded-lg cursor-pointer font-bold text-sm hover:from-[#4a0ae6] hover:to-[#8a00e6] transition-all duration-300">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurProjects;
