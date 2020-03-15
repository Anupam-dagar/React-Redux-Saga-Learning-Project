# Glints Assignment Part 2 (Frontend)

![Glints Logo](./src/logo.png)

Deployed at [https://glintsfrontend.herokuapp.com/](https://glintsfrontend.herokuapp.com/)

## Instructions to Run

1. Clone the repository using `git clone https://github.com/Anupam-dagar/Glints-Assesment-Part-2-Frontend.git`.
2. change directory to repo using `cd Glints-Assesment-Part-2-Frontend/`.
3. Install dependencies using the command `yarn`.
4. Create a `.env` file in root of the project. It contains the backend server endpoint and the protocol to be used. `.env` has the following format. Replace values if needed but for local backend django server, these values should work.
```bash
REACT_APP_BACKEND_ENDPOINT=localhost:8000
REACT_APP_REST_PROTOCOL=http://
REACT_APP_WS_PROTOCOL=ws://
```
5. Run the server using `yarn start`.
6. The frontend should now be accessible at `http://localhost:3000`

## Technologies Used
1. React
2. Redux
3. Redux Saga
4. Websockets
5. Semantic UI React

## License
MIT
