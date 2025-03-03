# Hackabyte Website

A modern, responsive website for Hackabyte - a student-led hackathon and coding education organization.

## Project Setup

Follow these steps to set up and run the project:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/hackabyte-website.git
cd hackabyte-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create folder structure for images

Create the following folder structure in the `public` directory:

```
public/
└── images/
    ├── logo.png                  # The Hackabyte logo
    ├── bg-particles.jpg          # Dark background with particles
    ├── organizers/               # Board members & volunteers
    │   ├── bhanu.jpg
    │   ├── suraj.jpg
    │   ├── gagan.jpg
    │   └── ...
    ├── team-luma/                # LUMA team members
    │   ├── ekansh.jpg
    │   ├── jash.jpg
    │   └── ...
    ├── sponsors/
    │   ├── anaghas-math.png
    │   ├── desmos.png
    │   └── ...
    ├── past-events/
    │   ├── spring-2024.jpg
    │   ├── winter-2024.jpg
    │   └── ...
    ├── event-pictures/
    │   ├── digipen.jpg
    │   ├── coding1.jpg
    │   └── ...
    └── social/                   # Social media icons
        ├── instagram.svg
        ├── discord.svg
        ├── facebook.svg
        └── ...
```

### 4. Add your images

Add all your images to the appropriate folders in the public directory. Make sure the image paths in the data files match your actual image paths.

### 5. Run the development server

```bash
npm start
```

The website should now be running at [http://localhost:3000](http://localhost:3000).

## Project Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Top-level page components
- `src/data/` - Data files for the website content
- `public/images/` - Images used throughout the website

## Deployment

To build the project for production:

```bash
npm run build
```

This will create a `build` directory with the compiled assets. You can then deploy this to your preferred hosting service.

## Technologies Used

- React.js
- React Router
- Tailwind CSS