package main

import (
	"io"
	"log"
	"net/http"
	"os"
)

const defaultPort = "3002"

// Hardcoded response for federation service introspection
const federationResponse = `{"data":{"_service":{"sdl":"extend schema @link(url: \"https://specs.apollo.dev/federation/v2.0\", import: [\"@key\", \"@external\", \"@extends\"])\\n\\ntype Product @extends @key(fields: \\\"id\\\") {\\n  id: ID! @external\\n}\\n\\ntype Collection @key(fields: \\\"id\\\") {\\n  id: ID!\\n  name: String!\\n  description: String\\n  products: [Product!]!\\n}\\n\\nextend type Query {\\n  collections: [Collection!]!\\n  collection(id: ID!): Collection\\n  _service: _Service!\\n}\\n\\ntype _Service {\\n  sdl: String!\\n}\\n\\ntype Mutation {\\n  createCollection(name: String!, description: String): Collection\\n  addProductToCollection(collectionId: ID!, productId: ID!): Boolean\\n  removeProductFromCollection(collectionId: ID!, productId: ID!): Boolean\\n}"}}}`

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	// Try to load the processed schema from file
	processedSchema, err := os.ReadFile("schema.processed.json")
	if err != nil {
		log.Printf("Could not load processed schema, using hardcoded one: %v", err)
		processedSchema = []byte(federationResponse)
	}

	// GraphQL handler for federation
	http.HandleFunc("/graphql", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		// Log POST body for debugging
		if r.Method == http.MethodPost {
			body, _ := io.ReadAll(r.Body)
			log.Printf("Received GraphQL query: %s", string(body))
		}

		// Return the processed schema response
		w.Write(processedSchema)
	})

	// Simple playground
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html")
		w.Write([]byte(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Collections GraphQL Playground</title>
				<meta charset="utf-8" />
				<meta name="viewport" content="user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui">
				<style>
					body { margin: 0; padding: 0; font-family: sans-serif; }
				</style>
			</head>
			<body>
				<h1 style="padding: 20px;">Collections GraphQL Service</h1>
				<p style="padding: 0 20px;">This is a placeholder for the Collections GraphQL service. The full implementation is coming soon.</p>
			</body>
			</html>
		`))
	})

	// Health check endpoint
	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	log.Printf("Connect to http://localhost:%s/ for Collections service", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}