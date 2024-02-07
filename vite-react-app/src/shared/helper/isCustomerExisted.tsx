
export default function isCustomerExisted(customersData: any, name: string, email: string) {
    const existedCustomer: any = customersData.find((customer: any) =>
        customer.name === name && customer.email === email
    );

    return (existedCustomer !== undefined);
}
