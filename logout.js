const logout = async () => {
  const response = await fetch("/api/user-routes/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to log out.");
  }
};

document
  .querySelector("link to where logout button is")
  .addEventListener("click", logout);
