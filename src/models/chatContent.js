const prisma = require('../helpers/prisma');
const db = require('../helpers/db');


// //get all chat
// exports.getAllChat = async (sender_id, offset, limit, searchBy, keyword, sortBy, sortType) => {
//   const keywordContains = {contains: `${keyword}`};
//   const chat = await prisma.chat_content.findMany({
//     skip: offset,
//     take: limit,
//     where: {
//       ...(searchBy === 'content' ? {content : keywordContains} : {is_deleted: false}),
//     },
//     orderBy: {
//       ...(sortBy === 'created_at' ? {created_at : `${sortType}`} : {}),
//     },
//     in
//   });
//   return chat;
// };

exports.getAllChat = (id, data, cb) => {
  console.log(id);
  console.log(data);
  db.query(`select * from chats join chat_content on chat_content.id = chats.chat_content_id where chats.recipient_id  in (${id}, ${data}) 
      and chats.sender_id in (${id}, ${data}) and chat_content.is_deleted = false order by chats.created_at asc`,
  (err, res) => {
    console.log(res);
    cb(res);
  }
  );
};


//count all chat
exports.countGetAllChat = async (sender_id, searchBy, keyword) => {
  const keywordContains = {contains: `${keyword}`};
  const chat = await prisma.chat_content.count({
    where:{
      ...(searchBy === 'content' ? {content : keywordContains} : {}),      
    },
  });
  return chat;
};

//create chat
exports.createChatContentModel = async (sender_id, data) => {
  console.log(data);
  const conten = {content : data.content};
  const chat = await prisma.chat_content.create({
    data:conten
  }).then(async(res) =>{
    const response = {
      recipient_id: parseInt(data.recipient_id),
      sender_id : parseInt(sender_id),
      chat_content_id : parseInt(res.id)
    };
    const chats = await prisma.chats.create({
      data:response
    });
    const results = {...res, chats};
    return results;
  }).catch(error=>{
    return error;
  });
  console.log(chat);
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