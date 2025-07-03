package com.thrifty.backend.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat/send")
    @SendTo("/topic/messages")
    public String sendMessage(String message) {
        System.out.println("Sending message: " + message);
        return message;
    }
}
