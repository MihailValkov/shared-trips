# Angular Application - Shared Trips

## Libraries and tools used
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
### Private part (vailable for registered users)
### Admin part (accessible for admin)


## Application Overview
The application allows visitors to browse through the shared trips catalog. Users may register with an `email`, `password` and `gender` which allows them to `create` their own trips and should be able to `join` trip (if the current user is not the trip creator and if seats available). Trip `authors` can also edit or delete their own publications at any time (admin users too). Each logged-in `user` should be able to view his/her own profile by clicking `[Profile]` in the navigation bar. 
This page is containing detailed information about the user, their created trips, and the opportunity to edit his/her own profile information.

## Pages:

### Public Pages:

Home page

![Home Page]()

