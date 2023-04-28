# Backend приложения Postcomm

![](https://shields.io/badge/-JavaScript-yellow)
![](https://shields.io/badge/-Node.js-3E863D)
![](https://shields.io/badge/-MongoDB-00E661)
![](https://shields.io/badge/-Express.JS-384752)

## Функциональность
* Регистрация и авторизация нового пользователя.
* Изменение данных созданного пользователя.
* В приложение присутствует валидация входных данных.
* Это backend часть приложения "Postcomm". Frontend часть приложения находится [по этой ссылке](https://github.com/tyt34/postcomm). 

## API

### Регистрация, авторизация и редактирование данных пользователя

* `POST /reg` — создать нового пользователя. В теле запроса должен быть `name`, `surname`, `pass`, `email`, `phone`, `company`, `jobpost` и `avatar`. Формат ответа: 


```ts
{
    "data": {
        "name": "имя пользователя",
        "surname": "surname пользователя"
    },
    "status": "ok",
    "token": "jwt token"
}
```

* `POST /log` — авторизовать зарегистрированного пользователя. В теле запроса должен быть `name` и `pass`. Формат ответа: 
```ts
{
    "token": "jwt_tokken",
    "userId": "id пользователя в базе данных",
    "status": "ok",
    "user": {
        "name": "имя пользователя",
        "surname": "surname пользователя"
    }
}
```

* `PATCH /updateUser` — изменить поля *name*, *surname*, *email*, *phone*, *company*, *jobpost* и *avatar* пользователя. Необходим заголовок `authorization: Bearer jwt_tokken`. В теле запроса должен быть `name`, `surname`, `email`, `phone`, `company`, `jobpost` и `avatar`. Формат ответа: 
```ts
{
    "name": "name пользователя",
    "surname": "surname пользователя",
    "email": "email пользователя",
    "phone": "phone пользователя",
    "company": "company пользователя",
    "jobpost": "jobpost пользователя",
    "avatar": "avatar пользователя"
}
```

* `GET /getUser` — получить данные авторизованного пользователя. Необходим заголовок `authorization: Bearer jwt_tokken`. Формат ответа: 
```ts
{
    "name": "name пользователя",
    "surname": "surname пользователя",
    "email": "email пользователя",
    "phone": "phone пользователя",
    "company": "company пользователя",
    "jobpost": "jobpost пользователя",
    "avatar": "avatar пользователя"
}
```

* `GET /getmesprof` — получить все посты авторизованного пользователя. Необходим заголовок `authorization: Bearer jwt_tokken`. Формат ответа: 
```ts
{
    "data": [
        {
            "_id": "id данного поста",
            "header": "заголовок поста",
            "text": "сообщение поста",
            "dateText": "дата отправки сообщения в текстовом формате",
            "dateUTC":  "дата отправки сообщения в формате UTC",
            "owner": "id автора поста",
        },
        ...
    ]
}
```

### Создание поста

* `POST /createmes` — создать пост от имени авторизованного пользователя. Необходим заголовок `authorization: Bearer jwt_tokken`. В теле запроса должен быть `header`, `text`, `dateText` и `dateUTC`. Формат ответа: 
```ts
{
    "data": {
        "message": {
            "header": "заголовок поста",
            "text": "сообщение поста",
            "dateText": "дата отправки сообщения в текстовом формате",
            "dateUTC":  "дата отправки сообщения в формате UTC",
            "owner": "id автора поста",
            "_id": "id данного поста",
            "__v": 0
        }
    },
    "status": "ok"
}
```

### Создание комментария

* `POST /createcomment` — создать комментарий от имени авторизованного пользователя под указанным постом. Необходим заголовок `authorization: Bearer jwt_tokken`. В теле запроса должен быть `idPost`, `comment`, `dateText` и `dateUTC`. Формат ответа: 
```ts
{
    "status": "ok"
}
```

### Общие данные 


* `GET /getmesuser/:nameUser` — получить все посты определенного пользователя. Необходим заголовок `authorization: Bearer jwt_tokken`. Формат ответа: 
```ts
{
    "data": [
        {
            "_id": "id данного поста",
            "header": "заголовок поста",
            "text": "сообщение поста",
            "dateText": "дата отправки сообщения в текстовом формате",
            "dateUTC":  "дата отправки сообщения в формате UTC",
            "owner": "id автора поста",
        },
        ...
    ],
    "status": "ok"
}
```

* `GET /getava/:idUser` — получить все данные определенного пользователя. Необходим заголовок `authorization: Bearer jwt_tokken`. Формат ответа: 
```ts
{
    "name": "name пользователя",
    "surname": "surname пользователя",
    "email": "email пользователя",
    "phone": "phone пользователя",
    "company": "company пользователя",
    "jobpost": "jobpost пользователя",
    "avatar": "avatar пользователя"
}
```

* `GET /getpost/:idPost` — получить данные определенного поста. Необходим заголовок `authorization: Bearer jwt_tokken`. Формат ответа: 
```ts
{
    "data": {
        {
            "_id": "id данного поста",
            "header": "заголовок поста",
            "text": "сообщение поста",
            "dateText": "дата отправки сообщения в текстовом формате",
            "dateUTC":  "дата отправки сообщения в формате UTC",
            "owner": "id автора поста",
            "__v": 0
        }
    },
    "status": "ok"
}
```

* `GET /getallusers` — получить данные всех зарегистрированных пользователей. Необходим заголовок `authorization: Bearer jwt_tokken`. Формат ответа: 
```ts
{
    "users": [
        {
            "_id": "id данного пользователя",
            "name": "name пользователя",
            "surname": "surname пользователя",
            "email": "email пользователя",
            "phone": "phone пользователя",
            "company": "company пользователя",
            "jobpost": "jobpost пользователя",
            "avatar": "avatar пользователя"
        },
        ...
    ],
    "status": "ok"
}
```


* `GET /getcomments/:idPost` — получить все комментарии указанного поста. Необходим заголовок `authorization: Bearer jwt_tokken`. Формат ответа: 
```ts
{
    "data": [
        {
            "_id": "id комментария",
            "idPost": "id поста",
            "comment": "сообщение комментария",
            "dateText": "дата отправки сообщения в текстовом формате",
            "dateUTC":  "дата отправки сообщения в формате UTC",
            "owner": "id автора комментария",
            "__v": 0
        },
        ...
    ],
    "status": "ok"
}
```


## Запуск приложения
1. npm i
2. npm run start

- Не забудьте запустить frontend часть, которая находится [по этой ссылке](https://github.com/tyt34/postcomm). 
