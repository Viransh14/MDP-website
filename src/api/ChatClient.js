/*const APP_ID = "6963282ea63000cdf9fb0541";
const API_KEY = "175155af6e154f189cbb78dce0d05a09";

const BASE_URL = `https://app.base44.com/api/apps/${APP_ID}`;

export async function invokeLLM(prompt) {
  const response = await fetch(
    `${BASE_URL}/integration-endpoints/Core/InvokeLLM`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        api_key: API_KEY
      },
      body: JSON.stringify({ prompt })
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || "API Error");
  }

  return await response.json();
}*/

export async function invokeLLM(prompt) {
  try {
    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    return data;   // return full object
  } catch (error) {
    console.error("Chat API error:", error);
    return { reply: "Sorry, I couldn't generate a response." };
  }
}