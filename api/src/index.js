const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let recipesList = [
  {
    id: "1",
    servings: 4,
    time: "30m",
    difficulty: "Easy",
    title: "Spaghetti",
    ingredients: ["noodles", "tomato sauce", "cheese"],
    directions: ["boil noodles", "cook noodles", "eat noodles"],
    imageUrl:
      "https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&poi=face&w=2000&h=1000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F21%2F2018%2F02%2F14%2Frecetas-4115-spaghetti-boloesa-facil-2000.jpg",
  },
  {
    id: "2",
    servings: 2,
    time: "15m",
    difficulty: "Medium",
    title: "Pizza",
    ingredients: ["dough", "tomato sauce", "cheese"],
    directions: ["boil dough", "cook dough", "eat pizza"],
    imageUrl:
      "https://www.saborusa.com/wp-content/uploads/2019/10/Animate-a-disfrutar-una-deliciosa-pizza-de-salchicha-Foto-destacada.png",
    featured: true,
  },
  {
    id: "3",
    servings: 6,
    time: "1h",
    difficulty: "Hard",
    title: "Salad",
    ingredients: ["lettuce", "tomato", "cheese"],
    directions: ["cut lettuce", "cut tomato", "cut cheese"],
    imageUrl:
      "https://www.unileverfoodsolutions.es/dam/global-ufs/mcos/SPAIN/calcmenu/recipes/ES-recipes/In-Development/american-bbq-beef-salad/main-header.jpg",
  },
];

let recipe = {
  id: null,
  servings: null,
  time: null,
  difficulty: null,
  title: null,
  ingredients: null,
  directions: null,
  imageUrl: null,
  featured: null,
};

let response = {
  error: false,
  codigo: 200,
  mensaje: "",
};
app.get("/", function (req, res) {
  response = {
    error: true,
    codigo: 200,
    mensaje: "API REST working. You can use /recipes /recipe endpoints",
  };
  res.send(response);
});
app.route("/recipes").get(function (req, res) {
  response = {
    error: false,
    codigo: 200,
    mensaje: "",
  };
  response = {
    error: false,
    codigo: 200,
    mensaje: "Recipes list",
    recipes: recipesList,
  };
  res.send(response);
});
app
  .route("/recipe")
  .get(function (req, res) {
    if (!req.body.id) {
      response = {
        error: true,
        codigo: 502,
        mensaje: "Required parameter id",
      };
    } else {
      const recipe = recipesList.find((recipe) => recipe.id === req.body.id);
      if (recipe) {
        response = {
          error: false,
          codigo: 200,
          mensaje: "Recipe found",
          recipe: recipe,
        };
      } else {
        response = {
          error: true,
          codigo: 503,
          mensaje: "Recipe doesn't exist",
        };
      }
    }
    res.send(response);
  })
  .post(function (req, res) {
    if (
      !req.body.id ||
      !req.body.title ||
      !req.body.ingredients ||
      !req.body.directions
    ) {
      response = {
        error: true,
        codigo: 502,
        mensaje: "Required id and message fields",
      };
    } else {
      if (recipesList.find((item) => item.id === req.body.id)) {
        response = {
          error: true,
          codigo: 503,
          mensaje: "Recipe already created",
        };
      } else {
        recipe = {
          id: req.body.id,
          title: req.body.title,
          servings: req.body.servings,
          time: req.body.time,
          difficulty: req.body.difficulty,
          ingredients: req.body.ingredients,
          directions: req.body.directions,
          imageUrl: req.body.imageUrl,
          featured: req.body.featured,
        };

        recipesList.push(recipe);
        response = {
          error: false,
          codigo: 200,
          mensaje: "Recipe created",
          recipe: recipe,
        };
      }
    }

    res.send(response);
  })
  .delete(function (req, res) {
    if (!recipesList.find((item) => item.id === req.body.id)) {
      response = {
        error: true,
        codigo: 501,
        mensaje: "Recipe not deleted",
      };
    } else {
      recipesList = recipesList.filter((item) => item.id !== req.body.id);

      response = {
        error: false,
        codigo: 200,
        mensaje: "Recipe deleted",
      };
    }
    res.send(response);
  });
app.use(function (req, res, next) {
  response = {
    error: true,
    codigo: 404,
    mensaje: "URL not found",
  };
  res.status(404).send(response);
});
app.listen(port, () => {
  console.log("Server started. Port 3000");
});
