'use client';

import React, { useState } from "react";
import { Bot, Send, X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hi there! How can I assist you with your negotiations today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const suggestions = [
    "Optimize my discount",
    "Suggest negotiation tactics",
    "Explain average discount ranges",
  ];

  const handleSendMessage = (message: string) => {
    // Add user message
    setMessages((prev) => [...prev, { type: "user", content: message }]);
    setInputMessage("");

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: `Here's my response about "${message}". I'm here to help you optimize your contract negotiations.`,
        },
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 p-0 shadow-lg hover:from-orange-600 hover:to-purple-700"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageSquare className="h-6 w-6 text-white" />
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 shadow-2xl max-h-[calc(100vh-8rem)] overflow-y-auto">
          <CardHeader
            className="bg-gradient-to-r from-orange-500 to-purple-600 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/10 p-2">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div className="text-white">
                <h3 className="font-semibold">
                  AI Negotiation Assistant
                </h3>
                <p className="text-sm text-white/80">
                  Always here to help
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 bg-purple-500/20">
            {/* Messages Area */}
            <div className="h-96 overflow-y-auto p-4">
              <div className="space-y-4 ">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                    id={`mjc6na_${index}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.type === "user"
                          ? "bg-orange-500 text-white"
                          : "bg-secondary"
                      }`}
                      id={`mjmsg6_${index}`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div className="border-t border-border p-4">
              <div className="mb-4 flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSendMessage(suggestion)}
                    className="rounded-full bg-secondary px-3 py-1 text-sm hover:bg-secondary/80"
                    id={`141f9e_${index}`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && inputMessage.trim()) {
                      handleSendMessage(inputMessage);
                    }
                  }}
                />

                <Button
                  onClick={() => {
                    if (inputMessage.trim()) {
                      handleSendMessage(inputMessage);
                    }
                  }}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
