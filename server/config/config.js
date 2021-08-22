module.exports = {
    port: process.env.PORT || 3000,
    dbConnection: `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@db.exhqa.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    cookie_name: process.env.AUTH_COOKIE,
    jwt_secret: process.env.SECRET,
    rounds: Number(process.env.ROUNDS),
    defaultFields: {
        male: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc-SyW3qGqxIkZS43hnjvOvVVZ7cEGjDIY5-zZgf6dz6wb37Zq&s',
        female: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpr7d-RdwvCn-C6_FCbUB-qiO3DMJmnGpQcaJ7YVZvtBpU9H4&s',
        coverImage: 'https://live.staticflickr.com/3802/10568380026_d7fe7b35a3_b.jpg'
    }
};