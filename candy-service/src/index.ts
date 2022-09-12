import App from "./app";
import UserRoute from "./routes/user.route";

const routes = [new UserRoute()];
const app = new App(routes);
app.startApp(3000);
