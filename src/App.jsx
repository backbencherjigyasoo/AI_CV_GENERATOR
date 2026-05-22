import { useState, useRef } from "react";
import html2pdf from "html2pdf.js";

import { callGroqAPI } from "./services/api";
import ConfigModal from "./components/ConfigModal";
import ChatPanel from "./components/ChatPanel";
import CvPreview from "./components/CvPreview";

function App() {
  const [apiKey, setApiKey] = useState(
    localStorage.getItem("groq_api_key") || "",
  );
  const [showConfig, setShowConfig] = useState(
    !localStorage.getItem("groq_api_key"),
  );
  const [tempKey, setTempKey] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "ai",
      content:
        "Hello! I am your lightning-fast AI CV Assistant. To get started, what is your full name?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const [cvData, setCvData] = useState({
    name: "Your Name",
    title: "",
    email: "",
    phone: "",
    location: "",
    links: [],
    summary: "",
    experience: [],
    education: [],
    skills: [],
    key_achievements: [],
  });

  const cvRef = useRef(null);
  const messagesEndRef = useRef(null);

  const saveApiKey = () => {
    if (tempKey.trim()) {
      localStorage.setItem("groq_api_key", tempKey.trim());
      setApiKey(tempKey.trim());
      setShowConfig(false);
      setApiError("");
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !apiKey) return;

    const userMessage = input;
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setApiError("");

    try {
      const result = await callGroqAPI(userMessage, messages, cvData, apiKey);

      if (result.reply) {
        setMessages((prev) => [...prev, { role: "ai", content: result.reply }]);
      }

      if (result.cv_update) {
        setCvData((prev) => ({ ...prev, ...result.cv_update }));
      }
    } catch (err) {
      setApiError(err.message);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "Oops, I encountered a connection issue. Please make sure your API key is correct.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const downloadPdf = () => {
    const element = cvRef.current;
    if (!element) return;

    const defaultName =
      cvData.name && cvData.name !== "Your Name" ? cvData.name : "Generated";
    const opt = {
      margin: [0.3, 0.3],
      filename: `${defaultName.replace(/\s+/g, "_")}_CV.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="app-container">
      {showConfig && (
        <ConfigModal
          tempKey={tempKey}
          setTempKey={setTempKey}
          saveApiKey={saveApiKey}
          setShowConfig={setShowConfig}
          apiKey={apiKey}
        />
      )}

      <ChatPanel
        messages={messages}
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        loading={loading}
        apiError={apiError}
        setShowConfig={setShowConfig}
        apiKey={apiKey}
        messagesEndRef={messagesEndRef}
      />

      <CvPreview cvData={cvData} cvRef={cvRef} downloadPdf={downloadPdf} />
    </div>
  );
}

export default App;
