import { convert } from './currencyConvertion';

export function cancellationGuestData(remainingNights,
  nights,
  priceForDays,
  accomodation,
  isCleaingPrice,
  guestServiceFee,
  guestFees,
  discount,
  hostServiceFee,
  basePrice,
  total,
  policyId,
  interval,
  priorDays,
  serviceFees,
) {

  let refundableNightPrice = 0, nonRefundableNightPrice = 0;
  let updatedGuestFee = 0, updatedHostFee = 0, payoutToHost = 0, hostRefund = 0, paidAmount = 0;
  let cancellationData = {};
  paidAmount = total + guestServiceFee;

  if (remainingNights >= 0) {
    if (remainingNights === nights) {
      refundableNightPrice = ((priceForDays) * (accomodation / 100)) + isCleaingPrice - discount;
    } else {
      refundableNightPrice = ((remainingNights * basePrice) * (accomodation / 100)) + isCleaingPrice - discount;
    }
  } else {
    refundableNightPrice = ((priceForDays) * (accomodation / 100)) + isCleaingPrice - discount;
  }

  if (refundableNightPrice > 0) {
    if (serviceFees && serviceFees.guest) {
      if (serviceFees.guest.type === 'percentage') {
        updatedGuestFee = refundableNightPrice * (Number(serviceFees.guest.value) / 100);
      } else {
        updatedGuestFee = convert(base, rates, serviceFees.guest.value, serviceFees.guest.currency, currency);
      }
    }
  }

  hostRefund = total - refundableNightPrice;
  refundableNightPrice = refundableNightPrice + updatedGuestFee;


  //Payout amount calculated with host service fee
  if (hostRefund > 0) {
    if (serviceFees && serviceFees.host) {
      if (serviceFees.host.type === 'percentage') {
        updatedHostFee = hostRefund * (Number(serviceFees.host.value) / 100);
      } else {
        updatedHostFee = convert(base, rates, serviceFees.host.value, serviceFees.host.currency, currency);
      }
    }
    payoutToHost = hostRefund - updatedHostFee;
  }

  //Non refundable amount calculated based on the total amount guest paid and the refundable amount with guest service fee
  nonRefundableNightPrice = paidAmount - refundableNightPrice;

  cancellationData = {
    refundableNightPrice,
    nonRefundableNightPrice,
    updatedGuestFee,
    payoutToHost,
    updatedHostFee,
  }
  return cancellationData;
}

export function cancellationHostData(remainingNights,
  nights,
  priceForDays,
  accomodation,
  guestServiceFee,
  guestFees,
  hostServiceFee,
  basePrice,
  total,
  policyId,
  interval,
  serviceFees,
  priorDays,
  isCleaingPrice,
  base,
  rates,
  currency) {

  let refundAmount = 0, nonPayoutAmount = 0, refundDays = 0, payoutAmount = 0, earnedDays = 0, hostRefund = 0, refundHostServiceFee = 0;
  let cancellationData = {};
  let updatedHostFee = hostServiceFee, updatedGuestFee = 0;

  //Host Payout amount without subtracting host service fee. total has cleaning Fee with in it.

  if (remainingNights >= 0) {
    if (remainingNights === nights) {
      //Refund amount to guest
      refundAmount = (remainingNights * basePrice) * (accomodation / 100);
      refundDays = remainingNights;
      earnedDays = nights - remainingNights;
    } else {
      refundAmount = (remainingNights * basePrice) * (accomodation / 100);
      refundDays = remainingNights;
      earnedDays = nights - remainingNights;
    }
  } else {
    refundAmount = (nights * basePrice) * (accomodation / 100);
    refundDays = nights;
    earnedDays = nights;
  }

  hostRefund = total - refundAmount;

  //Payout amount calculated with host service fee
  if (hostRefund > 0) {
    nonPayoutAmount = refundAmount; //guest service fee and cleaning fee won't be here
    //New host service fee calculated based on the host refund amount.
    if (serviceFees && serviceFees.host) {
      if (serviceFees.host.type === 'percentage') {
        updatedHostFee = hostRefund * (Number(serviceFees.host.value) / 100);
      } else {
        updatedHostFee = convert(base, rates, serviceFees.host.value, serviceFees.host.currency, currency);
      }
    }
    payoutAmount = hostRefund - updatedHostFee;
  } else {
    //Payout amount of host is zero
    nonPayoutAmount = total - updatedHostFee;
    updatedGuestFee = 0; //Guest fee refunded
    updatedHostFee = 0;
  }

  if (refundAmount > 0) {
    if (serviceFees && serviceFees.guest) {
      if (serviceFees.guest.type === 'percentage') {
        updatedGuestFee = refundAmount * (Number(serviceFees.guest.value) / 100);
      } else {
        updatedGuestFee = convert(base, rates, serviceFees.guest.value, serviceFees.guest.currency, currency);
      }
    }
  }

  //Adding guest service fee, if it could be refunded
  refundAmount = refundAmount + updatedGuestFee;

  cancellationData = {
    refundAmount,
    nonPayoutAmount,
    payoutAmount,
    earnedDays,
    refundDays,
    updatedHostFee,
    updatedGuestFee
  }
  return cancellationData;
}
