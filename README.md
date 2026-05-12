# Venuevista - Installation Guide

Venuevista is a comprehensive venue and event management system designed to streamline bookings, scheduling, and supplier management.

## System Requirements

### Prerequisites
- **Node.js**: v16.0.0 or higher
- **npm**: v7.0.0 or higher
- **MongoDB**: Cloud (MongoDB Atlas) or local installation
- **Email Service**: Gmail account with app-specific password (for notifications)

### Supported Operating Systems
- Windows 10/11
- macOS 10.14+
- Linux (Ubuntu 18.04+)

## Installation Instructions

### Step 1: Install Dependencies

Navigate to the project root and install all dependencies:

```bash
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

### Step 2: Configure Environment Variables

#### Server Configuration

Create `server/.env.production`:

```env
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
PORT=5051
CLIENT_URL=http://localhost:5173
NODE_ENV=production
```

#### Client Configuration

Create `client/.env.production`:

```env
VITE_API_URL=http://localhost:5051
```

### Step 3: Start the Application

#### Start Server

```bash
cd server
npm start
```

The server will run at `http://localhost:5051`

#### Start Client (in a new terminal)

```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Distribution

To build the application for production deployment:

```bash
cd client
npm run build
```

Distribution files will be generated in `client/dist/`

## Deployment

For production deployment instructions, see **[RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)**.

## Troubleshooting

### Port Already in Use
- Server (5051): `lsof -ti:5051 | xargs kill -9` (macOS/Linux) or use Task Manager (Windows)
- Client (5173): `lsof -ti:5173 | xargs kill -9` (macOS/Linux) or use Task Manager (Windows)

### MongoDB Connection Failed
- Verify MongoDB connection string in `server/.env.production`
- Ensure your MongoDB account has network access enabled
- Check firewall settings

### Email Service Not Working
- Verify email credentials in `server/.env.production`
- Use Gmail app-specific password (not your regular password)
- Enable "Less secure apps" if needed

## Support

For additional help, refer to [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) for deployment-specific guidance.

### API Communication
- Use `client/src/utils/api.js` for API calls
- Automatically handles dev/prod URL differences
- Includes authentication headers

## Key Features

- Multi-database MongoDB setup (main, promos, schedules, bookings)
- JWT authentication with MFA support
- Email notifications
- File uploads (reviews, gallery)
- React Big Calendar integration
- Admin, Supplier, and Customer dashboards

## Scripts

### Server Scripts
- `npm start` - Start production server

### Client Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables Reference

### Server Required Variables
| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas base connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `EMAIL_USER` | Email for sending notifications |
| `EMAIL_PASS` | Email app password |
| `PORT` | Server port (default: 5051) |
| `CLIENT_URL` | Frontend URL for CORS |
| `NODE_ENV` | Environment (production/development) |

### Client Required Variables
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL |

## Tech Stack

### Frontend
- React 19
- Vite
- Material-UI
- React Router
- React Big Calendar
- Recharts
- Axios

### Backend
- Node.js
- Express
- MongoDB/Mongoose
- JWT Authentication
- Nodemailer
- Multer (file uploads)
- bcryptjs

## Development Tips

1. **Always start server before client** in development
2. **Check CORS settings** if you get connection errors
3. **Use the api utility** (`utils/api.js`) for consistent API calls
4. **Monitor server logs** for backend errors
5. **Check browser console** for frontend errors

## Troubleshooting

### CORS Errors
- Verify `CLIENT_URL` in server env matches client URL
- Check server is running
- Clear browser cache

### API Connection Issues
- Verify `VITE_API_URL` in client env
- Check network tab in browser DevTools
- Verify server is accessible

### MongoDB Connection Issues
- Check MongoDB Atlas network access
- Verify connection string format
- Ensure IP whitelist includes your IP

### Build Issues
- Clear `node_modules` and reinstall
- Check Node.js version compatibility
- Verify all environment variables are set

## Support

For deployment issues, refer to:
- [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) - Deployment guide
- [Render Documentation](https://render.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)

---

**Note**: Never commit `.env` or `.env.production` files to Git. Use `.env.example` as templates.
