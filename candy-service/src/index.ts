import App from "./app";
import UserRoute from "./routes/user.route";
import SseRoute from "./routes/sse.route";

const routes = [new UserRoute(), new SseRoute()];
const app = new App(routes);
app.startApp(3500);
app.startWs(3501)
