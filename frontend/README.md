Области хранения данных:

-   база данных на json-server
-   BFF
-   редакс стор

Сущности приложения:

-   пользователь: БД (список пользователей), BFF (сессия текущего), стор (отображение в браузере)
-   роль пользователя: БД (список ролей), BFF (сессия пользователя), стор (использование на клиенте)
-   категории товаров: БД (список категорий), стор (отображение в браузере)
-   товары: БД (список товаров), стор (отображение в браузере)

Таблицы БД:

-   пользователи - users: id / login / password / registed_at / role_id
-   роли - roles: id / name
-   категории товаров - product_categories: id / title / image_url
-   товары - products: id / group / imageUrl / product_name / price /product_description / amount
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    Схема состояния на BFF:

-   сессия текущего пользователя: login / password / role

Схема для редакс стора (на клиенте):

-   user: id / login / roleId /session
-   posts: массив post: id / title / imageUrl / publishedAt / commentsCount
-   post: id / tirle / imageUrl / content / publishedAt / comments: массив comment: id / author / content / publishedAt
-   users: массив user: id / login /registeredAt / role

'json-server --watch src/db.json --port 3030 --delay 200'
