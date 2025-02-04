# pair-project
On Demand (traveloka/tiket.com)

1. Table
   a. Users
      - id (SERIAL)
      - email (VARCHAR)
      - password (VARCHAR)
      - role (VARCHAR)

   b. Tickets
      - id (SERIAL)
      - eTicketNumber (VARCHAR)
      - bookingReference (VARCHAR)
      - airlinesId (VARCHAR)
      - passengerId (INTERGER) REFERENCES (Passengers)
  
   c. Airlines
      - id (SERIAL)
      - name (VARCHAR)
      - codeFlight (VARCHAR)
      - totalSeat(VARCHAR)
  
   d. Passengers
      - id (SERIAL)
      - title (CHAR)(3)
      - firstName (VARCHAR)
      - lastName (VARCHAR)
      - dateOfBirth (DATE)
      - email (VARCHAR)
      - nationality (VARCHAR)
  
   e. Transactions
      - id (SERIAL)
      - codeTrx (VARCHAR)
      - idUser (INTERGER) REFERENCES (Users)
      - idTicket
      - totalPrice
      
   f. TransactionsDetail
      - id (SERIAL)
      - idTrx (INTEGER) REFERENCES (Transactions)
      - idPassengers
      - price
