# **Clinic Tracker Lab**

### A Simple Web App to Manage Doctors and Their Appointments

## Objective

Build a clinic management system that allows staff to manage doctors and the appointments patients make with them.

In this lab, you'll:

* Define two Mongoose models with a reference relationship (Doctor ⟶ Appointments)
* Implement full CRUD operations for appointments
* Implement Create and Read for doctors
* Embed a `notes` subdocument in the Appointment schema
* Use EJS to display the data dynamically

---

## Requirements

### Step 1: Set Up Your Project

1. Create a new Node.js + Express app.
2. Set up your application using our starter document for MERN stack applications: [Link](https://docs.google.com/document/d/1czHoq4TQl0Ww6uAZqEA5kuc3owU5chLGUIvBcHDCFWs/edit?usp=sharing)

---

### Step 2: Create the Mongoose Models

#### Doctor Model

* Fields:

  * `name` (String)
  * `specialty` (String)
  * `yearsOfExperience` (Number)
* One doctor can have **many appointments**
* No embedded fields here

#### Appointment Model

* Fields:

  * `patientName` (String)
  * `date` (Date)
  * `reason` (String)
  * `doctor` (ObjectId ref to Doctor)
  * `notes` (Array of embedded subdocuments)

#### Embedded Notes Subdocument (Bonus)

Each note should have:

* `content` (String)
* `createdAt` (Date, default to now)

---

### Step 3: Build Your Routes

#### Doctors (`/doctors`)

* ✅ `GET /doctors` — list all doctors
* ✅ `GET /doctors/new` — form to add a new doctor
* ✅ `POST /doctors` — create a new doctor
* ✅ `GET /doctors/:id` — show doctor details with all their appointments (populate!)

> Only implement **Create** and **Read** for doctors.

---

#### Appointments (`/appointments`)

* ✅ `GET /appointments` — list all appointments
* ✅ `GET /appointments/new` — form to create new appointment (choose doctor from dropdown)
* ✅ `POST /appointments` — create new appointment
* ✅ `GET /appointments/:id` — show details of one appointment, including its notes
* ✅ `GET /appointments/:id/edit` — form to edit appointment
* ✅ `PUT /appointments/:id` — update appointment
* ✅ `DELETE /appointments/:id` — delete appointment

---

### Step 4: Implement Notes Functionality

* ✅ Allow users to add notes to an appointment
* ✅ Display all notes for an appointment
* ✅ (Optional) Allow deleting individual notes

Think of it as a doctor’s private notes about the visit.

---

## Tips

* Use `populate()` to link appointments with doctor info.
* Use `method-override` to handle PUT and DELETE in forms.
* Format dates in EJS using `toLocaleDateString()` or any formatting library.
* Make dropdowns or selects for choosing doctors when creating appointments.
* Keep your EJS views modular by using partials (e.g., `partials/header.ejs`, `partials/navbar.ejs`).
* Use basic styling with Bootstrap or Tailwind if you want to improve the UI.

---
