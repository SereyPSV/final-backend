require("dotenv").config();

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
const {
  addOrUpdateShoppingCart,
  deleteShoppingCart,
  getShoppingCart,
} = require("./controllers/shoppingCart");
const mapUser = require("./helpers/mapUser");
const authenticated = require("./middlewares/authenticated");
const hasRole = require("./middlewares/hasRole");
const ROLES = require("./constants/roles");
const mapProduct = require("./helpers/mapProduct");
const mapCategory = require("./helpers/mapCategory");

const port = 3003;
const app = express();

app.use(express.static("../frontend/build"));

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
    req.query.searchPhrase,
    req.query.searchGroup,
    req.query.limit,
    req.query.page,
    req.query.sort
  );
  res.send({ data: { lastPage, products: products.map(mapProduct) } });
});

app.get("/products/:id", async (req, res) => {
  try {
    const product = await getProduct(req.params.id);
    res.send({ error: null, data: mapProduct(product) });
  } catch {
    res.send({ error: e.message || "Product not found" });
  }
});

//------------------------------------------------
app.use(authenticated);
//------------------------------------------------
//---------ShoppingCart get fo user
app.get(
  "/shoppingCart",
  hasRole([ROLES.ADMIN, ROLES.SELLER, ROLES.BUYER]),
  async (req, res) => {
    const newShoppingCart = await getShoppingCart(req.user.id);

    res.send({ data: newShoppingCart });
  }
);
//---------ShoppingCart add or edit
app.post(
  "/shoppingCart",
  hasRole([ROLES.ADMIN, ROLES.SELLER, ROLES.BUYER]),
  async (req, res) => {
    const newShoppingCart = await addOrUpdateShoppingCart(req.user.id, {
      buyer: req.user.id,
      count: req.body.count,
      product: req.body.productId,
    });

    res.send({ data: newShoppingCart });
  }
);
//---------ShoppingCart delete
app.delete(
  "/shoppingCart/:shoppingCartId",
  hasRole([ROLES.ADMIN, ROLES.SELLER, ROLES.BUYER]),
  async (req, res) => {
    await deleteShoppingCart(req.user.id, req.params.shoppingCartId);

    res.send({ error: null });
  }
);
//------------------------------------------------
//----------  PRODUCT  ---------------------------
//------------------------------------------------

app.post(
  "/products",
  hasRole([ROLES.ADMIN, ROLES.SELLER]),
  async (req, res) => {
    const newProduct = await addProduct({
      group: req.body.group,
      image_url: req.body.imageUrl,
      product_name: req.body.productName,
      product_description: req.body.description,
      price: req.body.price,
      amount: req.body.amount,
    });

    res.send({ data: newProduct });
  }
);

app.patch(
  "/products/:id",
  hasRole([ROLES.ADMIN, ROLES.SELLER]),
  async (req, res) => {
    const updatedProduct = await editProduct(req.params.id, {
      product_name: req.body.productName,
      group: req.body.group,
      image_url: req.body.imageUrl,
      product_description: req.body.description,
      price: req.body.price,
      amount: req.body.amount,
    });

    res.send({ data: mapProduct(updatedProduct) });
  }
);

app.delete(
  "/products/:id",
  hasRole([ROLES.ADMIN, ROLES.SELLER]),
  async (req, res) => {
    const shoppingCartToDelete = await deleteProduct(req.params.id); // найти все корзины с продуктом, взять из них пользователей, у пользователей удалить корзину и удалить саму корзину

    res.send({ error: null });
  }
);
//------------------------------------------------
app.get("/users", hasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUsers();

  res.send({ data: users.map(mapUser) });
});

//----Получение ролей----//
app.get("/users/roles", hasRole([ROLES.ADMIN]), async (req, res) => {
  const roles = getRoles();

  res.send({ data: roles });
});

// app.get("/users/:id", async (req, res) => {
//   const product = await getUser(req.user.id);

//   res.send({ data: product });
// });

//----Редактирование роли пользователей----//
app.patch("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  const newUser = await updateUser(req.params.id, {
    role: req.body.roleId,
  });

  res.send({ data: mapUser(newUser) });
});
//----Удаление пользователей----//
app.delete("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteUser(req.params.id);

  res.send({ error: null });
});

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, (err) => {
    err ? console.log(err) : console.log(`Server started on port ${port}`);
  });
});
