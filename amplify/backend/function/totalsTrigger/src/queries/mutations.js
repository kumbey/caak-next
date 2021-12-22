module.exports = {
    changedTotals: `mutation ChangedTotals($type: String!, $id: ID!, $totals: String!) {
        changedTotals(type: $type, id: $id, totals: $totals) {
            type
            id
            totals
        }
    }
    `
}