const {
  handleCreateChat,
  handleGetChats,
  handleUpdateChat,
  handleDeleteChat,
} = require("../../handlers/chat");

export default async function chatHandler(req, res) {
  if (req.method === "POST") {
    await handleCreateChat(req, res);
  } else if (req.method === "GET") {
    await handleGetChats(req, res);
  } else if (req.method === "PUT") {
    await handleUpdateChat(req, res);
  } else if (req.method === "DELETE") {
    await handleDeleteChat(req, res);
  } else {
    res.status(405).send("Method not allowed");
  }
}
