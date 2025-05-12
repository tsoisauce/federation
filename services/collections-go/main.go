package main

import (
	"collections-go/graph"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gin-gonic/gin"
	"github.com/vektah/gqlparser/v2/ast"
)

func main() {
	// Set Gin to debug mode
	// Code: gin.SetMode(gin.DebugMode | gin.ReleaseMode | gin.TestMode)
	// Environment variable: export GIN_MODE=debug | release | test
	gin.SetMode(gin.DebugMode)

	// Initialize Gin router
	router := gin.Default()

	// Set trusted proxies
	router.SetTrustedProxies([]string{"127.0.0.1"})

	// GraphQL server setup
	srv := handler.New(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))

	srv.AddTransport(transport.Options{})
	srv.AddTransport(transport.GET{})
	srv.AddTransport(transport.POST{})

	srv.SetQueryCache(lru.New[*ast.QueryDocument](1000))

	srv.Use(extension.Introspection{})
	srv.Use(extension.AutomaticPersistedQuery{
		Cache: lru.New[string](100),
	})

	// GraphQL Playground endpoint
	router.GET("/", func(c *gin.Context) {
			playgroundHandler := playground.Handler("GraphQL playground", "/graphql")
			playgroundHandler.ServeHTTP(c.Writer, c.Request)
	})

	// GraphQL API endpoint
	router.POST("/graphql", func(c *gin.Context) {
			srv.ServeHTTP(c.Writer, c.Request)
	})

		// Health check endpoint
	router.GET("/health", func(c *gin.Context) {
		c.String(http.StatusOK, "OK")
	})
	
	// Start server
	router.Run(":3002")
}
