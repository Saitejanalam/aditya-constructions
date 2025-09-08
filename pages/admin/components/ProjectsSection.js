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
      
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-50 bg-gradient-to-r from-[#130cb7] to-[#aa08a4] text-white border-none py-4 rounded-xl font-bold text-md cursor-pointer disabled:opacity-60 hover:shadow-lg transition-all"
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
      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <h4 className="text-xl font-bold text-[#003A80]">{project.name}</h4>
                  <span className="bg-gradient-to-r from-[#003A80] to-[#130cb7] text-white px-3 py-1 rounded-full text-sm font-bold">
                    {project.price}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                  <span className="font-medium">📍 {project.location}</span>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                {project.image && (
                  <div className="mb-4">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-32 h-32 object-cover rounded-xl border-2 border-white shadow-lg"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3 ml-6">
                <button
                  onClick={() => handleEdit(project)}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-4 py-2 rounded-xl font-bold text-sm transition-all hover:shadow-lg"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-xl font-bold text-sm transition-all hover:shadow-lg"
                >
                  🗑️ Delete
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
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-xl font-bold text-sm transition-all hover:shadow-lg cursor-pointer block text-center"
                    >
                      📷 Add Image
                    </label>
                    {selectedFile && (
                      <button
                        onClick={() => handleImageUpload(project._id)}
                        disabled={uploadingImage}
                        className="mt-2 w-full bg-gradient-to-r from-[#003A80] to-[#130cb7] hover:from-[#130cb7] hover:to-[#aa08a4] disabled:opacity-50 text-white px-3 py-2 rounded-xl font-bold text-xs transition-all hover:shadow-lg"
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
        
        {projects.length === 0 && (
          <div className="text-center py-12">
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
