# Dynamic Projects System Setup

This document explains how to set up and use the new dynamic projects system for Aditya Constructions.

## Features

- **Dynamic Project Management**: Admin users can create, edit, and delete projects from the admin panel
- **Image Upload**: Support for project images with automatic fallback to placeholder images
- **Responsive Design**: Mobile-friendly grid layout that adapts to different screen sizes
- **Real-time Updates**: Changes in admin panel immediately reflect on the frontend

## Backend Setup

### 1. Database Model
The system uses a new `Project` model with the following fields:
- `name`: Project name (required)
- `price`: Price in INR format (required)
- `location`: Project location (required)
- `description`: Project description (required)
- `image`: Project image URL (optional)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### 2. API Endpoints
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/upload-image` - Upload project image

### 3. File Upload
- Images are stored in `public/uploads/` directory
- Supported formats: PNG, JPG, JPEG
- Maximum file size: 5MB
- Automatic cleanup of old images when replaced

## Frontend Setup

### 1. Admin Panel
- New "Projects Management" section in the admin panel
- Form to add/edit projects with validation
- Image upload functionality
- List view of all projects with edit/delete options

### 2. Public Projects Display
- Dynamic loading of projects from API
- Responsive grid layout (1-4 columns based on screen size)
- Automatic fallback to placeholder images when no image is provided
- Loading states and error handling

### 3. Responsive Design
- Mobile-first approach
- Grid adapts from 1 column (mobile) to 4 columns (desktop)
- Touch-friendly buttons and interactions
- Optimized spacing and typography for all devices

## Environment Variables

Make sure these environment variables are set:

### Backend (.env)
```
PORT=8001
MONGODB_URI=your_mongodb_connection_string
BACKEND_URL=http://localhost:8001
```

### Frontend (.env.local)
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8001
BACKEND_URL=http://localhost:8001
```

## Usage Instructions

### For Admin Users

1. **Login to Admin Panel**
   - Navigate to `/admin`
   - Use your admin credentials

2. **Add New Project**
   - Click "Add New Project" button
   - Fill in all required fields (name, price, location, description)
   - Optionally upload an image
   - Click "Create Project"

3. **Edit Existing Project**
   - Click "Edit" button on any project
   - Modify the fields as needed
   - Click "Update Project"

4. **Delete Project**
   - Click "Delete" button on any project
   - Confirm deletion

5. **Add Image to Project**
   - For projects without images, click "Add Image"
   - Select an image file
   - Click "Upload"

### For Visitors

- Projects are automatically displayed on the main page
- No additional setup required
- Images load automatically or show placeholder if none provided

## Technical Details

### Image Handling
- If no image is provided, a SVG placeholder is displayed
- Images are stored with unique filenames to prevent conflicts
- Old images are automatically deleted when replaced

### Responsive Breakpoints
- `sm`: 640px+ (2 columns)
- `lg`: 1024px+ (3 columns)
- `xl`: 1280px+ (4 columns)

### State Management
- Uses React hooks for local state
- Automatic refresh after CRUD operations
- Loading and error states for better UX

## Troubleshooting

### Common Issues

1. **Images not loading**
   - Check if backend is running
   - Verify file permissions on uploads directory
   - Check browser console for CORS errors

2. **Projects not displaying**
   - Verify API endpoints are working
   - Check MongoDB connection
   - Ensure environment variables are set correctly

3. **Upload failures**
   - Check file size (max 5MB)
   - Verify file format (PNG, JPG, JPEG only)
   - Check uploads directory permissions

### Performance Tips

- Images are optimized for web display
- Lazy loading can be implemented for better performance
- Consider implementing pagination for large numbers of projects

## Future Enhancements

- Project categories and filtering
- Advanced search functionality
- Project status tracking
- Bulk import/export
- Image optimization and compression
- SEO-friendly URLs for projects
