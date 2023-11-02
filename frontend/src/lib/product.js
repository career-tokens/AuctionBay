// create new bid function object and return it
export const createBid = (product, currentBid, user, amount) => {
  return {
    model: product.model,
    lastBidder: user?.username || user,
    currentBid: Number(amount),
    bids: Array.isArray(currentBid.bids)
      ? [
          ...currentBid.bids,
          { bidder: user?.username || user, bid: Number(amount) },
        ]
      : [{ bidder: user?.username || user, bid: Number(amount) }],
  };
};

export const changeProduct = (prev, data) => {
  const newProducts = prev.map((product) => {
    if (product.model === data.model) {
      return data;
    }
    return product;
  });
  return newProducts;
};
