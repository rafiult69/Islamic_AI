<!-- public/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Islamic Scholar AI - Ask Questions</title>
    <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        :root {
            --islamic-green: #0d5d36;
            --gold: #c5a455;
        }
        body {
            font-family: 'Amiri', serif;
            background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI3MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGRlMGVhIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=');
        }
        .chat-bubble {
            max-width: 85%;
            padding: 1rem;
            border-radius: 1rem;
            margin: 0.5rem 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .user-message {
            background: var(--islamic-green);
            color: white;
            margin-left: auto;
        }
        .bot-message {
            background: #f8f5ee;
            border: 1px solid var(--gold);
        }
        .loading-dots span {
            animation: blink 1.4s infinite;
        }
        @keyframes blink {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
        }
    </style>
</head>
<body class="min-h-screen p-4">
    <div class="max-w-3xl mx-auto">
        <header class="text-center mb-8">
            <h1 class="text-4xl font-bold mb-2" style="color: var(--islamic-green);">Islamic Scholar AI</h1>
            <p class="text-lg text-gray-600">Ask your questions about Islam and get authentic answers</p>
        </header>

        <div class="bg-white rounded-lg shadow-lg p-4 mb-4 min-h-96 max-h-[600px] overflow-y-auto">
            <div id="chat-container" class="space-y-4"></div>
            <div id="loading" class="hidden text-center text-gray-500 py-4">
                <div class="loading-dots space-x-1">
                    <span>.</span><span>.</span><span>.</span>
                </div>
            </div>
        </div>

        <div class="flex gap-2">
            <input type="text" id="user-input" 
                   class="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                   placeholder="Ask your Islamic question...">
            <button id="send-btn" 
                    class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Send
            </button>
        </div>
    </div>

    <script>
        const chatContainer = document.getElementById('chat-container');
        const userInput = document.getElementById('user-input');
        const sendBtn = document.getElementById('send-btn');
        const loading = document.getElementById('loading');

        function addMessage(message, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-bubble ${isUser ? 'user-message' : 'bot-message'}`;
            messageDiv.innerHTML = message.replace(/\n/g, '<br>');
            chatContainer.appendChild(messageDiv);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        async function handleSend() {
            const question = userInput.value.trim();
            if (!question) return;

            // Add user message
            addMessage(question, true);
            userInput.value = '';
            loading.classList.remove('hidden');

            try {
                const response = await fetch('/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: question })
                });

                if (!response.ok) throw new Error('API Error');
                const data = await response.json();
                addMessage(data.reply);
            } catch (error) {
                addMessage('Could not get response. Please try again later.');
            } finally {
                loading.classList.add('hidden');
            }
        }

        sendBtn.addEventListener('click', handleSend);
        userInput.addEventListener('keypress', (e) => e.key === 'Enter' && handleSend());
    </script>
</body>
</html>