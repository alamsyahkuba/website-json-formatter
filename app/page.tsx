"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setInput(formatted);
      setError(null);
    } catch (err) {
      setError("Invalid JSON. Tolong jangan kirim JSON hasil ngarang sendiri.");
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setInput(minified);
      setError(null);
    } catch (err) {
      setError("Invalid JSON. Itu bukan JSON, itu harapan palsu.");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(input);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 5000);
    } catch {
      setError("Gagal copy. Browser kamu lagi drama.");
    }
  };

  return (
    <main className="container">
      <h1>JSON Formatter</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste JSON kamu di sini..."
      />

      <div className="buttons">
        <button onClick={formatJSON}>Format</button>
        <button onClick={minifyJSON}>Minify</button>
        <button onClick={copyToClipboard}>Copy</button>
      </div>

      {copied && <p className="success">Copied to clipboard ✓</p>}
      {error && <p className="error">{error}</p>}
    </main>
  );
}