const express = require('express');
const router = express.Router();
const chatRoom = require('../controllers/chatRoom.js');


router
  .post('/', chatRoom.getRecentConversation)
  .post('/:roomId/history', chatRoom.getConversationByRoomId)
  .post('/initiate', chatRoom.initiate)
  .post('/:roomId/message', chatRoom.postMessage)
  .put('/:roomId/mark-read', chatRoom.markConversationReadByRoomId)

module.exports = router;
