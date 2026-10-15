# Functional & Technical Requirements Document
**Project:** Aplikasi Pengelolaan Data Peserta Sertifikasi (Certification Participant Data Management System)  
**Role:** Junior Web Developer  
**Tech Stack Required:** PHP (Laravel Framework) & MySQL Database  

---

## 1. Technical Stack Specifications

* **Backend Framework:** Laravel (PHP 13.x)
* **Database Management System:** MySQL 8.0+
* **Frontend:** Blade Templating Engine + Tailwind CSS or Bootstrap (using Laravel Vite/Mix)
* **ORM:** Eloquent ORM
* **Version Control / Deliverable:** Complete source code repository with `composer.json` and `.env.example`

---

## 2. Database Schema & Architecture

The MySQL database must contain at least 3 primary tables with proper foreign key relationships:

### A. Table: `users` (Admin Authentication)
* `id` (BIGINT, PK, Auto Increment)
* `name` (VARCHAR)
* `email` (VARCHAR, Unique)
* `password` (VARCHAR, Hashed)
* `timestamps` (`created_at`, `updated_at`)

### B. Table: `certification_schemes` (Data Skema Sertifikasi)
* `id` (BIGINT, PK, Auto Increment)
* `code` (VARCHAR, Unique) — e.g., `JWD-2026`
* `name` (VARCHAR) — e.g., `Junior Web Developer`
* `description` (TEXT, Nullable)
* `timestamps` (`created_at`, `updated_at`)

### C. Table: `participants` (Data Peserta)
* `id` (BIGINT, PK, Auto Increment)
* `certification_scheme_id` (BIGINT, FK referencing `certification_schemes.id`, ON DELETE RESTRICT/CASCADE)
* `nim_nik` (VARCHAR, Unique)
* `full_name` (VARCHAR)
* `email` (VARCHAR)
* `phone_number` (VARCHAR)
* `address` (TEXT, Nullable)
* `status` (ENUM: `'Pending'`, `'Passed'`, `'Failed'`)
* `timestamps` (`created_at`, `updated_at`)

---

## 3. Required Modules & Features

### Module 1: Authentication & Access Control
* **Login System:** Secure login interface built with Laravel Auth (or Laravel Breeze/Fortify).
* **Route Protection:** Use `auth` middleware to restrict access to dashboard and CRUD endpoints.
* **Logout Functionality:** Session invalidation and secure redirect to the login page.

### Module 2: Dashboard
* Summary metrics showing total participants, total certification schemes, and participant pass/fail rates.
* Navigation bar/sidebar linking to all modules.

### Module 3: Certification Scheme Management (CRUD Skema)
* **List View:** Table displaying all schemes with pagination.
* **Create:** Form to add a new certification scheme.
* **Edit/Update:** Form to modify scheme details.
* **Delete:** Soft/hard deletion with confirmation prompt.

### Module 4: Participant Management (CRUD Peserta + Search & Details)
* **List View:** Paginated data table showing participant name, NIK/NIM, scheme, and status.
* **Search & Filter:** Search bar querying by name or NIK/NIM; filter by certification scheme.
* **Create:** Form to register a participant linked via dropdown selection to `certification_schemes`.
* **Detail View:** Separate page or modal displaying complete participant information and associated scheme details.
* **Edit/Update:** Form to modify participant data.
* **Delete:** Secure deletion with confirmation modal.

---

## 4. Coding Standards, Validation & Error Handling

### A. Validation Rules (Laravel Form Requests / Controller Validation)
* **Participant Input:**
  * `full_name`: `required|string|max:255`
  * `nim_nik`: `required|string|unique:participants,nim_nik`
  * `email`: `required|email`
  * `certification_scheme_id`: `required|exists:certification_schemes,id`
* **Feedback:** User-friendly error messages rendered on validation failures.

### B. Best Practices & Guidelines
* **MVC Pattern:** Keep business logic inside Controllers/Services and presentation inside Blade views.
* **Eloquent Relationships:** Define `belongsTo` on `Participant` and `hasMany` on `CertificationScheme`.
* **Database Migrations & Seeders:** Include migration files for all tables and database seeders containing dummy demo data.
* **Security:** Use CSRF protection (`@csrf`), password hashing (`Hash::make`), and SQL injection protection via Eloquent parameter binding.

---

## 5. Testing Scenarios & Demonstration Checklist

| Test # | Feature | Test Case Scenario | Expected Result |
| :--- | :--- | :--- | :--- |
| 1 | **Auth** | Login with valid credentials | Redirected to Dashboard |
| 2 | **Auth** | Login with wrong password | Access denied; error message displayed |
| 3 | **Scheme CRUD** | Create, edit, and delete certification scheme | MySQL database reflects changes |
| 4 | **Participant CRUD** | Register participant with valid scheme selection | Data saved and linked correctly via FK |
| 5 | **Validation** | Submit participant form with empty required fields | Form halts; inline validation messages shown |
| 6 | **Search** | Enter participant name in search bar | Filtered results returned from database query |
| 7 | **Details** | Click "Detail" on a participant row | Displays full participant profile + linked scheme name |

---

## 6. Required File Deliverables Checklist

- [ ] **01 SOURCE CODE/**
  - [ ] Complete Laravel project codebase (`.zip`)
  - [ ] `.env.example` configured for MySQL (sensitive values removed)
  - [ ] Database migration files (`database/migrations/`)
  - [ ] MySQL database dump (`.sql` file) or Database Seeders (`DatabaseSeeder.php`)
  - [ ] `README.md` with setup instructions (`composer install`, `php artisan migrate`, etc.)
- [ ] **02 SCREENSHOTS/**
  - [ ] Screenshots of Login, Dashboard, Scheme CRUD, Participant CRUD, Search, Details, Database Structure, and Code Snippets.
- [ ] **03 REPORT/**
  - [ ] `Laporan [Nama Peserta] JWD.pdf` containing application details, ERD diagram, stack specs, and test results.