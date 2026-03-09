# AGS Web Ecosystem 🏗️

A high-end enterprise platform developed for a construction company. This project provides a dual-purpose solution: a professional **public portfolio** to showcase company projects and a **private administrative dashboard** for internal resource management.

## ✨ Key Features

* **Public Showcase**: Dynamic portfolio displaying completed and ongoing construction projects with a minimalist, professional aesthetic.
* **Admin Panel**: Secure dashboard for managing company-wide data.
* **Project Management**: Full CRUD operations for project tracking and service categorization.
* **Resource Control**: Specialized module for managing employee hours and operational metrics.
* **Security**: Role-based access and secure authentication via interceptors.

## 🏗️ Architecture

Built as a single-page application (SPA) using **Angular**, focusing on modularity and performance:
* **Components**: Reusable UI elements (Navbar, Footer, Container) following a clean design language.
* **Services**: Centralized business logic for handling projects, events, and user authentication.
* **Interceptors**: Global request handling for secure API communication.
* **Guards/Routing**: Structured navigation for public and protected administrative routes.

## 🛠️ Tech Stack

* **Frontend**: Angular (Latest)
* **Styling**: CSS3 (Custom professional layouts & animations)
* **Logic**: TypeScript
* **State Management**: Service-based reactive patterns
* **DevOps**: Optimized for scalable deployment (Vercel/Railway ready)

## 🚀 Setup & Installation

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/444jime/AGS-app.git](https://github.com/444jime/AGS-app.git)
    cd ags-app/AGS-app
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run in development mode**:
    ```bash
    ng serve
    ```
    Open `http://localhost:4200/` to view the application.

---
*Developed by Tania as part of her Associate Degree in Systems Analysis.*
