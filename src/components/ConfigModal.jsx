import { Key } from "lucide-react";

export default function ConfigModal({
  tempKey,
  setTempKey,
  saveApiKey,
  setShowConfig,
  apiKey,
}) {
  return (
    <div className="config-overlay">
      <div className="config-modal">
        <h2>
          <Key size={24} color="var(--accent)" /> Configure AI
        </h2>
        <p>
          We are using Groq's lightning-fast servers to power this CV Generator.
          Please enter your Groq API Key.
        </p>
        <input
          type="password"
          placeholder="Paste your Groq API key here..."
          value={tempKey}
          onChange={(e) => setTempKey(e.target.value)}
        />
        <div className="config-actions">
          <button onClick={saveApiKey} disabled={!tempKey.trim()}>
            Save & Continue
          </button>
          {apiKey && (
            <button className="secondary" onClick={() => setShowConfig(false)}>
              Cancel
            </button>
          )}
        </div>
        <div
          style={{
            marginTop: "1.5rem",
            fontSize: "0.85rem",
            color: "var(--text-secondary)",
          }}
        >
          Get one for free at{" "}
          <a
            href="https://console.groq.com/keys"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--accent)" }}
          >
            console.groq.com/keys
          </a>
        </div>
      </div>
    </div>
  );
}
