const container = document.querySelector(".container");
const chatContainer = document.querySelector(".chat-container");
const promptForm = document.querySelector(".prompt-form");
const promptInput = promptForm.querySelector(".prompt-input");
const fileInput = promptForm.querySelector("#file-input");
const fileUploadWrapper = promptForm.querySelector(".file-upload-wrapper");
const themeToggle = document.querySelector("#theme-file-btn");

const openBtn = document.getElementById("open-sidebar");
const closeBtn = document.getElementById("close-sidebar");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

let typingInterval, controller;
const userData = { message: "", file: {} };
const chatHistory = [];

// create chat element ke html
const createMsgElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
};

// Scroll to the bottom of the container
const scrollToBottom = () =>
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });

// Simulate typing effect for bot responses
const typingEffect = (text, textElement, botMsgDiv) => {
    textElement.textContent = "";
    const words = text.split(" ");
    let wordIndex = 0;

    // Set an interval to type each word
    typingInterval = setInterval(() => {
        if (wordIndex < words.length) {
            textElement.textContent +=
                (wordIndex === 0 ? "" : " ") + words[wordIndex++];
            scrollToBottom();
        } else {
            clearInterval(typingInterval);
            botMsgDiv.classList.remove("loading");
            document.body.classList.remove("bot-responding");
        }
    }, 40);
};

const generateRespone = async (botMsgDiv) => {
    const textElement = botMsgDiv.querySelector(".message-text");
    controller = new AbortController();

    // Add user message and file data to the chat history
    chatHistory.push({
        role: "user",
        parts: [
            { text: userData.message },
            ...(userData.file.data
                ? [
                    {
                        inline_data: (({ fileName, isImage, ...rest }) =>
                            rest)(userData.file),
                    },
                ]
                : []),
        ],
    });

    try {
        // Send the chat history to the API to get a response
        const response = await fetch("/api/gemini", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ contents: chatHistory }),
            signal: controller.signal,
        });

        const data = await response.json();
        // if (!response.ok) throw new Error(data.error.message);
        if (!response.ok) {
            const errorMsg =
                data?.error?.message ||
                data?.message ||
                "Unknown error occurred";
            throw new Error(errorMsg);
        }

        //proses the respone and display
        const responseText = data.candidates[0].content.parts[0].text
            .replace(/\*\*([^*]+)\*\*/g, "$1")
            .trim();
        typingEffect(responseText, textElement, botMsgDiv);

        chatHistory.push({ role: "model", parts: [{ text: responseText }] });
    } catch (error) {
        textElement.style.color = "#d62939";
        textElement.textContent =
            error.name === "AbortError"
                ? "Response generation stopped."
                : error.message;
        botMsgDiv.classList.remove("loading");
        document.body.classList.remove("bot-responding");
    } finally {
        userData.file = {};
    }
};

// Function untuk escape HTML
function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// Function untuk add copy buttons
// function addCopyButtons(container) {
//     container.querySelectorAll(".copy-code-btn").forEach((btn) => {
//         btn.addEventListener("click", () => {
//             const codeBlock = btn.closest("pre").querySelector("code");
//             const code = codeBlock.textContent;

//             navigator.clipboard.writeText(code).then(() => {
//                 btn.textContent = "Copied!";
//                 btn.classList.add("copied");

//                 setTimeout(() => {
//                     btn.textContent = "Copy";
//                     btn.classList.remove("copied");
//                 }, 2000);
//             });
//         });
//     });
// }

