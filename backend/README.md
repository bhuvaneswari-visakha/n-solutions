# NSolutions Solar Backend

Backend-only API for the NSolutions Solar admin panel. The current phase implements admin registration, admin login, JWT authentication, authenticated lead management, and dashboard read APIs. No public-user authentication is included.

## Architecture

- `src/config`: environment, MongoDB, and future dashboard model registration.
- `src/models`: the `Admin` and `Lead` Mongoose models.
- `src/controllers`: request/response orchestration only.
- `src/services`: authentication and dashboard business logic.
- `src/routes`: the public auth routes and protected dashboard/lead routes.
- `src/middleware`: JWT authorization and global error handling.
- `src/utils`: JWT signing, validation, async route handling, and response formatting.

Dashboard services currently return zero counts and empty lists when the future Lead, Enquiry, Product, Project, or Position models have not been registered. A future module can call `registerDashboardModels({ Lead, Enquiry, Product, Project, Position })` during startup. The existing dashboard routes then use `countDocuments`, sorted `find`, field projections, `lean`, and bounded limits without needing route changes.

## Requirements

- Node.js 20 or newer
- MongoDB running locally or a reachable MongoDB deployment

## Setup

```bash
cd backend
npm install
copy .env.example .env
```

Edit `.env` and set a long random `JWT_SECRET` and a reachable `MONGODB_URI`. On macOS/Linux, use `cp .env.example .env` instead of `copy`.

The default `ADMIN_REGISTRATION_MODE=bootstrap` permits the first admin registration only. After an admin exists, registration returns `403` unless the caller also supplies `X-Admin-Registration-Key` matching `ADMIN_REGISTRATION_KEY`. For a production deployment, use `ADMIN_REGISTRATION_MODE=disabled` after provisioning, or use `key` with a strong secret managed outside source control.

## Run

```bash
npm run dev
```

For a normal process:

```bash
npm start
```

The API listens on `http://localhost:5000` by default. MongoDB connection failure stops startup and is logged clearly.

## Environment Variables

| Variable | Purpose |
| --- | --- |
| `PORT` | HTTP port, default `5000` |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | JWT signing secret, minimum 32 characters |
| `JWT_EXPIRES_IN` | JWT duration accepted by `jsonwebtoken`, default `7d` |
| `NODE_ENV` | Runtime environment |
| `CORS_ORIGIN` | Comma-separated allowed origins; `*` is supported for local development |
| `ADMIN_REGISTRATION_MODE` | `bootstrap`, `key`, or `disabled` |
| `ADMIN_REGISTRATION_KEY` | Secret required by `key` mode or to reopen bootstrap registration |
| `UPLOAD_DIR` | Local upload root; defaults to `backend/uploads` (relative paths resolve from `backend/`) |
| `DASHBOARD_DEFAULT_LIMIT` | Default recent-list size, default `10` |
| `DASHBOARD_MAX_LIMIT` | Maximum recent-list size, default `50` |

## Local Upload Storage

Uploads use Multer `diskStorage` and are staged under `UPLOAD_DIR/.staging` before being moved to their final location. By default, public images and videos are stored in `backend/uploads/public/<category>/`; resumes are stored in `backend/uploads/private/resumes/`. Each filename is generated uniquely. Express serves only the public tree under `/uploads/public/`; private resume files are streamed only from `GET /api/job-applications/:id/resume/download` after admin authentication. The private directory is never mounted as static content.

The API accepts JPEG, PNG, WebP, and GIF images (10 MB per image), MP4/MOV/WebM videos (80 MB), and PDF/DOC/DOCX resumes (5 MB). Project image batches are capped at 80 MB total; video and thumbnail batches at 90 MB total. MIME type, extension, and file signature are checked. Temporary staging files are cleaned up after each response and stale files older than 24 hours are removed at backend startup.

This setup is intended for local development. Files live on the backend host's filesystem and are not automatically shared with other instances.

Render deployment:

Render's normal service filesystem is ephemeral. To retain uploaded files across redeployments and restarts, provision a Render Persistent Disk and mount it at the backend upload directory, then set `UPLOAD_DIR` to that mount path. Without this disk configuration, local uploads can be lost. Production persistence on Render has not been verified by this project.

For a separately hosted frontend, set `VITE_API_BASE_URL` to the backend `/api` URL at build time. Local Vite development uses `VITE_PROXY_TARGET` (default `http://localhost:5000`) to proxy both API and uploaded-media paths.

### Existing asset migration

Existing records can continue to reference their legacy URLs until migrated. To copy legacy Cloudinary-hosted assets into local storage, back up MongoDB, set `UPLOAD_DIR` to the intended backend upload directory, and run:

```bash
cd backend
npm run migrate:media
```

The default is a read-only dry run. Apply after reviewing the identified record counts:

```bash
npm run migrate:media -- --apply
```

The default is a read-only dry run. Applying downloads eligible old assets, validates and writes them into local public/private folders, verifies byte lengths, and updates MongoDB only after storage succeeds. Failed downloads or writes leave the record unchanged and are reported; the source asset is not deleted. The migration is optional; ensure the destination disk has sufficient space and remains available while migrating.

## API Endpoints

### `POST /api/auth/register`

Creates an admin during the allowed registration window. In bootstrap mode, the first admin does not need a registration header.

Request:

```json
{
  "name": "Admin",
  "email": "admin@nsolutions.com",
  "password": "StrongPassword123"
}
```

