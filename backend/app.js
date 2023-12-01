const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {
  register,
  login,
  getUsers,
  getRoles,
  updateUser,
  deleteUser,
} = require("./controllers/user");
const {
  addProduct,
  editProduct,
  deleteProduct,
  getProducts,
  getProduct,
} = require("./controllers/product");
const { getCategories } = require("./controllers/categories");
const mapUser = require("./helpers/mapUser");
const authenticated = require("./middlewares/authenticated");
const hasRole = require("./middlewares/hasRole");
const ROLES = require("./constants/roles");
const mapProduct = require("./helpers/mapProduct");
const {
  addShoppingCart,
  getShoppingCart,
} = require("./controllers/shoppingCart");
const mapCategory = require("./helpers/mapCategory");
const mapShoppingCart = require("./helpers/mapShoppingCart");

//---
const port = 3003;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);

    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);

    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({});
});

app.get("/categories", async (req, res) => {
  const categories = await getCategories();

  res.send({ categories: categories.map(mapCategory) });
});

app.get("/products", async (req, res) => {
  const { products, lastPage } = await getProducts(
    req.query.search,
    req.query.limit,
    req.query.page
  );

  res.send({ data: { lastPage, products: products.map(mapProduct) } });
});

app.get("/products/:id", async (req, res) => {
  const product = await getProduct(req.params.id);

  res.send({ data: mapProduct(product) });
});

app.use(authenticated);

//------------------------------------------------
app.get("/shoppingCart/:id", async (req, res) => {
  const shoppingCart = await getShoppingCart(req.params.id);

  res.send({ data: shoppingCart });
});
//------------------------------------------------
app.post("/products", hasRole([ROLES.ADMIN, ROLES.BUYER]), async (req, res) => {
  const newProduct = await addProduct({
    productName: req.body.product_name,
    group: req.body.group,
    imageUrl: req.body.image_url,
    productDescription: req.body.product_description,
    price: req.body.price,
    amount: req.body.amount,
  });

  res.send({ data: mapProduct(newProduct) });
});

app.patch(
  "/products/:id",
  hasRole([ROLES.ADMIN, ROLES.BUYER]),
  async (req, res) => {
    const updatedProduct = await editProduct(req.params.id, {
      product_name: req.body.productName,
      group: req.body.group,
      image_url: req.body.imageUrl,
      product_description: req.body.productDescription,
      price: req.body.price,
      amount: req.body.amount,
    });

    res.send({ data: mapProduct(updatedProduct) });
  }
);

app.delete(
  "/products/:id",
  hasRole([ROLES.ADMIN, ROLES.BUYER, ROLES.SELLER, ROLES.GUEST]),
  async (req, res) => {
    await deleteProduct(req.params.id);

    res.send({ error: null });
  }
);
//------------------------------------------------
app.get("/users", hasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUsers();

  res.send({ data: users.map(mapUser) });
});

app.get("/users/roles", hasRole([ROLES.ADMIN]), async (req, res) => {
  const roles = getRoles();

  res.send({ data: roles });
});

app.patch("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  const newUser = await updateUser(req.params.id, {
    role: req.body.roleId,
  });

  res.send({ data: mapUser(newUser) });
});

app.delete("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteUser(req.params.id);

  res.send({ error: null });
});

mongoose
  .connect(
    "mongodb+srv://SergStore:SergStore16460@cluster0.w6v8wcs.mongodb.net/store?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, (err) => {
      err ? console.log(err) : console.log(`Server started on port ${port}`);
    });
  });

// // require("dotenv").config();

// // const { addComment, deleteComment } = require('./controllers/comment');
// // const mapComment = require('./helpers/mapComment');

// // app.use(express.static('../frontend/build'))

// // app.post("/posts/:id/comments", async (req, res) => {
// //   const newComment = await addComment(req.params.id, {
// //     content: req.body.content,
// //     author: req.user.id,
// //   });

// //   res.send({ data: mapComment(newComment) });
// // });

// // app.delete(
// //   "/posts/:postId/comments/:commentId",
// //   hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
// //   async (req, res) => {
// //     await deleteComment(req.params.postId, req.params.commentId);

// //     res.send({ error: null });
// //   }
// // );

// mongoose
//   .connect(
//     "mongodb+srv://SergStore:SergStore16460@cluster0.w6v8wcs.mongodb.net/store?retryWrites=true&w=majority"
//   )
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`Server started on port ${port}`);
//     });
//   });
