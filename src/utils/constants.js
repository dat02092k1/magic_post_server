const UtilConstant = {
    roleUsers: ["admin", 'headGathering', "headTransaction", 'transactionStaff', 'gatheringStaff'],
    SAL_ROUNDS: 10,
    statusOrder: ['pending', 'accepted', 'rejected', 'delivered'],
    typeOrder: ['document', 'goods'],
    HEADER: {
        API_KEY: 'x-api-key',
        CLIENT_ID: 'x-client-id',
        AUTHORIZATION: 'authorization',
    },
    typeDepartment: ['Gathering', 'Transaction'],
    gender: ["male", "female"]
}

module.exports = UtilConstant;