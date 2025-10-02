// Production models available in Groq
export const GROQ_MODELS = [
  {
    id: "llama-3.1-8b-instant",
    name: "Llama 3.1 8B Instant",
    developer: "Meta",
    description: "Fast and efficient for quick responses"
  },
  {
    id: "llama-3.3-70b-versatile",
    name: "Llama 3.3 70B Versatile",
    developer: "Meta",
    description: "High-quality responses with versatility"
  },
  {
    id: "meta-llama/llama-guard-4-12b",
    name: "Llama Guard 4 12B",
    developer: "Meta",
    description: "Content moderation and safety"
  },
  {
    id: "openai/gpt-oss-120b",
    name: "GPT OSS 120B",
    developer: "OpenAI",
    description: "Large model for complex tasks"
  },
  {
    id: "openai/gpt-oss-20b",
    name: "GPT OSS 20B",
    developer: "OpenAI",
    description: "Balanced performance and efficiency"
  },
  {
    id: "groq/compound",
    name: "Compound",
    developer: "Groq",
    description: "System with models and tools"
  },
  {
    id: "groq/compound-mini",
    name: "Compound Mini",
    developer: "Groq",
    description: "Lightweight system model"
  }
];

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export class GroqService {
  private model: string;

  constructor(model: string = "llama-3.3-70b-versatile") {
    this.model = model;
  }

  setModel(model: string) {
    this.model = model;
  }

  async getChatCompletion(messages: ChatMessage[]): Promise<string> {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages,
          model: this.model,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.content || "Sorry, I couldn't generate a response.";
    } catch (error) {
      console.error("API error:", error);
      return "Sorry, there was an error processing your request. Please check your API key and try again.";
    }
  }

  async *getChatStream(messages: ChatMessage[]): AsyncGenerator<string, void, unknown> {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages,
          model: this.model,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              return;
            }
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                yield parsed.content;
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error("Streaming error:", error);
      yield "Sorry, there was an error processing your request. Please check your API key and try again.";
    }
  }
}

export const groqService = new GroqService();