const mongoose = require("mongoose");
const { faker } = require('@faker-js/faker');
const Order = require("../models/order.model")
const utilContainers = require("../utils/constants");
require('../database/init.db');

const ordersSeeding = async () => {
    const ordersSeeding = [];
    const targetYear = 2020;

    for (let i = 0; i < utilContainers.numberSeeding; i++) {
        ordersSeeding.push({
            sender: faker.person.fullName(),
            senderPhone: faker.phone.number(),
            receiverPhone: faker.phone.number(),
            types: utilContainers.typeOrder[Math.floor(Math.random() * utilContainers.typeOrder.length)],
            receiver: faker.person.fullName(),
            send_department: "6571dacc6129eddda193f9e4",
            current_department: "6571dacc6129eddda193f9e4",
            next_department: "6571b9c796b64034c33e3a6c",           
            receive_department: "6571e3237a4296c84b8f4c45",
            description: [faker.lorem.sentence()],
            price: faker.datatype.number(),
            status: "processing",
            weight: faker.datatype.number(),
            expectedDate: faker.date.between(new Date(`${targetYear}-01-01`), new Date(`${targetYear}-12-31`)),
            COD: faker.datatype.number(),
            orderNotice: faker.lorem.sentence(),
            createdAt: faker.date.between(new Date(`${targetYear}-01-01`), new Date(`${targetYear}-12-31`)),
        })
    }

    try {
        await Order.insertMany(ordersSeeding);
        console.log('data seeding done');
    }
    catch (error) {
        console.log(error);
    }
}

ordersSeeding(); // call seeding function 