export const GIFT_TEMPLATE = (
  username: string,
  giftQuantity: number,
  giftName: string,
) => `${username} gave you ${giftQuantity} ${giftName}.`;
