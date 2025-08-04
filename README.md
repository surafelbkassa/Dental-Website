# Dental-Website
Dental Website and dahsbboard 
backend/
├── cmd/
│   └── main.go               # Entry point
├── config/
│   └── config.go             # Env & config loading
├── controllers/              # HTTP handlers
│   └── appointment.go
│   └── patient.go
│   └── auth.go
├── services/                 # Business logic
│   └── appointment_service.go
│   └── patient_service.go
├── models/                   # DB models
│   └── appointment.go
│   └── user.go
├── repositories/             # DB operations
│   └── appointment_repo.go
│   └── user_repo.go
├── middleware/
│   └── auth.go               # JWT, logging
├── utils/
│   └── hash.go               # Helper functions
├── routes/
│   └── routes.go             # Route registration
├── database/
│   ├── migration.sql         # Init schema
│   └── seed.sql              # Sample data
├── go.mod
└── Dockerfile
frontend/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   │   └── Sidebar.tsx
│   │   └── Navbar.tsx
│   ├── features/
│   │   ├── appointments/
│   │   │   ├── AppointmentTable.tsx
│   │   │   └── appointmentSlice.ts
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   └── authSlice.ts
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Patients.tsx
│   ├── services/
│   │   └── api.ts             # Axios instance
│   ├── hooks/
│   │   └── useAuth.ts
│   ├── App.tsx
│   └── main.tsx
├── tailwind.config.js
├── vite.config.ts
├── package.json
└── Dockerfile
infra/
├── docker-compose.yml        # DB + App
├── nginx.conf                # Optional reverse proxy
├── .env                      # Environment variables

