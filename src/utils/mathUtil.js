export const calculateDiscount = (original, discount) => {
  return Math.round(((original - discount) / original) * 100);
};
