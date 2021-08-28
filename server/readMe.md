# Custom Server

## 🛠 Libraries and tools used
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [JsonWebToken](https://github.com/auth0/node-jsonwebtoken)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [Cookie Parser](https://github.com/expressjs/cookie-parser)
- [Cors](https://github.com/expressjs/cors)
- [Nodemon](https://github.com/remy/nodemon)
- [Dotenv](https://github.com/motdotla/dotenv)

## Getting Started
Clone this repository and install dependencies
```
> git clone https://github.com/MihailValkov/shared-trips.git
> cd server
> npm install
> create '.env' file.
> npm start
```
### Create '.env' file in the main directory and populate the following data:

* `USER` -- MongoDB Cloud user;
* `PASSWORD` -- MongoDB Cloud password for the current user;
* `DB_NAME` -- MongoDB Cloud Database;
* `SECRET` -- Secret for JWT;
* `AUTH_COOKIE` -- Name of the cookie;
* `ROUNDS` -- Number for bcrypt hashing password;

### Example
```
USER=
PASSWORD=
DB_NAME=
SECRET=
AUTH_COOKIE=
ROUNDS=
```
Or you can navigate to file `config.js` in folder `config` and fulfill the following properties `port`, `dbConnection`,`cookie_name`, `jwt_secret` and `rounds`. Also, if you do not have a MongoDB Cloud account, you can set the value of the `dbConnection` variable `'mongodb://localhost:27017/{DB_NAME}'`

### Example
```
{
    port: process.env.PORT || 3000,
    dbConnection: mongodb://localhost:27017/Shared_Trips',
    cookie_name: 'my_cookie_name',
    jwt_secret: 'my_jwt_secret_key',
    rounds: 10,
    defaultFields: {
        male: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc-SyW3qGqxIkZS43hnjvOvVVZ7cEGjDIY5-zZgf6dz6wb37Zq&s',
        female: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpr7d-RdwvCn-C6_FCbUB-qiO3DMJmnGpQcaJ7YVZvtBpU9H4&s',
        coverImage: 'https://live.staticflickr.com/3802/10568380026_d7fe7b35a3_b.jpg'
    }
}
```
## Base URL

The Base URL for the API is:

```https://localhost:3000/api```

The documentation below assumes you are prepending the Base URL to the endpoints in order to make requests.

# Endpoints: Users

* ```/auth/register``` -- signing up;
* ```/auth/login``` -- signing in;
* ```/auth/logout``` -- logging out;
* ```/auth/edit-profile``` -- edit `user` information;
* ```/auth/edit-user-photo``` -- edit `user` **cover** or **avatar** photo;

## Register
Create a new user by sending a `POST` request to `/auth/register` with properties `email`, `password`, `repeatPassword` and `gender`.

### Body

```
{
    "email": "user@abv.bg",
    "password": "123456",
    "repeatPassword": "123456",
    "gender": "male",
}
```

### Success Response:

Code: 200 OK

Content: 
``` 
{
    "avatarImg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc-SyW3qGqxIkZS43hnjvOvVVZ7cEGjDIY5-zZgf6dz6wb37Zq&s",
    "city": "City",
    "company": "Company",
    "coverImg": "https://live.staticflickr.com/3802/10568380026_d7fe7b35a3_b.jpg",
    "createdAt": "8/18/2021, 4:59:23 PM",
    "createdTrips": [],
    "email": "user@abv.bg",
    "gender": "male",
    "isOnline": true,
    "profession": "Profession",
    "status": "Member",
    "username": "Username",
    "_id": "611d3c9ee892370016697b21"
}
```

### Error Response:

Code: 409 Conflict

Content: 
```
{
    "message": "Passwords don't match!"
}
```
OR
```
{
    "message": "Email is already taken!"
}
```
OR 

Code: 400 Bad Request

Validation Error Content:

```
{ 
    "message": string[]
}
```

## Login
Login by sending a `POST` request with `email` and `password` to `/auth/login`. The service will respond with an object.

### Body

```
{
    "email":"user@abv.bg",
    "password":"123456"
}
```

### Success Response:

Code: 200 OK

Content: 
``` 
{
    "avatarImg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc-SyW3qGqxIkZS43hnjvOvVVZ7cEGjDIY5-zZgf6dz6wb37Zq&s",
    "city": "City",
    "company": "Company",
    "coverImg": "https://live.staticflickr.com/3802/10568380026_d7fe7b35a3_b.jpg",
    "createdAt": "8/18/2021, 4:59:23 PM",
    "createdTrips": [],
    "email": "user@abv.bg",
    "gender": "male",
    "isOnline": true,
    "profession": "Profession",
    "status": "Member",
    "username": "Username",
    "_id": "611d3c9ee892370016697b21"
}
```

### Error Response:

Code: 409 Conflict
```
{ 
    "message": "Email or Password don't match!"
}
```

OR 

Code: 400 Bad Request

Content: 
```
{ 
    "message": "All fields are required!"
}
```
OR

Validation Error Content:

```
{ 
    "message": string[]
}
```

## Logout
Send an authorized `GET` request to `/auth/logout`. 

### Success Response:

**The service returns an empty response - if you attempt to parse it as JSON, you will receive an error!** You can check for this type of response by looking at the **status** (204 instead of 200).

### Error Response:

Code: 400 Bad Request

Content: 
```
{ 
    "message": "Something went wrong please try again"
}
```

## Profile
Send an authorized `GET` request to `/auth/profile`. The service will respond with an object.

### Success Response:

Code: 200 OK

Content: 
``` 
{
    "avatarImg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc-SyW3qGqxIkZS43hnjvOvVVZ7cEGjDIY5-zZgf6dz6wb37Zq&s",
    "city": "City",
    "company": "Company",
    "coverImg": "https://live.staticflickr.com/3802/10568380026_d7fe7b35a3_b.jpg",
    "createdAt": "8/18/2021, 4:59:23 PM",
    "createdTrips": [],
    "email": "user@abv.bg",
    "gender": "male",
    "isOnline": true,
    "profession": "Profession",
    "status": "Member",
    "username": "Username",
    "_id": "611d3c9ee892370016697b21"
}
```

### Error Response:

Code: 404 Not Found

Content: 
```
{ 
    "message": "Not Found 404"
}
```

## Edit Profile

Send an authorized `POST` request with `city`, `company`, `password`,`repeatPassword`, `profession` and `username` to `/auth/edit-profile`. The service will respond with a newly updated user object.

### Body

```
{
    "city": "My City",
    "company": "My company",
    "password": "123456",
    "repeatPassword": "123456",
    "profession": "My Proffession",
    "username": "My name"
}
```

### Success Response:

Code: 200 OK

Content: 
``` 
{
"avatarImg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc-SyW3qGqxIkZS43hnjvOvVVZ7cEGjDIY5-zZgf6dz6wb37Zq&s",
"city": "My City",
"company": "My company",
"coverImg": "https://live.staticflickr.com/3802/10568380026_d7fe7b35a3_b.jpg",
"createdAt": "8/18/2021, 4:59:23 PM",
"createdTrips": [],
"email": "user@abv.bg",
"gender": "male",
"isOnline": true,
"profession": "My Proffession",
"status": "Member",
"username": "My name",
"_id": "611d4842e892370016697b41"
}
```

### Error Response:

Code: 409 Conflict

Content: 
```
{ 
    "message": "Passwords don't match!"
}
```
OR 

Code: 400 Bad Request

Validation Error Content:

```
{ 
    "message": string[]
}
```

## Edit Profile Photo

Send an authorized `POST` request with `avatarImg` or `avatarImg` to `/auth/edit-user-photo`. The service will respond with a newly updated user object.

### Body

```
{
    "avatarImg": "https://res.cloudinary.com/dofijitd8/image/upload/v1629309930/shared-trips/images/d8htlhcalpxrag7wr2xg.jpg"
}
```
OR

```
{
    "coverImg": "https://res.cloudinary.com/dofijitd8/image/upload/v1629310055/shared-trips/images/ge5obna41zhfhrxrhgjb.jpg"
}
```

### Success Response:

Code: 200 OK

Content: 
``` 
{
    "avatarImg": "https://res.cloudinary.com/dofijitd8/image/upload/v1629309930/shared-trips/images/d8htlhcalpxrag7wr2xg.jpg"
    "city": "My City"
    "company": "My company"
    "coverImg": "https://live.staticflickr.com/3802/10568380026_d7fe7b35a3_b.jpg"
    "createdAt": "8/18/2021, 4:59:23 PM"
    "createdTrips": []
    "email": "user@abv.bg"
    "gender": "male"
    "isOnline": true
    "profession": "My Proffession"
    "status": "Member"
    "username": "My name"
    "_id": "611d4842e892370016697b41"
}
```
OR

``` 
{
    "avatarImg": "https://res.cloudinary.com/dofijitd8/image/upload/v1629309930/shared-trips/images/d8htlhcalpxrag7wr2xg.jpg"
    "city": "My City"
    "company": "My company"
    "coverImg": "https://res.cloudinary.com/dofijitd8/image/upload/v1629310055/shared-trips/images/ge5obna41zhfhrxrhgjb.jpg"
    "createdAt": "8/18/2021, 4:59:23 PM"
    "createdTrips": []
    "email": "user@abv.bg"
    "gender": "male"
    "isOnline": true
    "profession": "My Proffession"
    "status": "Member"
    "username": "My name"
    "_id": "611d4842e892370016697b41"
}
```

### Error Response:

Code: 400 Bad Request

Validation Error Content: 
```
{ 
    "message": string[]
}
```

# Endpoints: Trip

* ```/trip/list``` -- get all `trips`;
* ```/trip/item/:tripId``` -- get single `trip` by `tripId`;
* ```/trip/own-trips``` -- get all created `trips` by the currently logged-in user (only for logged-in users);
* ```/trip/create``` -- create a new `trip` (only for logged-in users);
* ```/trip/edit/:tripId``` -- edit `trip` (only for author);
* ```/trip/delete/:tripId``` -- delete `trip` (only for author);
* ```/trip/join/:tripId``` -- join for a `trip` (only for logged-in users);


## Trip List

Send a `GET` request to `/trip/list`. The service will respond with an object, containing properties `trips` (an array) and `count` (number of all records).

Also can send a `GET` request with queries `/trip/list?page=1&limit=4`. The service will respond with an object, containing properties `trips` (with maximum `{limit}` records) and `count` (number of all records).

### Success Response:

Code: 200 OK

Content: 
``` 
{
    "trips": [
        {
            "buddies": ["610d3a9a3add2a0015a361b9"],
            "carBrand": "Dacia Sandero",
            "carImage": "https://res.cloudinary.com/dofijitd8/image/upload/v1628269054/shared-trips/images/fdakxvwuk8oumrhiahkm.jpg",
            "climatic": true,
            "createdAt": "08.08.2021 г., 19:36:17 ч.",
            "creator": "610cf19c604de808dc51a51f",
            "date": "2021-08-06",
            "description": "Enjoy the trip.",
            "drinking": false,
            "eating": false,
            "endPoint": "Svilengrad",
            "price": 20,
            "seats": 1,
            "smoking": false,
            "startPoint": "Sofia",
            "time": "19:56",
            "__v": 4,
            "_id": "610d6a23787dfe0015c197e4"
        }],
    "count": 1
}

```
### Error Response:

Code: 404 Not Found

Content: 
```
{ 
    "message": "Not Found 404"
}
```

## Single Trip

Send a `GET` request to `/trip/list/tripId`. The service will respond with an object, containing properties `trip` and `info`.

### Success Response:

Code: 200 OK

Content:
 
``` 
{
    "trip": {
        "buddies": ["610d3a9a3add2a0015a361b9"],
        "carBrand": "Dacia Sandero",
        "carImage": "https://res.cloudinary.com/dofijitd8/image/upload/v1628269054/shared-trips/images/fdakxvwuk8oumrhiahkm.jpg",
        "climatic": true,
        "createdAt": "08.08.2021 г., 19:36:17 ч.",
        "creator": "610cf19c604de808dc51a51f",
        "date": "2021-08-06",
        "description": "Enjoy the trip.",
        "drinking": false,
        "eating": false,
        "endPoint": "Svilengrad",
        "price": 20,
        "seats": 1,
        "smoking": false,
        "startPoint": "Sofia",
        "time": "19:56",
        "__v": 4,
        "_id": "610d6a23787dfe0015c197e4"
    },
    "info": {
        "isOwner": false,
        "alreadyJoined": false
    }
}
```

### Error Response:

Code: 404 Not Found

Content: 
```
{ 
    "message": "Not Found 404"
}
```

## Own Trips

Send an authorized `GET` request to `/trip/own-trips`. The service will respond with an object, containing properties `trips` (an array of all created trips for the currently logged-in user) and `count` (number of all records).

Also can send a `GET` request with queries `/trip/own-trips?page=1&limit=3`. The service will respond with an object, containing properties `trips` (with maximum `{limit}` records) and `count` (number of all records).

### Success Response:

Code: 200 OK

Content:
```
{ 
    "trips": object[],
    "count": number
}
```
### Error Response:

Code: 404 Not Found

Content: 
```
{ 
    "message": "Not Found 404"
}
```

## Create Trip

Create a new trip by sending an authorized `POST` request to `/trip/create` with properties `carBrand`, `carImage`, `climatic`, `date`,`description`, `drinking`, `eating`, `endPoint`, `price`, `seats`,`smoking`, `startPoint` and `time`. The service will create a new trip and upon success, this trip will be added to the user's createdTrips collection. The service will respond with an object, containing properties `trip` (newly created trip) and `user` (updated user).

### Body
```
{
    "carBrand": "Dacia Sandero",
    "carImage": "https://res.cloudinary.com/dofijitd8/image/upload/v1629314159/shared-trips/images/e7bjawlordyouri4vclj.png",
    "climatic": true,
    "date": "2021-08-18",
    "description": "Enjoy the trip!",
    "drinking": false,
    "eating": true,
    "endPoint": "Sofia",
    "price": "35",
    "seats": "2",
    "smoking": false,
    "startPoint": "Svilengrad",
    "time": "22:15"
}
```
### Success Response:

Code: 201 Created

Content:
```
{ 
    "trip": object,
    "user": object
}
```
### Error Response:

Code: 400 Bad Request

Validation Error Content: 
```
{ 
    "message": string[]
}
```

## Edit Trip 
If the currently logged-in user is the `author` of the trip.

Send an authorized `POST` request to `/trip/edit/tripId` with properties `carBrand`, `carImage`, `climatic`, `date`, `description`, `drinking`, `eating`, `endPoint`, `price`, `seats`, `smoking`, `startPoint` and `time`.  The service will respond with an object - **updated trip**.

### Body

```
{
    "carBrand": "Dacia Sandero Stepway",
    "carImage": "https://res.cloudinary.com/dofijitd8/image/upload/v1629314159/shared-trips/images/e7bjawlordyouri4vclj.png",
    "climatic": true,
    "date": "2021-08-18",
    "description": "Enjoy the trip to Sofia!",
    "drinking": false,
    "eating": false,
    "endPoint": "Sofia",
    "price": "50",
    "seats": "3",
    "smoking": false,
    "startPoint": "Svilengrad",
    "time": "22:15"
}
```

### Success Response:

Code: 200 OK

Content:
```
{ 
    "trip": object
}
```
### Error Response:

Code: 400 Bad Request

Validation Error Content: 
```
{ 
    "message": string[]
}
```

## Delete Trip

If the currently logged-in user is the `author` of the trip.

Send an authorized `GET` request to `/trip/delete/tripId`. The service will respond with an object - **deleted trip**.

### Success Response:

Code: 200 OK

Content:
```
{ 
    "trip": object
}
```
### Error Response:

Code: 404 Not Found

Content: 
```
{ 
    "message": "Not Found 404"
}
```


## Join Trip 
If the currently logged-in user is `NOT the author` of the trip.

Send an authorized `GET` request to `/trip/join/tripId`. The service will respond with an object, containing properties `trip` and `info`.


### Success Response:

Code: 200 OK

Content:
 
``` 
{
    "trip": object,
    "info": object
}
```

### Error Response:

Code: 404 Not Found

Content: 
```
{ 
    "message": "Not Found 404"
}
```
OR 

Code: 403 Forbidden

Content:
``` 
{
    "message": "Accessing the page or resource you were trying to reach is absolutely forbidden for some reason!"
}
```
OR 
``` 
{
    "message": "User already joined!"
}
```



# Endpoints: Admin
**Only for users with status `Admin`**

* ```/admin/statistics``` -- get information about the count of `users`, `admins`, `online users` and `trips`;
* ```/admin/logs``` -- get information about the `users` and the `admins` actions;
* ```/admin/expensive-trips``` -- get information about top expensive `trips`;
* ```/admin/user/:userId``` -- get `user` by `userId` or update `user` profile information;
* ```/admin/user/delete/:userId``` -- delete `user` by `userId`;
* ```/admin/user/update-avatar/:userId``` -- update `user` avatar image by `userId`;
* ```/admin/users``` -- get all `users`;
* ```/admin/trips``` -- get all `trips`;
* ```/admin/trip/delete/:tripId``` -- delete `trip` by `tripId`;

## Statistics

Send an authorized `GET` request to `/admin/statistics`. The service will respond with an object, containing properties `totalUsers`, `totalAdmins`, `totalTrips` and `onlineUsers`.

### Success Response:

Code: 200 OK

Content: 
``` 
{ 
    "totalUsers": number,
    "totalAdmins": number,
    "totalTrips": number,
    "onlineUsers": number
}

```
### Error Response:

Code: 404 Not Found

Content: 
```
{ 
    "message": "Not Found 404"
}
```

## Logs

Send an authorized `GET` request to `/admin/logs`. The service will respond with an object, containing properties `admin`, and `member`.

### Success Response:

Code: 200 OK

Content: 
``` 
{ 
    "admin": [
    {
        "action": "join",
        "avatarImg": "https://res.cloudinary.com/dofijitd8/image/upload/v1628952324/shared-trips/images/s4iu2zctmmxmek3yi34r.jpg",
        "email": "mihail_valkov@mail.bg",
        "message": "was logged-in",
        "status": "Admin",
        "time": "2021-08-18T19:08:56.160Z",
        "__v": 0,
        "_id": "611d5ad6e4b61e0016511fab"
    }],
    "member": [
    {
        "action": "leave",
        "avatarImg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc-SyW3qGqxIkZS43hnjvOvVVZ7cEGjDIY5-zZgf6dz6wb37Zq&s",
        "email": "user@abv.bg",
        "message": "logged out",
        "status": "Member",
        "time": "2021-08-18T19:08:56.160Z",
        "__v": 0,
        "_id": "611d5ad1e4b61e0016511fa7"
    }]
}

```

### Error Response:

Code: 404 Not Found

Content: 
```
{ 
    "message": "Not Found 404"
}
```

## Expensive Trips

Send an authorized `GET` request to `/admin/expensive-trips`. The service will respond with an object `trips` (an array of a maximum of 10 objects, which are sorted by price from highest to lowest).

### Success Response:

Code: 200 OK

Content: 
``` 

{ 
   "trips": [
       {
        "creator": "mihail_valkov@mail.bg"
        "destination": "Svilengrad - Sofia"
        "price": 35
       },
       {
        "creator": "user@abv.bg"
        "destination": "Varna - Burgas"
        "price": 20
       }
   ]
}
```

### Error Response:

Code: 404 Not Found

Content: 
```
{ 
    "message": "Not Found 404"
}
```

## Get User

Send an authorized `GET` request to `/admin/user/:userId`. The service will respond with an object.

### Success Response:

Code: 200 OK

Content: 
``` 
{ 
    "avatarImg": "https://res.cloudinary.com/dofijitd8/image/upload/v1628952324/shared-trips/images/s4iu2zctmmxmek3yi34r.jpg",
    "city": "Svilengrad",
    "company": "Softuni",
    "coverImg": "https://live.staticflickr.com/3802/10568380026_d7fe7b35a3_b.jpg",
    "createdAt": "6.08.2021 г., 11:22:45 ч.",
    "createdTrips": [],
    "email": "mihail_valkov@mail.bg",
    "gender": "male",
    "isOnline": true,
    "profession": "Developer",
    "status": "Admin",
    "username": "Mihail",
    "_id": "610cf19c604de808dc51a51f"
}
```

### Error Response:

Code: 404 Not Found

Content: 
```
{ 
    "message": "Not Found 404"
}
```

## Update User
Update `user` by sending an authorized `POST` request to `/admin/user/:userId` with properties `city`, `company`, `email`, `profession`, `status`, `username`, `password` (optional) and `repeatPassword` (optional).

### Body

```
{ 
    "city": "Svilengrad",
    "company": "Softuni",
    "email": "mihail_valkov@mail.bg",
    "profession": "Developer",
    "status": "Admin",
    "username": "Mihail Valkov"
}
```

### Success Response:

Code: 200 OK

Content: 
``` 
{ 
    "avatarImg": "https://res.cloudinary.com/dofijitd8/image/upload/v1628952324/shared-trips/images/s4iu2zctmmxmek3yi34r.jpg",
    "city": "Svilengrad",
    "company": "Softuni",
    "coverImg": "https://live.staticflickr.com/3802/10568380026_d7fe7b35a3_b.jpg",
    "createdAt": "6.08.2021 г., 11:22:45 ч.",
    "createdTrips": [],
    "email": "mihail_valkov@mail.bg",
    "gender": "male",
    "isOnline": true,
    "profession": "Developer",
    "status": "Admin",
    "username": "Mihail Valkov",
    "_id": "610cf19c604de808dc51a51f"
}
```

### Error Response:

Code: 409 Conflict

Content: 
```
{
    "message": "Passwords don't match!"
}
```
OR 

Code: 400 Bad Request

Validation Error Content:

```
{ 
    "message": string[]
}
```


## Update User Avatar Image
Update `user` avatar image by sending an authorized `POST` request to `/admin/user/update-avatar/:userId` with property `avatarImg`.

### Success Response:

Code: 200 OK

Content: 
``` 
{ 
    "avatarImg": "https://res.cloudinary.com/dofijitd8/image/upload/v1628952324/shared-trips/images/s4iu2zctmmxmek3yi34r.jpg",
    "city": "Svilengrad",
    "company": "Softuni",
    "coverImg": "https://live.staticflickr.com/3802/10568380026_d7fe7b35a3_b.jpg",
    "createdAt": "6.08.2021 г., 11:22:45 ч.",
    "createdTrips": [],
    "email": "mihail_valkov@mail.bg",
    "gender": "male",
    "isOnline": true,
    "profession": "Developer",
    "status": "Admin",
    "username": "Mihail Valkov",
    "_id": "610cf19c604de808dc51a51f"
}
```

### Error Response:

Code: 400 Bad Request

Validation Error Content:

```
{ 
    "message": string[]
}
```

## Delete User

Send an authorized `GET` request to `/admin/user/delete/:userId`. The service will delete the user also all his created trips and respond with an object.

### Success Response:

Code: 200 OK

Content: 
``` 
{ 
    "message": "resource deleted successfully" 
}
```

### Error Response:

Code: 404 Not Found

Content: 
```
{ 
    "message": "Not Found 404"
}
```

## Get Users

Send an authorized `GET` request to `/admin/users`. The service will respond with an object, containing properties `users` (an array) and `count` (number of all records).

Also can send an authorized `GET` request with queries `/admin/users?page=1&limit=5`. The service will respond with an object, containing properties `users` (with maximum `{limit}` records) and `count` (number of all records).

### Success Response:

Code: 200 OK

Content: 
``` 
{ 
    "users": user[], 
    "count": number
}
```

### Error Response:

Code: 404 Not Found

Content: 
```
{ 
    "message": "Not Found 404"
}
```

## Get Trips

Send an authorized `GET` request to `/admin/trips`. The service will respond with an object, containing properties `trips` (an array) and `count` (number of all records).

Also can send an authorized `GET` request with queries `/admin/trips?page=1&limit=5`. The service will respond with an object, containing properties `trips` (with maximum `{limit}` records) and `count` (number of all records).

### Success Response:

Code: 200 OK

Content: 
``` 
{ 
    "trips": trip[], 
    "count": number
}
```

### Error Response:

Code: 404 Not Found

Content: 
```
{ 
    "message": "Not Found 404"
}
```

## Further Information
You may create issues, regarding missing, incorrect or incomplete information. Any contribution is welcome!