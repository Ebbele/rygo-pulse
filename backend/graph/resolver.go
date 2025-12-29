package graph

import (
	"sync"

	"github.com/ebbele/rygo-pulse/backend/graph/model"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	TodoService *TodoService
}

type TodoService struct {
	mu          sync.Mutex
	Subscribers map[string]chan *model.Todo
}

func (s *TodoService) listener(user string) chan *model.Todo {
	if channel, listening := s.Subscribers[user]; listening {
		return channel
	}

	return nil
}

func (s *TodoService) Subscribe(user string) chan *model.Todo {

	listener := s.listener(user)
	if listener != nil {
		return listener
	}

	ch := make(chan *model.Todo, 1)
	s.mu.Lock()
	s.Subscribers[user] = ch
	s.mu.Unlock()

	return ch
}

func (s *TodoService) Unsubscribe(user string) {
	if listener := s.listener(user); listener != nil {
		s.mu.Lock()
		delete(s.Subscribers, user)
		close(listener)
		s.mu.Unlock()
	}
}

func (s *TodoService) Publish(user string, todo *model.Todo) {
	if channel, listening := s.Subscribers[user]; listening {
		channel <- todo
	}
}
