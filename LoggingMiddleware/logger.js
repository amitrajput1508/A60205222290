export const Log = async (stack, level, pkg, message, token) => {
  try {
    const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ stack, level, package: pkg, message })
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Logging failed");

    console.log("✅ Log created:", result);
    return result;
  } catch (error) {
    console.error("❌ Logging error:", error.message);
  }
};
