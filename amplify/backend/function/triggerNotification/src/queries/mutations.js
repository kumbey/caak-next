module.exports = {
    notificationAdded: `mutation NotificationAdded($section: String!, $to: ID!, $id: ID!) {
        notificationAdded(section: $section, to: $to, id: $id) {
            section
            to
            id
        }
    }
    `
}