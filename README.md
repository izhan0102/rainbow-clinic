# Rainbow Clinic Website

A beautiful website for Rainbow Clinic, a child care center providing specialized mental health services.

## Firebase Setup

This website uses Firebase for the following services:
- Firebase Hosting (for deployment)
- Firebase Realtime Database (for dynamic content)
- Firebase Analytics (for visitor tracking)

## Deployment Instructions

### Prerequisites
1. Install Node.js if you haven't already: [https://nodejs.org/](https://nodejs.org/)
2. Install Firebase CLI globally:
   ```
   npm install -g firebase-tools
   ```
3. Log in to Firebase:
   ```
   firebase login
   ```

### Deploy to Firebase Hosting

#### Option 1: Using the Script (Windows)
1. Run the PowerShell script:
   ```
   .\deploy.ps1
   ```

#### Option 2: Manual Deployment
1. Make sure you're logged in to Firebase:
   ```
   firebase login
   ```
2. Deploy to hosting:
   ```
   firebase deploy --only hosting
   ```

### After Deployment
Your website will be available at:
- [https://rainbow-clinic.web.app](https://rainbow-clinic.web.app)
- [https://rainbow-3f023.firebaseapp.com](https://rainbow-3f023.firebaseapp.com)

## Realtime Database Structure

For dynamic content, use the following structure in your Firebase Realtime Database:

```
rainbow-3f023-default-rtdb
├── services
│   ├── service1
│   │   ├── title: "Behavioral Therapy"
│   │   ├── description: "We help children develop positive behaviors..."
│   │   └── icon: "fas fa-brain"
│   ├── service2
│   │   ├── title: "Talk Therapy"
│   │   └── ...
│   └── ...
├── gallery
│   ├── image1
│   │   ├── imageUrl: "https://example.com/image1.jpg"
│   │   └── caption: "Description of image 1"
│   ├── image2
│   │   ├── imageUrl: "https://example.com/image2.jpg" 
│   │   └── caption: "Description of image 2"
│   └── ...
├── team
│   ├── director
│   │   ├── name: "Dr. Sarah Johnson"
│   │   ├── title: "Clinic Director & Child Psychologist"
│   │   ├── imageUrl: "https://example.com/director.jpg"
│   │   ├── bio: "Dr. Johnson has over 15 years of experience..."
│   │   ├── education: "Ph.D. in Clinical Psychology from Stanford University..."
│   │   └── credentials: [
│   │       {
│   │           "icon": "fas fa-graduation-cap",
│   │           "text": "Ph.D. in Clinical Psychology"
│   │       },
│   │       {
│   │           "icon": "fas fa-certificate",
│   │           "text": "Board Certified in Child Psychology"
│   │       },
│   │       {
│   │           "icon": "fas fa-award",
│   │           "text": "15+ Years Experience"
│   │       }
│   │   ]
│   ├── members
│   │   ├── member1
│   │   │   ├── name: "Dr. Michael Brown"
│   │   │   ├── title: "Child Therapist"
│   │   │   ├── imageUrl: "https://example.com/member1.jpg"
│   │   │   └── description: "Specializes in behavioral therapy and ADHD management..."
│   │   ├── member2
│   │   │   ├── name: "Jennifer Martinez, LMFT"
│   │   │   ├── title: "Family Therapist"
│   │   │   ├── imageUrl: "https://example.com/member2.jpg"
│   │   │   └── description: "Experienced in family dynamics and parent-child relationship building..."
│   │   └── ...
│   └── ...
├── testimonials
│   ├── testimonial1
│   │   ├── name: "Parent Name"
│   │   ├── text: "Testimonial content..."
│   │   └── title: "Parent of Child, Age"
│   └── ...
└── ...
```

**Notes**:
- If no gallery images are added to the database, the website will automatically display beautiful placeholder images from Unsplash.
- The team section displays default profiles if no data is provided in the database.
- For Font Awesome icons in credentials, use the complete class name (e.g., "fas fa-certificate").

## Local Development

To run the site locally, simply open `index.html` in your browser.

## Customization

Most content can be edited directly in the HTML files. For dynamic content, update the Firebase Realtime Database. 