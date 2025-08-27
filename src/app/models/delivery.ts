export interface Delivery {
    id: string;
    loanId: string;
    loan: {
        id: string;
        bookId: string;
        book: {
            id: string;
            title: string;
        };
        userId: string;
        user: {
            id: string;
            username: string;
            email: string;
        };
        startDate: string;
        returnDate: string;
        status: string;
    };
    status: string;
    deliveryDate?: string;
    userId?: string;         // assigned delivery man
    deliveryMan?: {
        id: string;
        username: string;
        email: string;
    };
}