const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = promptInput.value.trim();
    if (!userMessage || document.body.classList.contains("bot-responding"))
        return;

    // clear kalo udah prompt
    promptInput.value = "";
    userData.message = userMessage;
    document.body.classList.add("bot-responding", "chat-active");
    fileUploadWrapper.classList.remove(
        "active",
        "img-attached",
        "file-attached"
    );

    // handle userChat dan add ke html
    const userMsgHTML = `<p class="message-text"></p>
    ${
        userData.file.data
            ? userData.file.isImage
                ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="img-attachment" />`
                : `<p class="file-attachment"><span class="material-symbols-rounded">description</span>${userData.file.fileName}</p>`
            : ""
    }
    `;
    const userMsgDiv = createMsgElement(userMsgHTML, "user-message");
    userMsgDiv.querySelector(".message-text").textContent = userMessage;
    chatContainer.appendChild(userMsgDiv);
    scrollToBottom();

    setTimeout(() => {
        // handle botChat dan add ke html setelah 600ms
        const botMsgHTML = `<img src="${botImage}" class="avatar" alt="imagebotv1"><p class="message-text">Tunggu bentar...</p>`;
        const botMsgDiv = createMsgElement(
            botMsgHTML,
            "bot-message",
            "loading"
        );
        chatContainer.appendChild(botMsgDiv);
        scrollToBottom();

        generateRespone(botMsgDiv);
    }, 600);
};

// Handle file input change (file upload)
fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
        fileInput.value = "";
        const base64String = e.target.result.split(",")[1];
        fileUploadWrapper.querySelector(".file-preview").src = e.target.result;
        fileUploadWrapper.classList.add(
            "active",
            isImage ? "img-attached" : "file-attached"
        );

        // Store file data in userData
        userData.file = {
            fileName: file.name,
            data: base64String,
            mime_type: file.type,
            isImage,
        };
    };
});

// Cancel file upload
document.querySelector("#cancel-file-btn").addEventListener("click", () => {
    userData.file = {};
    fileUploadWrapper.classList.remove(
        "active",
        "img-attached",
        "file-attached"
    );
});

// stop chat
document.querySelector("#stop-response-btn").addEventListener("click", () => {
    userData.file = {};
    controller?.abort();
    clearInterval(typingInterval);
    chatContainer
        .querySelector(".bot-message.loading")
        .classList.remove("loading");
    document.body.classList.remove("bot-responding");
});

// hapus chat
document.querySelector("#delete-file-btn").addEventListener("click", () => {
    chatHistory.length = 0;
    chatContainer.innerHTML = "";
    document.body.classList.remove("bot-responding", "chat-active");
});

// Handle suggestions click
document.querySelectorAll(".suggestions-item").forEach((item) => {
    item.addEventListener("click", () => {
        promptInput.value = item.querySelector(".text").textContent;
        promptForm.dispatchEvent(new Event("submit"));
    });
});

// Show/hide controls for mobile on prompt input focus
document.addEventListener("click", ({ target }) => {
    const wrapper = document.querySelector(".prompt-wrapper");
    const shouldHide =
        target.classList.contains("prompt-input") ||
        (wrapper.classList.contains("hide-controls") &&
            (target.id === "add-file-btn" ||
                target.id === "stop-response-btn"));
    wrapper.classList.toggle("hide-controls", shouldHide);
});

// Set initial theme from local storage
const isLightTheme = localStorage.getItem("themeColor") === "light_mode";
document.body.classList.toggle("light-theme", isLightTheme);

promptForm.addEventListener("submit", handleFormSubmit);
promptForm
    .querySelector("#add-file-btn")
    .addEventListener("click", () => fileInput.click());

openBtn.addEventListener("click", () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
});

closeBtn.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeSidebar);

function closeSidebar() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
}

// === THEME HANDLER ===
function setTheme(theme) {
    const isLight = theme === "light";
    document.body.classList.toggle("light-theme", isLight);
    localStorage.setItem("themeColor", theme);
}

// Inisialisasi awal saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("themeColor") || "dark";
    setTheme(savedTheme);
});

// === Event dari sidebar ===
document.querySelectorAll(".tema-option").forEach((opt) => {
    opt.addEventListener("click", (e) => {
        const theme = e.currentTarget.dataset.theme; // "light" atau "dark"
        setTheme(theme);

        // Tutup dropdown setelah pilih
        document.getElementById("tema-overlay").classList.remove("show");
    });
});

// === Toggle overlay tampil / sembunyi ===
const temaBtn = document.getElementById("tema-btn");
const temaOverlay = document.getElementById("tema-overlay");

temaBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    temaOverlay.classList.toggle("show");
});

// Tutup overlay jika klik di luar
document.addEventListener("click", (e) => {
    if (!temaBtn.contains(e.target)) {
        temaOverlay.classList.remove("show");
    }
});
