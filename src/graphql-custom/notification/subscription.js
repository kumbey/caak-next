export const onNoficationAdded = /* GraphQL */ `
  subscription OnNoficationAdded($section: String!, $to: ID!) {
    onNoficationAdded(section: $section, to: $to) {
      section
      to
      id
    }
  }
`;