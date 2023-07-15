var FCM = require('fcm-node');
import { serverKey } from '../../config';

var fcm = new FCM(serverKey);
import { UserLogin } from '../../data/models';

const pushNotificationRoutes = app => {

    app.post('/push-notification', async function (req, res) {

        let notifyContent = {
            "screenType": "message",
            "title": "New Message",
            "userType": "renter",
            "notificationId": 40300, 
            "message": "John: dfsgsfdqwertyuiiiio",
            "threadId": "12",
            "guestId": "2",
            "guestName": "john",
            "guestPicture": "kmik",
            "hostId": "123",
            "hostName": "nj j ",
            "hostPicture": "nmim",
            "guestProfileId": "123",
            "hostProfileId": "123"
        };


        let userId = req.body.userId;
        let content = req.body.content;

        let notificationId = Math.floor(100000 + Math.random() * 900000);
        let deviceId = [];
        content['notificationId'] = notificationId;


        const getdeviceIds = await UserLogin.findAll({
            attributes: ['deviceId'],
            where: {
                userId: userId
            },
            raw: true
        });

         if (getdeviceIds && getdeviceIds.length > 0) {
            getdeviceIds.map(async (item) => {
                deviceId.push(item.deviceId);
            })
        };

        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            // to: 'cwNbfmSVw_0:APA91bGuXNnXqKuTml52VHh4BYqtqVFdKWHtd2adf6oUGVTXOIN8Sbz82WQQKz-6QNg2RM-1n5CxV5toZFVs15snoI4ZIgjsUBUDfi4s_gyMsDFeH3Sx4OlcXfbiSTxeENrysKU4g86V',
            registration_ids: deviceId,
            notification: {
                title: content.title,
                body: content.message,
                content_available: true,
                priority: 'high',
            },
            
            data: {
                content,
                action_loc_key: null
            }
        };

        fcm.send(message, function (err, response) {
            if (err) {
                console.log("Something has gone wrong!", err);
            } else {
                console.log("Successfully sent with response: ", response);
            }
            res.send({ status: response, errorMessge: err });
        });

    });
};

export default pushNotificationRoutes;