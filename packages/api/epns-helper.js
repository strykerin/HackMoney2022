const NotificationHelper = require("@epnsproject/backend-sdk-staging").default // for testing or development.

const sendNotification = async (info) => {
    const CHANNEL_PK = '0x' + process.env.privateKey;
    // Initialise the SDK
    const epnsSdk = new NotificationHelper(CHANNEL_PK);

    const tx = await epnsSdk.sendNotification(
        info.recipientAddress,
        'Your public key has been created',//pushNotificationtitle,
        'Go get your private key to decrypt message. You can also update your own public key.', // pushNotificationMessage,
        'Your public key has been created', //notificationTitle,
        'Go get your private key to decrypt message. You can also update your own public key.', //notificationMessage,
        3, //this is the notificationType
        'www.google.com', //cta, // a url for users to be redirected to
        '', //image,// an image url, or an empty string
        null, //this can be left as null
    );
};

module.exports = {
    sendNotification
};
