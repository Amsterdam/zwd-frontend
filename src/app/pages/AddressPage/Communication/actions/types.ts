type CommunicationNote = Components.Schemas.HomeownerAssociationCommunicationNote

export type FormValues = {
  date: CommunicationNote["date"]
  author_name: CommunicationNote["author_name"]
  note: CommunicationNote["note"]
}
