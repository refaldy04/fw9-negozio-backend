const prisma = require('../helpers/prisma');


//get all chat
exports.getAllChat = async (offset, limit, searchBy, keyword, sortBy, sortType) => {
  const keywordContains = {contains: `${keyword}`};
  const chat = await prisma.chat_content.findMany({
    skip: offset,
    take: limit,
    where: {
      ...(searchBy === 'content' ? {content : keywordContains} : {is_deleted: false}),
    },
    orderBy: {
      ...(sortBy === 'created_at' ? {created_at : `${sortType}`} : {}),
    },
  });
  return chat;
};

//count all chat
exports.countGetAllChat = async (searchBy, keyword) => {
  const keywordContains = {contains: `${keyword}`};
  const chat = await prisma.chat_content.count({
    where:{
      ...(searchBy === 'content' ? {content : keywordContains} : {}),      
    },
  });
  return chat;
};

//create chat
exports.createChatContentModel = async (data) => {
  const chat = await prisma.chat_content.create({
    data
  });
  return chat;
};

//update chat
exports.updateChatContentModel = async (id, data) => {
  const chatId = parseInt(id);
  console.log(data);
  const chat = await prisma.chat_content.update({
    where: {id: chatId}
    ,data
  });
  return chat;
};

//delete chat
exports.deleteChatContentModel = async (id, data) => {
  const chatId = parseInt(id);
  console.log(data);
  //const finalData = {is_deleted : data};
  const chat = await prisma.chat_content.update({
    where: {id: chatId}
    ,data
  });
  return chat;
};