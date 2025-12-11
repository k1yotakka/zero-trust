const auditLogs = [];

function addAuditLog(event) {
  auditLogs.push({
    id: auditLogs.length + 1,
    ...event,
    timestamp: new Date().toISOString(),
  });
}

module.exports = { auditLogs, addAuditLog };
