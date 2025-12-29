const baseUrl = 'http://localhost:3001';

const handleServerResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

export const getItems = () => {
  return fetch(`${baseUrl}/items`,
     { 
        headers: {
    "Content-Type" : "application/json"
    },
})
    .then(handleServerResponse);
}