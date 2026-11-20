package routes

import (
	"github.com/AlexTsandas/GO-Notes-App/controllers"
	"github.com/gofiber/fiber/v2"
)

func Register(app *fiber.App) {
	api := app.Group("/api")

	api.Get("/todos", controllers.GetTodos)
	api.Post("/todos", controllers.CreateTodos)
	api.Patch("/todos/:id", controllers.UpdateTodos)
	api.Delete("/todos/:id", controllers.DeleteTodos)
}
