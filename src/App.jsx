import axios from "axios";
import { useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

export default function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3000/generate-content", { message: message })
      .then((response) => {
        setChat([...chat, response.data.result]);
        setMessage("");
      });
  }

  return (
    <div className="p-10 py-20">
      <div>
        {chat.map((item, idx) => (
          <div
            className="prose prose-lg prose-zinc max-w-none bg-white p-2 md:p-8 rounded-lg shadow-lg"
            key={idx}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(marked.parse(item)),
            }}
          />
        ))}
      </div>
      <div className="fixed left-0 bottom-0 bg-white w-full">
      <form
        onSubmit={handleSubmit}
        className=" flex w-full px-10"
      >
        <input
          type="text"
          className="w-full rounded-l-full p-4 text-lg flex-1"
          placeholder="Message..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          className="border-2 border-white p-2 px-4 bg-blue-200 text-black rounded-r-full"
          type="submit"
        >
          Send
        </button>
      </form>
      </div>
    </div>
  );
}