Successful response (`201`):

```json
{
  "success": true,
  "message": "Admin registered successfully.",
  "data": {
    "admin": {
      "id": "665000000000000000000001",
      "name": "Admin",
      "email": "admin@nsolutions.com",
      "role": "admin"
    }
  }
}
```

When a registration key is required, add `X-Admin-Registration-Key: <ADMIN_REGISTRATION_KEY>`.

### `POST /api/auth/login`

Request:

```json
{
  "email": "admin@nsolutions.com",
  "password": "StrongPassword123"
}
```

Successful response (`200`):

```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "admin": {
      "id": "665000000000000000000001",
      "name": "Admin",
      "email": "admin@nsolutions.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### `POST /api/auth/logout`

Requires `Authorization: Bearer <token returned by login>`. The API uses stateless JWT authentication, so the client should remove the stored token after receiving the successful response.

Successful response (`200`):

```json
{
  "success": true,
  "message": "Logout successful."
}
```

### Lead routes

All lead routes require `Authorization: Bearer <token returned by login>`.

`POST /api/leads` creates a lead:

```json
{
  "name": "Rahul Kumar",
  "company": "ABC Industries",
  "type": "industrial",
  "location": "Visakhapatnam",
  "status": "new"
}
```

`GET /api/leads` lists leads newest first.

`GET /api/leads/:id` returns one lead. Invalid IDs return `400`; missing leads return `404`.

`PUT /api/leads/:id` updates only the lead status:

```json
{
  "status": "qualified"
}
```

`DELETE /api/leads/:id` deletes one lead and returns a success message.

Lead types are `residential`, `commercial`, `industrial`, and `other`. Lead statuses are `new`, `in_progress`, and `qualified`; new leads default to `new`. `createdAt` and `updatedAt` are managed by Mongoose.

### Project routes

All project routes require `Authorization: Bearer <token returned by login>`.

`POST /api/projects` accepts `multipart/form-data` with these fields: `title`, `category`, `location`, `description`, `services`, `status`, and image fields named `images` (up to 20) or `image`. `services` may be a JSON array string such as `["Solar Installation","System Design"]`. Uploaded images are saved on local disk; MongoDB retains the image `url` and `publicId` asset fields.

`GET /api/projects` lists all projects newest first.

`GET /api/projects/:id` returns one project. Invalid IDs return `400`; missing projects return `404`.

`PATCH /api/projects/:id/status` updates only the status:

```json
{
  "status": "completed"
}
```

Allowed project categories are `residential`, `commercial`, and `industrial`. Allowed statuses are `completed` and `in_progress`; new projects default to `in_progress`.

`DELETE /api/projects/:id` removes the project and its local image files.

The dashboard `activeProjects` value counts projects whose status is `in_progress`.

### Job application routes

`POST /api/job-applications` is public and accepts a resume upload with the applicant details.

`GET /api/job-applications` requires `Authorization: Bearer <token returned by login>` and returns all submitted applications newest first, including applicant details, application status, job title, and the resume URL.

`GET /api/job-applications/:id/resume/download` requires an authenticated admin token and streams the private file; legacy external resumes must be migrated into `UPLOAD_DIR/private/resumes/` before they can be downloaded through the admin UI.

### Testimonial routes

`GET /api/testimonials` is public and returns testimonials newest first.

`GET /api/testimonials/admin` requires `Authorization: Bearer <token returned by login>` and returns testimonials newest first, including `createdAt` and `updatedAt` for admin management.

### Protected dashboard routes

All dashboard requests require:

```text
Authorization: Bearer <token returned by login>
```

`GET /api/dashboard/stats`

```json
{
  "success": true,
  "message": "Dashboard statistics fetched successfully.",
  "data": {
    "totalLeads": 0,
    "activeProjects": 0,
    "productsListed": 0,
    "openPositions": 0
  }
}
```

`GET /api/dashboard/recent-enquiries?limit=10`

```json
{
  "success": true,
  "message": "Recent enquiries fetched successfully.",
  "data": []
}
```

`GET /api/dashboard/recent-leads?limit=10`

```json
{
  "success": true,
  "message": "Recent leads fetched successfully.",
  "data": []
}
```

The enquiry projection is `name`, `type`, `status`, and `createdAt`. The lead projection is `name`, `type`, `location`, `status`, and `createdAt`. Results are ordered newest first.

### Testing lead errors

- Without a JWT or with an invalid JWT: `401`.
- With a valid admin JWT: the request is authorized.
- Invalid lead ID: `400`.
- Non-existent lead: `404`.
- Invalid `type`, `status`, empty required fields, or unsupported update fields: `400`.

## Authentication behavior

1. Registration validates input and stores only a bcrypt hash in MongoDB.
2. Login loads the password explicitly because the schema excludes it by default, compares it with bcrypt, and signs a JWT containing `sub`, `email`, and `role`.
3. Dashboard middleware requires `Authorization: Bearer <token>`, verifies the signature and expiration, and only accepts the `admin` role.
4. Missing or invalid/expired tokens return `401`; a valid token with a non-admin role returns `403`.
5. Passwords, registration keys, and tokens are never written to application logs or API responses other than the intended login token response.

## Error responses

Errors use the same base shape:

```json
{
  "success": false,
  "message": "Authentication token is required."
}
```

Validation errors use `details`; duplicate emails return `409`; unknown routes return `404`; internal stack details are omitted in production.
