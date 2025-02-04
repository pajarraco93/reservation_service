# Project: Reservation Service

## 📌 Description
The main goal of this service is to simulate a microservice which will be receving data ideally from a frontend, storing reservations done during a normal day in a restaurant. Since this a simple test we have implemented it with a inmemory repository which 
 
Throughout this technical test, it is expected to demonstrate several concepts, such as problem-solving capacity, hexagonal architecture, design and code quality, scalability and efficiency, as well as debugging and testing.

## 🚀 Technologies Used
- **Main language**: TypeScript
- **Frameworks**: Node, Express
- **Other tools**: Jest


## 📂 Project Structure
```bash
📦 reservation_service
├── src/
│   ├── application/
│   ├── domain/
│   ├── infra/
│   ├── interfaces/
│   ├── shared/
│   ├── main.ts
├── package.json
├── README.md
```

## 🔧 Installation & Execution
### 1️⃣ Prerequisites
- Node v22.13.1: we must have the LTS node version insalled in our environment.

### 2️⃣ Clone the project
```bash
# Clone the repository
git clone https://github.com/pajarraco93/reservation_service.git
cd reservation_service
```

### 3️⃣ Configuration
Create a `.env` file at the root with the following variables:
```env
APP_NAME=reservation_service
```

### 4️⃣ Running the Project
```bash
npm run build
npm run start
```

## 🌐 API Endpoints
### 1. Get Reservation
**Endpoint:**
```http
GET /reservation/{id}
```
**Response:** 200
```json
{
    "id": "bc066704-1597-402f-9e26-f1bf3f112a99",
    "customerName": "Thrall",
    "customerEmail": "thrall@fake.com",
    "partySize": 2,
    "startsAt": "2025-02-01T11:00:00.000Z",
    "endsAt": "2025-02-01T11:45:00.000Z",
    "table": {
        "id": "1",
        "capacity": 2
    },
    "status": "reserved"
}
```

### 2. Create a Reservation
**Endpoint:**
```http
POST /reservation
```
**Request Body:**
```json
{
    "partySize": 2,
    "customerName": "Thrall",
    "customerEmail": "Thrall@fakemail.com",
    "datetime": "2025-02-01T12:00:00.000"
}
```
**Response:** 201
```json
{
    "id": "bc066704-1597-402f-9e26-f1bf3f112a99",
    "customerName": "Thrall",
    "customerEmail": "thrall@fake.com",
    "partySize": 2,
    "startsAt": "2025-02-01T11:00:00.000Z",
    "endsAt": "2025-02-01T11:45:00.000Z",
    "table": {
        "id": "1",
        "capacity": 2
    },
    "status": "reserved"
}
```

### 3. Update a Reservation
**Endpoint:**
```http
PUT /reservation/{id}
```
**Request Body:** 200
```json
{
    "customerName": "Thrall",
    "customerEmail": "thrall@fake.com",
}
```

### 4. Delete a Reservation
**Endpoint:**
```http
DELETE /reservation/{id}
```
**Response:** 204


### 5. Get availabilty
**Endpoint:**
```http
GET /availability?datetime={datetime}?partySize={partySize}
```
**Response:** 200
```json
[
    "1/2/2025, 12:45:00",
    "1/2/2025, 13:00:00",
    "1/2/2025, 13:15:00",
    "1/2/2025, 13:30:00",
    "1/2/2025, 13:45:00",
    "1/2/2025, 14:00:00",
    "1/2/2025, 14:15:00",
    ...
]
```

## 🧪 Tests
```bash
# To run unit tests
npm run utest
# To run all the tests (integration and unit)
npm run test
```

## 📌 Technical Decisions
Some interesting decisions made during the project development are:
- Functional programming since the entities are simple and we don't need to handle big classes. Also as a personal challenge due to I've been programming in Python recently and I wanted to remember concepts.  
- We have taken the decision of using hexagonal architecture in order to ensure the decoupling of the bussiness logic and making it easier to develop, test and scale. 
- Implementation of our own custom container for dependency injeccion to facilitate the testing. 
- We decided to store the reservation in the same varibale and tackling the waitlist throught the reservation status with the objective of unifying the logic in the same place.
- Feature branching and Pull request to split the development between features in order to make them easier to visualize, revert it and versioning. 

## 🚀 Optimization & Scalability
The service has been designed to support a huge number of requests at the same time. To achieve this, we have implemented the following: 
- A background scheduler with queues to perform the notifications for avoiding extra processing in the service.
- If we persist the data in a relational database we can index the dates to improve querying and filtering.
- Usage of a dependency injector library to ensure optimal dependency instantiation and improve reusability (singleton, factories, etc). 

## 🛠️ Possible Improvements
In the future, we can improve the service by tackling the following ideas:
- Build API a documentation with some tool like Swagger to clarify specifications. 
- Persist data to have a data history of all the reservations, this can have several usages: having better trazability and monitoringa also data can be useful for other usages like analytics and reporting. It probably will improve the performance for large amounts of data. 
- Since the principal function of the app depends on datetime we should normalize the format to avoid timezone problems. 
- We should take a look to the data processing in order to improve the processing costs. For example, we should a look to the way we are calculating busy slots and look for possible improvements, like data structure improvements, also we could change the `forEach` js method with `for in` due to they are faster.
- We can easily add one additional layer to our implementation for handling several restaurant at the same time. 
- We can add some logic bussines improvements like ensuring we are reserving the smallest table that fits with our partySize or the capacity to discard reservations if the partySize is to small for the capacity e.g: avoid reserving the last free table has a capacity of 10 and the petition partySize is 2. 
