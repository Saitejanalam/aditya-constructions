import { useState, useEffect } from 'react';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    location: '',
    description: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const apiBase = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const response = await fetch(`${apiBase}/api/projects`);
      const data = await response.json();
      if (response.ok) {
        setProjects(data);
        setFilteredProjects(data);
      } else {
        setMessage('Failed to fetch projects');
      }
    } catch (error) {
      setMessage('Error fetching projects');
    }
  };

  // Filter projects based on search term
  const filterProjects = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredProjects(projects);
      return;
    }
    
    const filtered = projects.filter(project => 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.price.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterProjects(value);
  };

  useEffect(() => {
    fetchProjects();
  }, [apiBase]);

  useEffect(() => {
    filterProjects(searchTerm);
  }, [projects, searchTerm]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];
      if (!validTypes.includes(file.type)) {
        setMessage('Only PNG, JPG, and JPEG files are allowed!');
        return;
      }
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage('File size must be less than 5MB!');
        return;
      }
      setSelectedFile(file);
      setMessage('');
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      location: '',
      description: ''
    });
    setSelectedFile(null);
    setEditingProject(null);
    setShowForm(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (editingProject) {
        // Update existing project
        const response = await fetch(`${apiBase}/api/projects/${editingProject._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          setMessage('Project updated successfully!');
          fetchProjects();
          resetForm();
          setTimeout(() => {
            setMessage('');
          }, 3000);
        } else {
          const data = await response.json();
          setMessage(data.error || 'Failed to update project');
        }
      } else {
        // Create new project
        const response = await fetch(`${apiBase}/api/projects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          const data = await response.json();
          setMessage('Project created successfully!');
          
          // If there's a selected file, upload it
          if (selectedFile) {
            await uploadProjectImage(data.project._id);
          }
          
          fetchProjects();
          resetForm();
          setTimeout(() => {
            setMessage('');
          }, 3000);
        } else {
          const data = await response.json();
          setMessage(data.error || 'Failed to create project');
        }
      }
    } catch (error) {
      setMessage('Server error');
    }
    setLoading(false);
  };

  // Upload project image
  const uploadProjectImage = async (projectId) => {
    if (!selectedFile) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch(`${apiBase}/api/projects/${projectId}/upload-image`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setMessage('Project image uploaded successfully!');
        fetchProjects();
        setSelectedFile(null);
        setTimeout(() => {
          setMessage('');
        }, 3000);
      } else {
        const data = await response.json();
        setMessage(data.error || 'Failed to upload image');
      }
    } catch (error) {
      setMessage('Error uploading image');
    }
    setUploadingImage(false);
  };

  // Edit project
  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      price: project.price,
      location: project.location,
      description: project.description
    });
    setShowForm(true);
  };

  // Delete project
  const handleDelete = async (projectId) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`${apiBase}/api/projects/${projectId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setMessage('Project deleted successfully!');
        fetchProjects();
        setTimeout(() => {
          setMessage('');
        }, 3000);
      } else {
        const data = await response.json();
        setMessage(data.error || 'Failed to delete project');
      }
    } catch (error) {
      setMessage('Error deleting project');
    }
  };

  // Upload image for existing project
  const handleImageUpload = async (projectId) => {
    if (!selectedFile) {
      setMessage('Please select a file first');
      return;
    }

    await uploadProjectImage(projectId);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center mb-6">
        <div className="text-2xl font-bold text-[#003A80] flex-1">🏗️ Projects Management</div>
        <div className="text-sm text-gray-500">Manage construction projects</div>
      </div>
      
      {/* Search and Add Project */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Search projects by name, location, price, or description..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full py-3 px-4 pl-12 rounded-xl border border-gray-300 text-base focus:ring-2 focus:ring-[#003A80] focus:border-transparent transition-all"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <span className="text-gray-400 text-lg">🔍</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full sm:w-auto bg-gradient-to-r from-[#130cb7] to-[#aa08a4] text-white border-none py-3 px-6 rounded-xl font-bold text-lg cursor-pointer disabled:opacity-60 hover:shadow-lg transition-all"
        >
          {showForm ? '❌ Cancel' : '➕ Add New Project'}
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-xl text-center font-medium ${
          message.includes('successfully') || message.includes('updated') || message.includes('created') || message.includes('uploaded')
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
          <h4 className="text-xl font-bold text-[#003A80] mb-6 text-center">
            {editingProject ? '✏️ Edit Project' : '➕ Add New Project'}
          </h4>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full py-3 px-4 rounded-xl border border-gray-300 text-base focus:ring-2 focus:ring-[#003A80] focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Price (INR) *
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="₹ 29 Lakhs"
                  required
                  className="w-full py-3 px-4 rounded-xl border border-gray-300 text-base focus:ring-2 focus:ring-[#003A80] focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full py-3 px-4 rounded-xl border border-gray-300 text-base focus:ring-2 focus:ring-[#003A80] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full py-3 px-4 rounded-xl border border-gray-300 text-base focus:ring-2 focus:ring-[#003A80] focus:border-transparent transition-all resize-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Project Image
              </label>
              <input
                type="file"
                accept="image/png,image/jpg,image/jpeg"
                onChange={handleFileSelect}
                className="w-full py-3 px-4 rounded-xl border border-gray-300 text-base focus:ring-2 focus:ring-[#003A80] focus:border-transparent transition-all"
              />
              <div className="text-xs text-gray-500 mt-2">
                Only PNG, JPG, JPEG files up to 5MB are allowed
              </div>
              {selectedFile && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800 font-medium">
                    Selected: {selectedFile.name}
                  </div>
                  <div className="text-xs text-green-600">
                    Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-4 justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-[#003A80] to-[#130cb7] text-white border-none py-4 px-8 rounded-xl font-bold text-lg cursor-pointer disabled:opacity-60 hover:shadow-lg transition-all"
              >
                {loading ? '🔄 Saving...' : (editingProject ? '💾 Update Project' : '➕ Create Project')}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg"
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {filteredProjects.map((project) => (
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
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">🏗️</div>
                    <div className="text-sm">No Image</div>
                  </div>
                </div>
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

              {/* Action Buttons */}
              <div className="mt-auto space-y-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white border-none px-3 py-2 rounded-lg cursor-pointer font-bold text-sm transition-all duration-300"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-none px-3 py-2 rounded-lg cursor-pointer font-bold text-sm transition-all duration-300"
                  >
                    🗑️ Delete
                  </button>
                </div>
                
                {/* Add Image Button */}
                {!project.image && (
                  <div>
                    <input
                      type="file"
                      accept="image/png,image/jpg,image/jpeg"
                      onChange={handleFileSelect}
                      className="hidden"
                      id={`image-${project._id}`}
                    />
                    <label
                      htmlFor={`image-${project._id}`}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-none px-3 py-2 rounded-lg cursor-pointer font-bold text-sm transition-all duration-300 block text-center"
                    >
                      📷 Add Image
                    </label>
                    {selectedFile && (
                      <button
                        onClick={() => handleImageUpload(project._id)}
                        disabled={uploadingImage}
                        className="mt-2 w-full bg-gradient-to-r from-[#003A80] to-[#130cb7] hover:from-[#130cb7] hover:to-[#aa08a4] disabled:opacity-50 text-white px-3 py-2 rounded-lg font-bold text-sm transition-all duration-300"
                      >
                        {uploadingImage ? '🔄 Uploading...' : '⬆️ Upload'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {filteredProjects.length === 0 && projects.length > 0 && (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <div className="text-xl font-bold text-gray-600 mb-2">No Projects Match Your Search</div>
            <div className="text-gray-500">Try adjusting your search terms or clear the search to see all projects.</div>
          </div>
        )}
        
        {projects.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">🏗️</div>
            <div className="text-xl font-bold text-gray-600 mb-2">No Projects Found</div>
            <div className="text-gray-500">Create your first project using the "Add New Project" button above.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsSection;
