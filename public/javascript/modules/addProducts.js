export let addToCart = async (id, size) => {
  const options = {
    method: "POST",
    body: JSON.stringify({
      id: id,
      size: size
    }),
    headers: {
      "Content-Type": "application/json"
    }
  };

  const URL = "http://localhost:8000/shoppingCart";
  let response = await fetch(URL, options);
  let data = await response.json();
  console.log(data);
  return await data;
};
