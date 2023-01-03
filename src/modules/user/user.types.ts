export type userProfileType = {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: string;
}

export type paymentType = {
  customerId: string;
  cards: {
    paymentMethodId: string;
    brand: string;
    country: string;
    expMonth: number;
    expYear: number;
    funding: string;
    last4: string;
  }[];
}
