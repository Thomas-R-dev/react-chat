package websocket

import (
	"fmt"
	"strconv"

)

type Pool struct {
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan Message
}

func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan Message),
	}
}

func (pool *Pool) Start() {

	p := fmt.Println

	for {
		select {
			case client := <-pool.Register:
				pool.Clients[client] = true
				p("Size of Connection Pool: ", len(pool.Clients))
				for client, _ := range pool.Clients {
					client.Conn.WriteJSON(Message{Type: 2, Body: strconv.Itoa(len(pool.Clients)) })

					p("Nouveau: ",client)
					client.Conn.WriteJSON(Message{Type: 1, Body: "Nouveau utilisateur connecté... "})
				}
				break

			case client := <-pool.Unregister:
				p("Déconnecté: ",client)
				delete(pool.Clients, client)
				p("Size of Connection Pool: ", len(pool.Clients))
				for client, _ := range pool.Clients {
					client.Conn.WriteJSON(Message{Type: 2, Body: strconv.Itoa(len(pool.Clients)) })

					client.Conn.WriteJSON(Message{Type: 1, Body: "Utilisateur déconnecté... "})
				}
				break

			case message := <-pool.Broadcast:
				p("Sending message to all clients in Pool")

				for client, _ := range pool.Clients {
					if err := client.Conn.WriteJSON(message); err != nil {
						p(err)
						return
					}
				}
		}
	}
}
