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
test -f .env || cp .env.example .env
```

In PowerShell, use `if (!(Test-Path .env)) { Copy-Item .env.example .env }` instead. These commands preserve an existing `.env` and its credentials.

The example config connects to a local MongoDB server at `mongodb://127.0.0.1:27017/nsolutions`. Start MongoDB Community Server on this computer, then connect MongoDB Compass to the same URI to browse the `nsolutions` database. Compass is the GUI client; the backend connects directly to MongoDB.

Edit `.env` and set a long random `JWT_SECRET` (at least 32 characters) and a private `ADMIN_REGISTRATION_KEY`. Keep `.env` out of Git.

The default `ADMIN_REGISTRATION_MODE=bootstrap` permits the first admin registration only. After an admin exists, registration returns `403` unless the caller also supplies `X-Admin-Registration-Key` matching `ADMIN_REGISTRATION_KEY`. For a production deployment, use `ADMIN_REGISTRATION_MODE=disabled` after provisioning, or use `key` with a strong secret managed outside source control.

## Local MongoDB and Compass

1. Install and start MongoDB Community Server locally. MongoDB Compass alone is not a database server.
2. In Compass, connect to `mongodb://127.0.0.1:27017` (or use the full database URI `mongodb://127.0.0.1:27017/nsolutions`).
3. Start the backend with the example `MONGODB_URI`. MongoDB creates the `nsolutions` database and collections when the application first writes data; Mongoose creates schema indexes as models initialize.
4. Existing online data is not copied automatically. Back it up/export it first and restore into a separate local database as described below. Do not use a `--drop` restore option.

### Copy existing online records to local MongoDB

Install MongoDB Database Tools, then take a dump from the current online URI. Keep the URI private and substitute it locally; do not put real credentials in documentation or commit them:

```bash
mongodump --uri="<EXISTING_ONLINE_MONGODB_URI>" --out="./mongo-backup"
```

Restore that dump under the local `nsolutions` database:

```bash
mongorestore --uri="mongodb://127.0.0.1:27017/nsolutions" --nsFrom="<SOURCE_DATABASE>.*" --nsTo="nsolutions.*" "./mongo-backup/<SOURCE_DATABASE>"
```

Replace `<SOURCE_DATABASE>` with the database name in the online URI/dump. Restore into a fresh or empty local database. `mongorestore` does not remove collections unless `--drop` is supplied; if matching `_id` values already exist, the restore can report duplicate-key errors and will not replace those records. Compass also supports exporting/importing individual collections, but `mongodump`/`mongorestore` better preserves BSON types and indexes. Do not delete the source database or backup as part of this process.

Database dumps contain records, not uploaded files. Copy corresponding existing local upload files separately while preserving their relative locations and filenames under `backend/uploads/`. For URLs pointing to a third-party media host, download and migrate the files separately; restoring database records alone does not bring those files local. Keep private resumes private.

## Run

```bash
npm run dev
```

For a normal process:

```bash
npm start
```

The API listens on `http://localhost:5000` by default. MongoDB connection failure stops startup and is logged clearly.

## Run the full project locally

First install MongoDB Community Server and start its service. In Compass, connect to `mongodb://127.0.0.1:27017`. From the repository root, open two terminals.

Backend terminal (PowerShell):

```powershell
cd backend
npm install
if (!(Test-Path .env)) { Copy-Item .env.example .env }
```

Edit `backend/.env`: keep the local `MONGODB_URI`, set a random `JWT_SECRET` of at least 32 characters, and set `ADMIN_REGISTRATION_KEY` to a private value. Then run:

```powershell
npm run dev
```

Frontend terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. Vite proxies API and `/uploads` requests to `http://localhost:5000`; override this with `VITE_PROXY_TARGET` in `frontend/.env.local` if needed. Run `npm start` from `backend` instead of `npm run dev` for the non-watch backend process.

## Environment Variables

| Variable | Purpose |
| --- | --- |
| `PORT` | HTTP port, default `5000` |
| `MONGODB_URI` | MongoDB connection string; local default: `mongodb://127.0.0.1:27017/nsolutions`. Production must use a MongoDB service reachable by the backend host. |
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

This setup is intended for local development. Files live on the backend host's filesystem and are not automatically shared with other instances. MongoDB Compass stores and manages database records; it does not store uploaded image, video, or resume files.

Render deployment:

Render's normal service filesystem is ephemeral. To retain uploaded files across redeployments and restarts, provision a Render Persistent Disk and mount it at the backend upload directory, then set `UPLOAD_DIR` to that mount path. Without this disk configuration, local uploads can be lost. Production persistence on Render has not been verified by this project.

For a separately hosted frontend, set `VITE_API_BASE_URL` to the backend `/api` URL at build time. Local Vite development uses `VITE_PROXY_TARGET` (default `http://localhost:5000`) to proxy both API and uploaded-media paths.

## Production database

The backend requires a reachable MongoDB database at startup and exits if the connection fails. The local URI `mongodb://127.0.0.1:27017/nsolutions` refers to the machine running the backend. On Render, `127.0.0.1` refers to the Render service itself, not your computer; changing Render's `MONGODB_URI` to the local URI will break backend startup and database-backed live features. Keep the existing production database URI configured in Render until a replacement production database is provisioned and migrated. Do not expose a personal computer's MongoDB server to the public internet to make it reachable. Local development settings in `backend/.env` do not change Render's environment variables.

## API Endpoints

### `POST /api/auth/register`

Creates an admin during the allowed registration window. In bootstrap mode, the first admin does not need a registration header.

Request:

```json
{
  "name": "Admin",
  "email": "admin@nsolutions.com",
  "password": "StrongPassword123!"
}
```

Admin passwords must be 12-72 characters and include an uppercase letter, a lowercase letter, a number, and a special character. The same rule applies when an admin changes their password.

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
  "password": "StrongPassword123!"
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
