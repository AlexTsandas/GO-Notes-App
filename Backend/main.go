package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/AlexTsandas/GO-Notes-App/controllers"
	"github.com/AlexTsandas/GO-Notes-App/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {

	if os.Getenv("ENV") != "production" {
		err := godotenv.Load(".env")
		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}
	MONGO_URI := os.Getenv("MONGO_URI")
	clientOptions := options.Client().ApplyURI(MONGO_URI)

	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(context.Background())

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	controllers.Collection = client.Database("golang_db").Collection("todos")

	app := fiber.New()
	if os.Getenv("ENV") == "development" {
		app.Use(cors.New(cors.Config{
			AllowOrigins: "http://localhost:5173",
			AllowHeaders: "Origin, Content-Type, Accept",
		}))
	}
	routes.Register(app)

	PORT := os.Getenv("PORT")

	if os.Getenv("ENV") == "production" {
		app.Static("/", "./Frontend/dist")
	}
	log.Fatal(app.Listen(":" + PORT))
}
