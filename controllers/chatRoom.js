// utils
const makeValidation = require('@withvoid/make-validation');
// models
const ChatRoomModel = require('../model/chatRoom.js');
const ChatMessageModel = require('../model/ChatMessage.js');
const UserModel = require('../model/appUser.js');

module.exports = {
  initiate: async (req, res) => {
    try {
      const { userIds } = req.body;
      const chatRoom = await ChatRoomModel.checkAndGetRoom(userIds);
      if (!chatRoom.isError && chatRoom.result.length) {
        return res.status(200).send({
          isError: false,
          isNew: false,
          message: 'retrieving an old chat room',
          chatRoom: chatRoom.result,
        });
      }

      const newRoom = await ChatRoomModel.initiateChat(userIds);
      return res.status(200).json({
        success: true,
        isNew: true,
        message: 'creating a new chatroom',
        chatRoom: newRoom.result
      });
    } catch (error) {
      return res.status(500).json({ isError: true, error: error })
    }
  },
  postMessage: async (req, res) => {
    try {
      const { roomId } = req.params;

      const currentLoggedUser = req.body.userId;
      const post = await ChatMessageModel.createPostInChatRoom(roomId, req.body.messageText, currentLoggedUser);
      global.io.sockets.in(roomId).emit('new message', { message: post });
      return res.status(200).send({ isError: false, post });
    } catch (error) {
      return res.status(500).send({ success: false, error: error })
    }
  },
  getRecentConversation: async (req, res) => {
    try {
      const currentLoggedUser = req.body.userId;
      const options = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10,
      };
      const rooms = await ChatRoomModel.getChatRoomsByUserId(currentLoggedUser);
      const roomIds = rooms.result.map(room => room.id);
      const recentConversation = await ChatMessageModel.getRecentConversation(
        roomIds.join(), options, currentLoggedUser
      );
      return res.status(200).send({ isError: false, conversation: recentConversation.result });
    } catch (error) {
      return res.status(500).json({ isError: true, error: error })
    }
  },
  getConversationByRoomId: async (req, res) => {
    try {
      const { roomId } = req.params;
      const room = await ChatRoomModel.getChatRoomByRoomId(roomId)
      if (!room) {
        return res.status(400).json({
          isError: true,
          message: 'No room exists for this id',
        })
      }
      return res.status(200).json({
        isError: false,
        result: room.result,
      });
    } catch (error) {
      return res.status(500).json({ isError: true, error });
    }
  },
  markConversationReadByRoomId: async (req, res) => {
    try {
      const { roomId } = req.params;
      const room = await ChatRoomModel.getChatRoomByRoomId(roomId)
      if (!room.isError && !room.result.length) {
        return res.status(400).send({
          isError: true,
          message: 'No room exists for this id',
        })
      }

      const currentLoggedUser = req.body.userId;
      const result = await ChatMessageModel.markMessageRead(roomId, currentLoggedUser);
      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ isError: true, error });
    }
  },
}