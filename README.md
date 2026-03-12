# Payment Dashboard – Vendor Payment Viewer

## Author

**Alex Zormelo**

---

# Overview

The **Payment Dashboard – Vendor Payment Viewer** is a **React + TypeScript web application** that allows shop vendors to **view, monitor, and analyze customer payment records**.

The application integrates with the provided **Sales API** to retrieve payment data and display it in a **clean, responsive dashboard interface**.

Users can easily:

* View all payment records
* Filter payments by date
* View payment details in a modal
* Analyze payment totals using summary statistics

The dashboard is designed with a focus on **usability, responsiveness, and maintainable code architecture**.

The project was built using modern frontend tools including **React, TypeScript, Vite, and Tailwind CSS**.

---

# Features

* **Payment Summary Cards**

  * Displays total payments, successful payments, and other key statistics.

* **Payment Table**

  * Displays all payment records retrieved from the API.
  * Supports pagination for easier browsing.

* **Date Filtering**

  * Vendors can filter payments using **start date and end date**.

* **Payment Details Modal**

  * Clicking a payment record opens a modal showing detailed payment information.

* **Responsive UI**

  * Works well on desktop and tablet screen sizes.

---

# Tech Stack

* **React**
* **TypeScript**
* **Vite**
* **Tailwind CSS**
* **Axios** (API requests)

---

# Project Setup

Follow the steps below to run the project locally.

## 1. Clone the Repository

```bash
git clone <repository-url>
```

## 2. Navigate into the Project

```bash
cd payment-dashboard
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Run the Development Server

```bash
npm run dev
```

The application will start on:

```
http://localhost:5173
```

---

# API Integration

The dashboard fetches payment data from the **Sales API** using the following endpoint:

```
GET /api/Payments
```

Optional query parameters:

```
StartDate
EndDate
```

Example request:

```
/api/Payments?StartDate=2024-01-01&EndDate=2024-01-31
```

---

# Known Issues

* **CORS Restrictions**

  The provided Sales API currently has **CORS restrictions**, which may prevent the frontend application from making requests directly from the browser.

  Possible solutions include:

  * Enabling CORS on the API server
  * Using a proxy server
  * Using a backend middleware to forward requests

* **API Availability**

  The dashboard relies on the external Sales API. If the API is unavailable or restricted, payment data will not load.

---

# Future Improvements

* Add **advanced filtering options**
* Add **payment charts and analytics**
* Improve **error handling and loading states**
* Implement **authentication for vendors**

---