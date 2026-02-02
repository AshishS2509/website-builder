# Project README — Local Setup & Usage Guide

## 1. Project Overview

This project is a web application that allows users to register, receive a unique **slug**, edit a webpage using that slug, and view the published result.

**High-level flow:**

1. Start the application locally.
2. A registration page is shown by default.
3. Submit the registration form.
4. A **slug** is returned in an alert box.
5. Copy the slug and add it to the `.env` file.
6. Restart the app.
7. Use `/editor` to edit the webpage.
8. Use `/` (root route) to view the final webpage.

In short:  
**Register → get slug → save slug → edit → view.**

---

## 2. Prerequisites

Make sure you have the following installed:

- **Node.js** (v16+ recommended)
- **npm**
- **Docker** (required by the project, especially for containerized setups)

Check versions:
```bash
node -v
npm -v
docker --version
