import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'system';
}

export function ChatView() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I help you with your healthcare today?", sender: 'system' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    
    // Add user message
    const newMessage: Message = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    
    // Simulate response (in a real app, this would be an API call)
    setTimeout(() => {
      const responseMessage: Message = { 
        id: Date.now() + 1, 
        text: "I've received your message. How else can I assist you?", 
        sender: 'system' 
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto border border-gray-400 rounded-lg p-4">
      <div className="bg-white shadow-sm p-4 mb-4 rounded-md">
        <h1 className="text-xl font-semibold text-blue-600">Limo Assistant</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-white rounded-md shadow-sm mb-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-100 text-gray-800'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-sm">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-blue-400 ring-1 ring-gray-200 bg-blue-50 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message here..."
          />
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatView;
