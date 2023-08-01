# Interview-assessment - StarRepo
# EN
## About project
This project was made with Node.js + React.js.
<br>
It includes:
- Express.js server with API endpoints
- React single-page web-interface for comfortable work with this project
- CLI for all of project's functionality if you don't feel like booting up server
- MS SQL Server database hosted on free hosting for storing data
    _SQL Server was chosen as the database i have the most experience with_
  
### But what it does?
- Surveys GitHub API for most popular repositories starting from specified date!
- Outputs it as a table with links to repositories so you can look at most popular repositories right away!
- Allows for search for specific repository by its name or ID in the database

### About development process and the project in general
#### Known issues:
- Positional arguments in CLI cause yargs to throw 2-3 errors without breaking functionality in any way
  #### Why?
  Reasons wasn't found
  #### Ways of fixing
  - Rewrite CLI logic to manual args handling
    - **pros:**
      - No annoying errors
      - May be better suited for interface-driven realization (not sure)
    - **cons:**
      - Code becomes harder to update
      - Harder to read
      - Code becomes bloated with checks
#### What was achieved?
- Learned such things as:
  - Working with CLI with Node.js and JS in general
  - Working with Node.js outside of what free lessons teach
  - Working with promises
  - React.js outside of "drawing buttons"
  - Working with API and accessing public APIs
  - Learned how frontend and backend communicate and how to develop for such communications
  - Learned basics of GitHub
- Learned basics of Insomnia during developing and accessing APIs
- Was created web-service for making public API calls with it's own API

# RU
## О проекте
Проект был создан при помощи Node.js + React.js.
<br>
Включает в себя:
- Сервер на Express.js с точками подключения API
- Одностраничный веб-интерфейс на React для удобной работы с сервисом
- CLI для работы с сервисом без поднятия сервера
- база данных MS SQL Server, находящаяся на бесплатном хостинге, для хранения всех полученных данных
    _Данная база данных была выбрана как база данных, с которой у меня имеется наибольший опыт работы_
  
### Что он делает?
- Опрашивает GitHub API о самых популярных репозиториях за промежуток, начинающийся с выбранного Вами времени!
- Выводит эту информацию таблицей с ссылками на репозитории, что позволяет открыть их прямо из приложения!
- Проводит поиск определённого репозитория в базе данных по его имени или ID

### О процессе разработки и проекте в общем
#### Известные проблемы:
- Аргументы в CLI заставляют yargs вызвать 2-3 ошибки без нарушения процесса работы приложения
  #### Причина ошибки
  Причины не были найдены
  #### Как решить?
  - Переписать алгоритмы CLI под ручную обработку запросов
    - **плюсы:**
      - Не вылетают ошибки
      - Возможно, является более подходящим способом обработки для работы с командами с использованием интерфейсов (точно говорить не могу)
    - **минусы:**
      - Код сложнее исправлять
      - Код сложнее читать
      - Код загружается множеством проверок и блоков
#### Что было достигнуто?
- Я научился:
  - Работать с CLI с Node.js и JS 
  - Более глубокой работе с Node.js, чем могут предоставить бесплатные занятия
  - Работе с промисами
  - Разработке на React.js, уходящую за обычную разработку простейших компонентов, предоставляемой онлайн-уроками
  - Работе с API, а так же работе с публичными API
  - Изучил, как совместно работают frontend и backend, а так же как разрабатывать приложения под их коммуникацию
  - Изучил основы работы с GitHub
- Получен опыт работы с Insomnia при работе с API
- Был создан веб-сервис для обращения по открытым API, содержащий свой личный API
