var axios = require('axios');

interface MessageData {
  from: string, 
  msg_body: string,
  timeStamp: Date,
}

async function sendMessage(messageData: MessageData) {

  const data = getTextMessageInput(process.env.RECIPIENT_WAID, messageData.msg_body);

  // var config = {
  //   method: 'post',
  //   url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
  //   headers: {
  //     'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
  //     'Content-Type': 'application/json'
  //   },
  //   data: data
  // };

  await axios({
    method: 'post',
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
    headers: {
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    data: data
  })
  .then( (response: any) => {
    return response.status
  })
  .catch( (error: any) => {
    console.log(error)
    return error
  })
}

function getTextMessageInput(recipient: string, text: string) {
  return JSON.stringify({
    "messaging_product": "whatsapp",
    "preview_url": false,
    "recipient_type": "individual",
    "to": recipient,
    "type": "text",
    "text": {
        "body": text
    }
  });
}

export {
  sendMessage,
  getTextMessageInput
};