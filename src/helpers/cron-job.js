"use strict";
const cron = require("node-cron");
const Order = require("../models/order.model");
const User = require("../models/user.model");

// Define a cron job that runs at midnight (00:00) every day
class CronJob {
  // update status of orders with expected date is over 1 month
  updateStatus() {
    cron.schedule(
      "0 0 * * *",
      async () => {
        try {
            const twoMonthsAgo = new Date();
        twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 1);

        // find orders with expected date is over 1 month & status is not delivered
        const orders = await Order.find({
          expectedDate: { $lt: twoMonthsAgo },
          status: { $ne: "delivered" },
        });

        // update status of orders
        await Promise.all(
          orders.map(async (order) => {
            order.status = "cancelled";
            await order.save();
          })
        );

        console.log(
          "Update status cancelled for orders with expected date is over 1 month"
        );
        } catch (error) { 
          console.log(error);  
        }
      },
      {
        scheduled: true,
        timezone: "Asia/Ho_Chi_Minh",
      }
    );
  }

  // remove users who are not in any department except admin
  removeUser() {
    cron.schedule(
      "0 0 * * *",
      async () => {
        try {
            const usersToRemove = await User.find({
                role: { $ne: "admin" }, // Exclude admin users
                departmentId: null, // Users without a department
              });
      
              // Remove the users found
              const deletionResult = await User.deleteMany({
                _id: { $in: usersToRemove.map((user) => user._id) },
              });
      
              console.log("Remove users who are not in any department except admin");
        } catch (error) {
            console.log(error);
        }
      },
      {
        scheduled: true,
        timezone: "Asia/Ho_Chi_Minh",
      }
    );
  }
}

const cronJobTaks = new CronJob();
module.exports = cronJobTaks;
