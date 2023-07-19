import { Routes } from "./types";

export class Router {
  // router list
  private routes: Routes[] = [];
  private static instance: Router;

  // get instance
  public static getInstance() {
    if (!Router.instance) {
      Router.instance = new Router();
    }
    return Router.instance;
  }

  // this is called singleton pattren
  private constructor() {
    //  you can not init an instance of Router class like this const router = new Router() => this is wrong constructor is private
    // only like const router = Router.getInstance()
    // we need just only one instance of this class
  }

  public get(path: string, handler: any) {
    this.routes.push({
      method: "GET",
      path,
      handler,
    });

    // method chaining
    return this;
  }

  public post(path: string, handler: any) {
    this.routes.push({
      method: "POST",
      path,
      handler,
    });

    // method chaining
    return this;
  }

  public patch(path: string, handler: any) {
    this.routes.push({
      method: "PATCH",
      path,
      handler,
    });

    // method chaining
    return this;
  }

  public put(path: string, handler: any) {
    this.routes.push({
      method: "PUT",
      path,
      handler,
    });

    // method chaining
    return this;
  }

  public delete(path: string, handler: any) {
    this.routes.push({
      method: "DELETE",
      path,
      handler,
    });

    // method chaining
    return this;
  }

  //   register routes
  public scan(server: any) {
    this.routes.forEach((route) => {
      const requestMethod = route.method.toLocaleLowerCase();
      const requestMethodFunc = server[requestMethod].bind(server);

      requestMethodFunc("/api/v1" + route.path, route.handler);
    });
  }

  public list() {
    return this.routes;
  }
}

const router = Router.getInstance();

export default router;
