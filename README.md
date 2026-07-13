# Sneaker Drop Backend

A backend API for a limited-edition sneaker drop system built with **Node.js**, **Express.js**, **PostgreSQL (NeonDB)**, **Prisma ORM**, and **Socket.IO**.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL (NeonDB)
- Prisma ORM
- Socket.IO
- Firebase Authentication (Client-side)
- Vercel

---

# Features

- View all sneaker items
- Create sneaker drops
- Reserve an item for 60 seconds
- Purchase reserved items
- Real-time stock synchronization using Socket.IO
- Transaction-safe reservation and purchase flow

---

# Project Setup

## 1. Clone the repository

```bash
git clone https://github.com/smbmunna/sneakerdrop-tz-server.git
cd sneakerdrop-tz-server
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Create Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000
DATABASE_URL=your_neon_postgresql_connection_string
```

Example:

```env
DATABASE_URL=postgresql://username:password@host/database?sslmode=require
```

---

## 4. Generate Prisma Client

```bash
npx prisma generate
```

---

## 5. Database Schema Setup

Push the Prisma schema to the PostgreSQL database.

```bash
npx prisma db push
```

If using an existing database, generate the Prisma schema using:

```bash
npx prisma db pull
```

(Optional)

View the database using Prisma Studio.

```bash
npx prisma studio
```

---

## 6. Run the server

Development

```bash
npm run dev
```

Production

```bash
npm start
```

The server will run on

```
http://localhost:5000
```

---

# API Endpoints

## Items

```
GET /api/items
```

Returns all sneaker items.

---

## Drops

```
GET /api/drops
POST /api/drops
```

---

## Reservations

```
POST /api/reservations/:itemCode
```

Reserves an item for 60 seconds.

Request Body

```json
{
  "userId": "user@example.com"
}
```

---

## Purchases

```
POST /api/purchases/:itemCode
```

Purchases an active reservation.

Request Body

```json
{
  "userId": "user@example.com"
}
```

---

# Architecture Choice

## 60-Second Reservation Expiration

When a user reserves an item:

1. A database transaction is started.
2. The selected item row is locked using `SELECT ... FOR UPDATE`.
3. Stock is decremented atomically.
4. A reservation record is created with:
   - `status = ACTIVE`
   - `expires_at = current_time + 60 seconds`
5. The transaction is committed.

During purchase:

- The reservation is validated.
- The reservation must belong to the current user.
- The reservation must still have `status = ACTIVE`.
- The current time must be earlier than `expires_at`.

If the reservation has expired, the purchase is rejected.

This approach avoids relying on in-memory timers and keeps the reservation logic persistent and reliable.

---

# Concurrency Handling

To prevent multiple users from reserving the last available item, database transactions and row-level locking are used.

During reservation:

- A transaction begins.
- The requested item row is locked using:

```sql
SELECT ...
FOR UPDATE
```

- While the row is locked, no other transaction can modify the same item's stock.
- Stock is checked.
- If stock is available, it is decremented.
- The reservation is created.
- The transaction commits.

This guarantees that only one user can successfully reserve the last available item.

During purchase:

- The system checks for an active reservation belonging to the requesting user.
- Reservation status is updated atomically from `ACTIVE` to `PURCHASED`.
- Purchase count is incremented.
- A purchase record is created inside the same transaction.

This prevents duplicate purchases and ensures data consistency.

---

# Real-Time Updates

Socket.IO is used to synchronize inventory across connected clients.

When a reservation is successfully created:

- The server emits a `reservationCreated` event.
- Connected clients receive the event.
- The frontend refreshes the item list.
- Updated stock is displayed immediately without requiring a manual page refresh.

---

# Repository

Client

https://github.com/smbmunna/sneakerdrop-tz-client

Server

https://github.com/smbmunna/sneakerdrop-tz-server

---

# Author

Mahmud Munna