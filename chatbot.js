const NEWS_API_ENDPOINT = "https://newsapi.org/v2/top-headlines";
const API_KEY = "2740be9058d648ba870ead76ce8c6331"; // Add your API Key here

// Handle sending user message
function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  if (userInput.trim() === "") return; // Don't send empty messages

  addMessage(userInput, "user-message");
  document.getElementById("user-input").value = "";

  processUserMessage(userInput);
}

// Add message to the chatbox
function addMessage(message, className) {
  const chatbox = document.getElementById("chatbox");
  const messageElement = document.createElement("div");
  messageElement.className = `message ${className}`;
  messageElement.innerText = message;
  chatbox.appendChild(messageElement);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Process user input and provide responses
function processUserMessage(message) {
  if (message.toLowerCase().includes("news")) {
    fetchNews();
  } else {
    addMessage(
      "I can help you with news or answer simple questions. Try asking me for 'news'.",
      "bot-message"
    );
  }
}

// Fetch news using News API
async function fetchNews() {
  try {
    const response = await fetch(
      `${NEWS_API_ENDPOINT}?country=us&apiKey=${API_KEY}`
    );
    const data = await response.json();
    const articles = data.articles.slice(0, 25); // Get the top 3 articles

    if (articles.length > 0) {
      articles.forEach((article) => {
        const newsMessage = `${article.title} - ${article.source.name}.\nRead more: ${article.url}`;
        addMessage(newsMessage, "bot-message");
      });
    } else {
      addMessage(
        "Sorry, I couldn't find any news at the moment.",
        "bot-message"
      );
    }
  } catch (error) {
    addMessage(
      "There was an error fetching the news. Please try again later.",
      "bot-message"
    );
  }
}
