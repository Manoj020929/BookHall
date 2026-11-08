# 📚 BookHall – Online Book Library

A full-stack book library web app. Admins add and manage books and their pages; readers sign up, browse the catalog and read books page by page.

**Live demo:** https://book-hall-xi.vercel.app

## Features
- JWT authentication (register, login, token refresh)
- Role-based access: admins can add, edit and delete books; readers can only browse and read
- Book catalog with search, category filter and pagination
- Page-by-page reader with Next / Previous navigation
- Django admin panel for managing books, pages and users
- Responsive UI

## Tech stack
| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router, Axios |
| Backend | Django, Django REST Framework, SimpleJWT |
| Database | MySQL (Django ORM) |
| Hosting | Vercel (frontend), Render (backend), Aiven (MySQL) |

## Project structure
```
BookHall/
├── BookHall/          # Django backend
│   ├── config/        # settings, root URLs
│   └── library/       # models, serializers, views, permissions
└── frontend/          # React app
    └── src/           # pages, AuthContext, API client
```

## API endpoints
| Method | URL | Access |
|---|---|---|
| POST | `/api/auth/register/` | Public |
| POST | `/api/auth/login/` | Public |
| POST | `/api/auth/refresh/` | Public |
| GET | `/api/books/` (`?search=`, `?category=`, `?page=`) | Logged-in users |
| GET | `/api/books/<id>/` (includes pages) | Logged-in users |
| POST / PUT / DELETE | `/api/books/` ... | Admin only |
| GET | `/api/categories/` | Logged-in users |

## Run locally

### Backend
```bash
cd BookHall
python -m venv venv
venv\Scripts\activate          # Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
```
Create a `.env` file next to `manage.py`:
```
DB_NAME=bookhall
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=127.0.0.1
DB_PORT=3306
DJANGO_DEBUG=1
```
Create the database `bookhall` in MySQL, then:
```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173. The API URL defaults to `http://127.0.0.1:8000/api`; set `VITE_API_URL` to change it.

## Deployment
- **Frontend:** Vercel, root directory `frontend`, env var `VITE_API_URL`
- **Backend:** Render web service, env vars for the database, `ALLOWED_HOSTS`, `CORS_ORIGINS`, `CSRF_TRUSTED_ORIGINS` and `DJANGO_SECRET_KEY`
- **Database:** Aiven MySQL

## Author
Manoj

<img width="1360" height="768" alt="image" src="https://github.com/user-attachments/assets/42062766-98d1-455d-953f-05c447c207bb" />

<img width="1360" height="768" alt="image" src="https://github.com/user-attachments/assets/3f294783-e767-4dd6-9da6-dc4e5928a907" />

<img width="1360" height="768" alt="image" src="https://github.com/user-attachments/assets/b5220ee6-f2a9-4543-a356-4c57a1b7b506" />













