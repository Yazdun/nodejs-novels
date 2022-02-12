<div align="center">

![Website](https://img.shields.io/website?down_color=red&down_message=DOWN&label=HEROKU&logo=heroku&style=for-the-badge&up_color=brightgreen&up_message=ACTIVE&url=https%3A%2F%2Fnodejs-novels.herokuapp.com%2F)
![GitHub last commit](https://img.shields.io/github/last-commit/Yazdun/nodejs-novels?color=brightgreen&logo=git&logoColor=white&style=for-the-badge)
![GitHub repo size](https://img.shields.io/github/repo-size/Yazdun/nodejs-novels?color=violet&logo=github&logoColor=white&style=for-the-badge)

<!-- PROJECT LOGO -->
<br />
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="./docs/assets/favicon.ico" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">NODE & EXPRESS NOVELS API</h3>

  <p align="center">
    an api dedicated to novels and authors
    <br />
    <br />
    <a href="https://nodejs-novels.herokuapp.com/" target="_blank">Live Demo</a>
    ·
    <a href="https://github.com/Yazdun/nodejs-novels/issues">Report Bug</a>
    ·
    <a href="https://github.com/Yazdun/nodejs-novels/issues">Request Feature</a>
  </p>
</div>

## About The Project

You can create, update, delete, read and much more cool stuff with your favourite novels and authors with Novels API. This API has three separate routings which are `admin` , `protected` and `public` .

- with admin routes you can perform CRUD funcionalities and also view analytics and managements.
- with protected routes you can sign up and login as a user, create reviews and rate novels, like novels give your favourite authors a star and much more cool stuffs !
- with public routes, you can view authors and novels as an unregistered user.

I have also built two separate frontend user interfaces for this project, one of them is dedicated to admin panel and second one is dedicated to public and protected routes. You can check their source code following the links below 👇

🔗 [React Novels Admin Panel ](/guides/content/editing-an-existing-page)

🔗 [React Novels Public Users](/guides/content/editing-an-existing-page)

## Built with

This API is built with `Node.JS` and `Express.JS`, using `MongoDB` for database and `JWT` for user authentication.

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/)

## Getting Started

To run this project on your local machine do the following steps :

1. Install NPM packages
   ```
   npm install
   ```
2. Create `.env` file and fill following fields
   ```
   MONGO_URI = insert your mongo shell uri here
   JWT_SECRET = password to generate JWT
   JWT_LIFETIME= time to expire jwt token
   ```
3. Run the nodemon server
   ```
   npm run dev
   ```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

❤️ Thanks for your time and attention
