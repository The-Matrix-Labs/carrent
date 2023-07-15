import twilio from 'twilio';
import moment from 'moment';

import { UserProfile } from '../../../data/models';

import { sms, sitename } from '../../../config';
import { updateVerificationCode, getCountryCode, getPhoneNumberStatus } from './helpers/dbFunctions';

const TwilioSms = app => {
    app.post('/send-verification-code', async function (req, res) {
        let responseStatus = 200, errorMessage, client;
        let phoneNumber = req.body.phoneNumber;
        let dialCode = req.body.dialCode;
        let verificationCode = Math.floor(1000 + Math.random() * 9000);
        let text = sitename + ' security code: ' + verificationCode;
        text += '. Use this to finish verification.';
        let userId = req.user.id;
        let today = moment();
        let convertedNumber = dialCode + phoneNumber;

        try {

            let findUpdatedTime = await UserProfile.findOne({
                attributes: ['codeUpdatedAt'],
                where: {
                    userId
                },
                raw: true
            });


            if (findUpdatedTime && findUpdatedTime.codeUpdatedAt != null) {
                let codeUpdatedAt = moment(findUpdatedTime.codeUpdatedAt);
                let timeDiff = today.diff(codeUpdatedAt, 'minutes');
                if (timeDiff < 2) {
                    responseStatus = 400;
                    errorMessage = 'Please try again after 2 minutes to receive a new OTP.';
                }
            }

            if (responseStatus == 200) {
                await updateVerificationCode(verificationCode, userId);

                const phoneNumberStatus = await getPhoneNumberStatus();
                if (phoneNumberStatus.value === '1') {

                    client = new twilio(sms.twilio.accountSid, sms.twilio.authToken);

                    const responseData = await client.messages
                        .create({
                            body: text,
                            from: sms.twilio.phoneNumber,
                            to: convertedNumber
                        });

                }
            }

        } catch (error) {
            responseStatus = 400;
            errorMessage = error.message;
        }



        res.send({ status: responseStatus, errorMessage });
    });
};




export default TwilioSms;