const UtilConstant = {
    roleUsers: ["admin", 'headGathering', "headTransaction", 'transactionStaff', 'gatheringStaff'],
    SAL_ROUNDS: 10,
    statusOrder: ['pending', 'accepted', 'rejected', 'delivered'],
    typeOrder: ['Tài liệu', 'Hàng hóa'],
    HEADER: {
        API_KEY: 'x-api-key',
        CLIENT_ID: 'x-client-id',
        AUTHORIZATION: 'authorization',
    },
    typeDepartment: ['Gathering', 'Transaction'],
}

module.exports = UtilConstant;