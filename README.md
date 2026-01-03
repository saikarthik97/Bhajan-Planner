# Premsadan Planner

A beautiful and functional bhajan planning and management system built with modern web technologies.

## 🌟 Features

- **Search by Name**: Quick search for bhajans by name
- **Advanced Filtering**: Filter by deity, beat pattern (6 or 7), and speed
- **Date-based Search**: Find bhajans sung on specific dates
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Admin Panel**: Secure login for administrators
- **Modern UI**: Beautiful gradient design with smooth animations

## 📁 Project Structure

```
premsadan-planner/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet with responsive design
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🚀 Deployment to Netlify

### Method 1: Drag and Drop (Easiest)

1. Go to [Netlify](https://www.netlify.com/)
2. Sign up or log in
3. Drag and drop all project files (index.html, styles.css, script.js) into the Netlify dashboard
4. Your site will be live in seconds!

### Method 2: GitHub Integration (Recommended)

1. Create a new repository on GitHub
2. Upload all project files to the repository
3. Go to [Netlify](https://www.netlify.com/)
4. Click "New site from Git"
5. Connect your GitHub account
6. Select your repository
7. Deploy settings:
   - Build command: (leave empty)
   - Publish directory: `/` (root)
8. Click "Deploy site"

### Method 3: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to project directory
cd premsadan-planner

# Deploy
netlify deploy --prod
```

## 🔧 Configuration

### Custom Domain

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Follow the instructions to configure your DNS

### Environment Variables (For Future Backend Integration)

1. Go to "Site settings" → "Environment variables"
2. Add your API keys or backend URLs

## 💻 Local Development

Simply open `index.html` in your web browser to test locally.

For a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 🎨 Customization

### Colors

Edit `styles.css` to change the color scheme:

```css
/* Main gradients */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Header */
background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
```

### Database

The bhajan data is currently stored in `script.js` as a JavaScript array. For production:

1. Set up a backend API (Node.js, Python, PHP, etc.)
2. Connect to a database (MongoDB, PostgreSQL, MySQL)
3. Update the fetch calls in `script.js`

### Adding More Bhajans

Edit the `bhajansDatabase` array in `script.js`:

```javascript
const bhajansDatabase = [
    {
        id: 1,
        name: "Your Bhajan Name",
        deity: "deity_name",
        beat: 6,
        speed: "medium",
        dateSung: "2024-01-15"
    },
    // Add more bhajans...
];
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔐 Security Notes

**Important**: The current login is for demonstration only. For production:

1. Implement proper backend authentication
2. Use HTTPS (Netlify provides this automatically)
3. Never store passwords in frontend code
4. Use environment variables for sensitive data
5. Implement rate limiting for API calls

## 📝 Future Enhancements

- [ ] Backend API integration
- [ ] Database for storing bhajans
- [ ] User authentication system
- [ ] Add/Edit/Delete functionality for admins
- [ ] Export search results to PDF
- [ ] Audio playback integration
- [ ] Playlist creation
- [ ] Multi-language support
- [ ] Advanced analytics

## 🐛 Troubleshooting

### Site not loading on Netlify

- Check that all files are in the root directory
- Ensure file names are exact (case-sensitive)
- Check browser console for errors

### Styling issues

- Clear browser cache
- Check that `styles.css` is properly linked in `index.html`
- Verify all CSS is valid

### JavaScript not working

- Check browser console for errors
- Ensure `script.js` is properly linked
- Verify JavaScript is enabled in browser

## 📄 License

This project is free to use for personal and commercial purposes.

## 👨‍💻 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Test in a different browser

## 🙏 Credits

Created with ❤️ for Premsadan community

Aum Sri Sai Ram

---

**Note**: This is a frontend-only application. For full functionality including data persistence, you'll need to integrate a backend service.
