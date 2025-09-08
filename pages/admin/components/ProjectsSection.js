import { useState, useEffect } from 'react';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
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
      } else {
        setMessage('Failed to fetch projects');
      }
    } catch (error) {
      setMessage('Error fetching projects');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [apiBase]);

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
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Projects Management</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-40 bg-gradient-to-r from-[#130cb7] to-[#aa08a4] text-white border-none py-4 rounded-xl font-bold text-md cursor-pointer disabled:opacity-60 hover:shadow-lg transition-all"
        >
          {showForm ? 'Cancel' : 'Add New Project'}
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-4 p-3 rounded-lg ${
          message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="text-lg font-medium mb-4">
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (INR) *
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="₹ 29 Lacks"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Image
              </label>
              <input
                type="file"
                accept="image/png,image/jpg,image/jpeg"
                onChange={handleFileSelect}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Only PNG, JPG, JPEG files up to 5MB are allowed
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="w-40 bg-gradient-to-r from-[#130cb7] to-[#aa08a4] text-white border-none py-4 rounded-xl font-bold text-md cursor-pointer disabled:opacity-60 hover:shadow-lg transition-all"
              >
                {loading ? 'Saving...' : (editingProject ? 'Update Project' : 'Create Project')}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project._id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h4 className="text-lg font-semibold text-gray-800">{project.name}</h4>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                    {project.price}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                  <span>📍 {project.location}</span>
                </div>
                <p className="text-gray-700 mb-3">{project.description}</p>
                {project.image && (
                  <div className="mb-3">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <button
                  onClick={() => handleEdit(project)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Delete
                </button>
                {!project.image && (
                  <div className="mt-2">
                    <input
                      type="file"
                      accept="image/png,image/jpg,image/jpeg"
                      onChange={handleFileSelect}
                      className="hidden"
                      id={`image-${project._id}`}
                    />
                    <label
                      htmlFor={`image-${project._id}`}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors cursor-pointer block text-center"
                    >
                      Add Image
                    </label>
                    {selectedFile && (
                      <button
                        onClick={() => handleImageUpload(project._id)}
                        disabled={uploadingImage}
                        className="mt-1 w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white px-2 py-1 rounded text-xs transition-colors"
                      >
                        {uploadingImage ? 'Uploading...' : 'Upload'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {projects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No projects found. Create your first project above.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsSection;
