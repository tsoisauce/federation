package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	// Set Gin to debug mode
	// Code: gin.SetMode(gin.DebugMode | gin.ReleaseMode | gin.TestMode)
	// Environment variable: export GIN_MODE=debug | release | test
	gin.SetMode(gin.DebugMode)

	router := gin.Default()

	// Set trusted proxies
	router.SetTrustedProxies([]string{"127.0.0.1"})

	// Set up a simple GET endpoint
	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "Hello, World!")
	})

	// Health check endpoint
	router.GET("/health", func(c *gin.Context) {
		c.String(http.StatusOK, "OK")
	})

	// test json
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	// Start server
	router.Run(":3002")
}
