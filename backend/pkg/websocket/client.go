package websocket

import (
	"encoding/json"
	"fmt"
	"log"
	"sync"
	// "time"
	// "strconv"

	"github.com/gorilla/websocket"
)

type Client struct {
	ID   string
	Pseudo string
	Conn *websocket.Conn
	Pool *Pool
	mu   sync.Mutex
}

type Message struct {
	Type int `json:"type"`
	Body string `json:"body"`
}

type Message2 struct {
    Type string
    Body string
}
var message2 Message2

func (c *Client) Read() {

	defer func() {
		c.Pool.Unregister <- c
		c.Conn.Close()
	}()

	for {
        messageType, p, err := c.Conn.ReadMessage()
		// fmt.Println(p)
        if err != nil {
            log.Println(err)
            return
        }

        err2 := json.Unmarshal(p, &message2)
		if err2 != nil {
            log.Println(err2)
            return			
		}

        if message2.Type == "pseudo" {
            c.Pseudo = message2.Body
        } else if message2.Type == "msg" {
			// fmt.Printf(message2.Body)
            message := Message{Type: messageType, Body: "[TIME] : " + c.Pseudo + " : " + string(message2.Body)}
            c.Pool.Broadcast <- message
            fmt.Printf("Message Received: %+v\n", message)
        }
	}
}
