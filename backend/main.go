package main

import (
	"fmt"
	"net/http"

	"github.com/TutorialEdge/realtime-chat-go-react/pkg/websocket"
)

func serveWs(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println("WebSocket Endpoint Hit")
	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		fmt.Fprintf(w, "%+v\n", err)
	}

	client := &websocket.Client{
		Conn: conn,
		Pool: pool,
	}

	pool.Register <- client
	client.Read()
}

func setupRoutes() {
	pool := websocket.NewPool()
	go pool.Start()

	http.HandleFunc("/chat", func(w http.ResponseWriter, r *http.Request) {
		serveWs(pool, w, r)
	})
}

func main() {
	fmt.Println("DarkRod Chat App v1.0")
	setupRoutes()
	http.ListenAndServeTLS(":8080","cert.crt","cert.key",nil)
}
