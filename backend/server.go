package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/ebbele/rygo-pulse/backend/graph"
	"github.com/ebbele/rygo-pulse/backend/graph/model"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/vektah/gqlparser/v2/ast"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	srv := handler.New(graph.NewExecutableSchema(
		graph.Config{Resolvers: &graph.Resolver{
			TodoService: &graph.TodoService{
				Subscribers: make(map[string]chan *model.Todo),
			},
		}}),
	)

	srv.AddTransport(transport.Options{})

	// order of transport matters ;)
	srv.AddTransport(transport.SSE{
		KeepAlivePingInterval: 3 * time.Second,
	})

	srv.AddTransport(transport.GET{})
	srv.AddTransport(transport.POST{})

	srv.SetQueryCache(lru.New[*ast.QueryDocument](1000))

	srv.Use(extension.Introspection{})
	srv.Use(extension.AutomaticPersistedQuery{
		Cache: lru.New[string](100),
	})

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
