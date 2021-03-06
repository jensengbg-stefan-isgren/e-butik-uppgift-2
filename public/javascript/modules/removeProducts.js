export let removeProducts = async (id, size) => {
  const options = {
    method: "DELETE",
    body: JSON.stringify({
      id: id,
      size: size
    }),
    headers: {
      "Content-Type": "application/json"
    }
  };

  const URL = "http://localhost:8000/shoppingcart";
  let response = await fetch(URL, options);
  let data = await response.json();
  return data;
};
