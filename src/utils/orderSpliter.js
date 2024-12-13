const splitOrder = (order) => {
    const subOrders = {};

    order.item.forEach((item) => {
        const vendorKey = item.vendorId;

        if (!subOrders[vendorKey]) {
            subOrders[vendorKey] = {
                userId: order.userId,
                email: order.email,
                shippingAddress: order.shippingAddress,
                paymentMethod: order.paymentMethod,
                status: "pending",
                items: [],
                total_price: 0
            };
        }

        subOrders[vendorKey].items.push({
            vendorId: item.vendorId,
            productId: item.productId,
            quantity: item.quantity,
        });

        subOrders[vendorKey].total_price += item.unitPrice * item.quantity;
    });

    return Object.values(subOrders);
};

module.exports = splitOrder;

// const testPayload = {
//     "userId": "675ada912bb752c5479b77c1",
//     "email": "leeming1923@gmail.com",
//     "item": [
//         {
//         "vendorId": "67580024d810f3bf764bea79",
//         "productId": "675b1dbba5466a10323a54a0",
//         "quantity": 1,
//         "unitPrice": 1034
//         },
//         {
//         "vendorId": "6755be3fe5b7d5e8a3bb3a46",
//         "productId": "675b611799d95d5f733d603c",
//         "quantity": 1,
//         "unitPrice": 1002
//         },
//         {
//         "vendorId": "6755be3fe5b7d5e8a3bb3a46",
//         "productId": "675b611799d95d5f733d603c",
//         "quantity": 1,
//         "unitPrice": 1002
//         }
//     ],
//     "paymentMethod": "card", //["card", "transfer", "cash_on_delivery"]
//     "shippingAddress": "Block 911, Dome X64, Section vx-666, Afrasia"
// }
// const test = splitOrder(testPayload);
// console.log('testSplit: ', test);