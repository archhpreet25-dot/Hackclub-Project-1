const GOOGLE_API_KEY = "AIzaSyCnMWJ52AiDFCG5W2TV6rbXG2KWQ8a2mPE";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GOOGLE_API_KEY}`;



const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.add("active");
    });
});



const actionButtons = document.querySelectorAll(".action-btn");

actionButtons.forEach(button => {
    button.addEventListener("click", () => {
        generate(button.dataset.type);
    });
});

async function generate(type) {

    let input, output, prompt;

    if (type === "ask") {
        input = document.getElementById("askInput").value;
        output = document.getElementById("askOutput");
        prompt = `you are user-freindily AI so give answer in usre-freindly way without using astrisc signs: ${input}`;
    }
    else if (type === "summarize") {
        input = document.getElementById("summaryInput").value;
        output = document.getElementById("summaryOutput");
        prompt = `you are user-freindily AI so give answer in usre-freindly way without using astrisc signs: ${input}`;
    }
    else if (type === "ideas") {
        input = document.getElementById("ideaInput").value;
        output = document.getElementById("ideaOutput");
        prompt = `you are user-freindily AI so give answer in usre-freindly way without using astrisc signs: ${input}`;
    }
    else if (type === "define") {
        input = document.getElementById("defineInput").value;
        output = document.getElementById("defineOutput");
        prompt = `you are user-freindily AI so give answer in usre-freindly way without using astrisc signs: ${input}`;
    }

    if (!input.trim()) {
        output.innerHTML = "Please enter some text.";
        return;
    }

    output.innerHTML = "Thinking... 🤖";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        const data = await response.json();
        output.innerHTML =
            data.candidates?.[0]?.content?.parts?.[0]?.text || 
            "No response received.";

    } catch (error) {
        output.innerHTML = "Error generating response.";
    }
}


