// GrpahQL
import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLFloat as FloatType,
  GraphQLBoolean as BooleanType,
} from 'graphql';

import ReservationType from '../../types/ReservationType';

// Sequelize models
import { Reservation, ReservationSpecialPricing } from '../../models';

import moment from 'moment';

import { startTimeData, endTimeData } from '../../../helpers/formatting';


const createReservation = {

  type: ReservationType,

  args: {
    listId: { type: new NonNull(IntType) },
    hostId: { type: new NonNull(StringType) },
    guestId: { type: new NonNull(StringType) },
    checkIn: { type: new NonNull(StringType) },
    checkOut: { type: new NonNull(StringType) },
    guests: { type: new NonNull(IntType) },
    message: { type: new NonNull(StringType) },
    basePrice: { type: new NonNull(FloatType) },
    delivery: { type: FloatType },
    currency: { type: new NonNull(StringType) },
    discount: { type: FloatType },
    discountType: { type: StringType },
    guestServiceFee: { type: FloatType },
    hostServiceFee: { type: FloatType },
    total: { type: new NonNull(FloatType) },
    bookingType: { type: StringType },
    paymentType: { type: IntType },
    cancellationPolicy: { type: IntType },
    specialPricing: { type: StringType },
    isSpecialPriceAssigned: { type: BooleanType },
    isSpecialPriceAverage: { type: FloatType },
    dayDifference: { type: FloatType },
    startTime: { type: FloatType },
    endTime: { type: FloatType },
    licenseNumber: { type: new NonNull(StringType) },
    firstName: { type: new NonNull(StringType) },
    middleName: { type: StringType },
    lastName: { type: new NonNull(StringType) },
    dateOfBirth: { type: new NonNull(StringType) },
    countryCode: { type: StringType },
    securityDeposit: { type: FloatType }
  },

  async resolve({ request, response }, {
    listId,
    hostId,
    guestId,
    checkIn,
    checkOut,
    guests,
    message,
    basePrice,
    delivery,
    currency,
    discount,
    discountType,
    guestServiceFee,
    hostServiceFee,
    total,
    bookingType,
    paymentType,
    cancellationPolicy,
    specialPricing,
    isSpecialPriceAssigned,
    isSpecialPriceAverage,
    dayDifference,
    startTime,
    endTime,
    licenseNumber,
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    countryCode,
    securityDeposit
  }) {

    // Check if user already logged in
    if (request.user && !request.user.admin) {

      const userId = request.user.id;
      let confirmationCode = Math.floor(100000 + Math.random() * 900000);
      let reservationState;
      let convertSpecialPricing;
      if (isSpecialPriceAssigned) {
        convertSpecialPricing = JSON.parse(specialPricing);
      }
      if (bookingType === 'instant') {
        reservationState = 'approved';
      }

      // let isStartValue = startTimeData(startTime);
      // let isEndValue = startTimeData(endTime);
      // let isStartDate = moment(checkIn).format('YYYY-MM-DD');
      // let isEndDate = moment(checkOut).format('YYYY-MM-DD');

      // let checkInDate = isStartDate + ' ' + isStartValue;
      // let checkOutDate = isEndDate + ' ' + isEndValue;


      const reservation = await Reservation.create({
        listId,
        hostId,
        guestId,
        checkIn,
        checkOut,
        guests,
        message,
        basePrice,
        delivery,
        currency,
        discount,
        discountType,
        guestServiceFee,
        hostServiceFee,
        total,
        confirmationCode,
        reservationState,
        paymentMethodId: paymentType,
        cancellationPolicy,
        isSpecialPriceAverage,
        dayDifference,
        startTime,
        endTime,
        licenseNumber,
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        countryCode,
        securityDeposit
      });

      if (reservation) {
        if (convertSpecialPricing && convertSpecialPricing.length > 0) {
          convertSpecialPricing.map(async (item, key) => {
            let updateReservationSpecialPricing = await ReservationSpecialPricing.create({
              listId,
              reservationId: reservation.id,
              blockedDates: item.blockedDates,
              isSpecialPrice: item.isSpecialPrice
            });
          });
        }

        return reservation;
      } else {
        return {
          status: 'failed to create a reservation'
        }
      }
    } else {
      return {
        status: "notLoggedIn",
      };
    }
  },
};

export default createReservation;

/**
mutation createReservation(
  $listId: Int!,
  $hostId: String!,
  $guestId: String!,
  $checkIn: String!,
  $checkOut: String!,
  $guests: Int!,
  $message: String!,
  $basePrice: Float!,
  $delivery: Float!,
  $currency: String!,
  $discount: Float,
  $discountType: String,
  $guestServiceFee: Float,
  $hostServiceFee: Float,
  $total: Float!,
  $bookingType: String
){
    createReservation(
      listId: $listId,
      hostId: $hostId,
      guestId: $guestId,
      checkIn: $checkIn,
      checkOut: $checkOut,
      guests: $guests,
      message: $message,
      basePrice: $basePrice,
      delivery: $delivery,
      currency: $currency,
      discount: $discount,
      discountType: $discountType,
      guestServiceFee: $guestServiceFee,
      hostServiceFee: $hostServiceFee,
      total: $total,
      bookingType: $bookingType
    ) {
        id
        listId,
        hostId,
        guestId,
        checkIn,
        checkOut,
        guests,
        message,
        basePrice,
        delivery,
        currency,
        discount,
        discountType,
        guestServiceFee,
        hostServiceFee,
        total,
        confirmationCode,
        createdAt
        status
    }
}
**/
