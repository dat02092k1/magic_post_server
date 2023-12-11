const ACL = require('acl');
const acl = new ACL(new ACL.memoryBackend());

acl.allow([
    {
        roles: 'admin',
        allows: [
            { resources: '/v1/api/department', permissions: '*' },
            { resources: '/v1/api/department/:id', permissions: '*' },
            { resources: '/v1/api/user', permissions: '*' },
            { resources: '/v1/api/user/create', permissions: '*' },
        ]
    },
    {
        roles: 'user',
        allows: [
            { resources: '/v1/api/department', permissions: ['get'] },
            { resources: '/v1/api/department/:id', permissions: ['get'] },
            { resources: '/v1/api/user', permissions: ['get'] },
            { resources: '/v1/api/user/:id', permissions: ['get'] },
        ]
    }
])

function aclMiddleware(req, res, next) {
    const userRole = req.user.role; // Assuming `req.user.role` is set
    const url = req.url;
    const method = req.method.toLowerCase();
     
    acl.areAnyRolesAllowed(userRole, url, method, function(err, isAllowed) {
      if (err) {
        // An authorization error occurred.
        return res.status(500).send('Unexpected authorization error');
      } else {
        if (isAllowed) {
          // Access granted! Invoke next middleware
          return next();
        } else {
          return res.status(403).send('Insufficient permissions');
        }
      }
    });
  }

  module.exports = {
    aclMiddleware,
  };