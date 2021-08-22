# Angular Application - Shared Trips

## 🛠 Libraries and tools used
- [Angular](https://angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [NGRX](https://ngrx.io/guide/store)
- [Cloudinary](https://cloudinary.com/)
- [Rxjs](https://rxjs.dev/guide/overview)
- [Custom API](https://github.com/MihailValkov/shared-trips/blob/main/server/readMe.md)


## Getting Started
Clone this repository and install dependencies
```
> git clone https://github.com/MihailValkov/shared-trips.git
> cd client
> npm install
> ng build
> cd ../server
> npm install
> node index.js
```
**NOTE: Don't forget to read the documentation about the CUSTOM API, you can find it [here](https://github.com/MihailValkov/shared-trips/blob/main/server/readMe.md).**

## Application Structure

### Public part (accessible without authentication)
### Private part (available for registered users)
### Admin part (accessible for admin users)

## Application Overview
The application allows visitors to browse through the shared trips catalog. Users may register with an `email`, `password` and `gender` which allows them to `create` their own trips and should be able to `join` trip (if the current user is not the trip creator and if seats available). Trip `authors` can also edit or delete their own publications at any time (admin users too). Each logged-in `user` should be able to view their own profile by clicking `[Profile]` in the navigation bar. 
This page is containing detailed information about the user, their own trips, and the opportunity to edit their own profile information.

# Permissions:

| **Permissions** | Guest   | Logged in User  | Admin           |
| --------------- | -----   | --------------  | --------------  |
| Login/ Register | ✅     | ❌              | ❌              |
| Home page       | ✅     | ✅              | ✅              |
| Catalog         | ✅     | ✅              | ✅              |
| Details         | ✅     | ✅              | ✅              |
| Profile         | ❌     | ✅              | ✅              |
| Edit Trip       | ❌     | ✅ (author)     | ✅              |
| Edit Trip       | ❌     | ❌ (not-author) | ✅              |
| Delete Trip     | ❌     | ✅ (author)     | ✅              |
| Delete Trip     | ❌     | ❌ (not-author) | ✅              |
| Join Trip       | ❌     | ❌ (author)     | ❌ (author)     |
| Join Trip       | ❌     | ✅ (not-author) | ✅ (not-author) |
| Admin Dashboard | ❌     | ❌              | ✅              |
| Admin Profile   | ❌     | ❌              | ✅              |
| Admin Users     | ❌     | ❌              | ✅              |
| Admin Trips     | ❌     | ❌              | ✅              |

## Pages:

### Public Pages (logged out users):

Home page
![Home Page](https://raw.githubusercontent.com/MihailValkov/shared-trips/main/images/Home.png)

Login page
![Login Page](https://raw.githubusercontent.com/MihailValkov/shared-trips/main/images/Login.png)

Login page - Error messages
![Login Page](https://raw.githubusercontent.com/MihailValkov/shared-trips/main/images/Login-error.png)

Register page
![Register Page](https://raw.githubusercontent.com/MihailValkov/shared-trips/main/images/Register.png)

Register page - Error messages
![Login Page](https://raw.githubusercontent.com/MihailValkov/shared-trips/main/images/Register-error.png)

Catalog page
![Catalog Page](https://raw.githubusercontent.com/MihailValkov/shared-trips/main/images/Catalog.png)

Detail page
![Detail Page](https://raw.githubusercontent.com/MihailValkov/shared-trips/main/images/Detail-guest.png)

### Private Pages (logged in users):

Create page
![Create Page](https://raw.githubusercontent.com/MihailValkov/shared-trips/main/images/Create.png)

Detail page (author)
![Detail Page](https://raw.githubusercontent.com/MihailValkov/shared-trips/main/images/Detail-author.png)

Detail page (with available seats)
![Detail Page](https://raw.githubusercontent.com/MihailValkov/shared-trips/main/images/Detail-user-available-seats.png)

Detail page (already joined)
![Detail Page](https://raw.githubusercontent.com/MihailValkov/shared-trips/main/images/Detail-user-joined.png)

Detail page (no seats available)
![Detail Page](https://raw.githubusercontent.com/MihailValkov/shared-trips/main/images/Detail-user-no-available-seats.png)

Profile page (my trips)
![Profile Page](https://raw.githubusercontent.com/MihailValkov/shared-trips/main/images/Profile-trips.png)

Profile page (edit profile)
![Profile Page](https://raw.githubusercontent.com/MihailValkov/shared-trips/main/images/Profile-edit.png)

### Private Pages (admin users):

Dashboard page 
![Dashboard Page](https://raw.githubusercontent.com/MihailValkov/shared-trips/main/images/Admin-dashboard.png)

Profile page (own profile)
![Profile Page](https://raw.githubusercontent.com/MihailValkov/shared-trips/main/images/Admin-profile.png)

Profile page (user profile)
![Profile Page](https://raw.githubusercontent.com/MihailValkov/shared-trips/main/images/Admin-user-profile.png)

Users page 
![Users Page](https://raw.githubusercontent.com/MihailValkov/shared-trips/main/images/Admin-users.png)

Trips page 
![Trips Page](https://raw.githubusercontent.com/MihailValkov/shared-trips/main/images/Admin-trips.png)


