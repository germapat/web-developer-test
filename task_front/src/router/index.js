/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from "vue";
import Router from "vue-router";
import Meta from "vue-meta";

// Routes
import routes from "./routes";

Vue.use(Router);

// Create a new router
const router = new Router({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});

Vue.use(Meta);

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("token");

  if (authRequired && !loggedIn) {
    return next("/login");
  }

  next();
});

let paths = []; // array that holds an array of names for each sublevel

function createPaths(options) {
  try {
    options.forEach(option => {
      traverse(option);
    });

    return paths;
  } catch (error) {
    console.error(error);
  }
}

function traverse(option) {
  if (option) {
    if (option.parentId) paths.push(JSON.parse(option.data)); // push the name in the sub-level array
    if (option.children) {
      for (var index = 0; index < option.children.length; index++) {
        // for each node in children
        traverse(option.children[index]); // travel the node, increasing the current sub-level
      }
    }
  }
}

export default router;
