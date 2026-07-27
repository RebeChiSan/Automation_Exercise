export interface DOB {
  day: string;
  month: string;
  year: string;
}

export interface User {
  userName: string;
  prefix: string;
  firstName: string;
  lastName: string;
  fullName: string;
  emailAddress: string;
  password: string;
  DOB: DOB;
  companyName: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  phoneNumber: string;
  fullAddress: string;
}

export interface PaymentDetails {
  cardName: string;
  cardNumber: string;
  cvc: string;
  expirationMonth: string;
  expirationYear: string;
}

export interface ReviewInfo {
  name: string;
  email: string;
  message: string;
}

export interface ContactInfo {
  name: string;
  email: string;
  subject: string;
  message: string;
  filePath: string;
}

export interface Brand {
  name: string;
  title: string;
}

export interface Subcategory {
  title: string;
  categoryId: string;
}

export interface TestData {
  wrongUser: Pick<User, 'userName' | 'emailAddress' | 'password'>;
  existingUser: User;
  newUser: User;
  paymentDetails: PaymentDetails;
  reviewInfo: ReviewInfo;
  contactInfo: ContactInfo;
  subscribeEmail: string;
  comment: string;
  products: {
    searchProduct: string;
    brands: {
      polo: Brand;
      biba: Brand;
    };
    subcategories: {
      dress: Subcategory;
      jeans: Subcategory;
    };
  };
}
