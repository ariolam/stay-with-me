# Stay with me 🏝

## Description

Play [here!]()

Stay with me is a website where the user make revervations for their dream destination.

## User stories

-   404 - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
-   500 - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
-   login-signup - As a user I want to see a welcome page that gives me the option to either log in as an existing user, or sign up with a new account.
-   add-signup - As a user I want to sign up with my username and passwword to make a reservation.
-   homepage - As a user I want to see the list of the accommondations available and be able to book a hotel or go to my profile from the home page.
-   hotel-list - As a user I want to see the options of the hotels searched, with all the information, including locations, availability dates. Also, to go back to the home page if I don't want to see that search anymore.
-   book-list - As a user I want to see more information about the booking, including total price, the information of the hotel, and the booking date. Also, to go back to the search results page if I don't want to see that item anymore.
-   success - As a user I want to see a success page that details of the reservation. Also, to go back to the home page when I'm done.

## Routes

-   GET /
    -   renders the homepage
-   GET /auth/signup
    -   redirects to / if user logged in
    -   renders the signup form
-   POST /auth/signup
    -   redirects to / if user logged in
    -   body:
        -   username
        -   password
-   GET /auth/login
    -   redirects to / if user logged in
    -   renders the login form (with flash msg)
-   POST /auth/login
    -   redirects to / if user logged in
    -   body:
        -   username
        -   password
-   GET /events
-   renders the event list + the create form
-   POST /events/create
    -   redirects to / if user is anonymous
    -   body:
        -   date
        -   location
        -   number of guests

## Models

### Hotel Model

```
name: String
guests: Number
location: String
pricePerNight: Number
```

### Booking Model

```
date: date
amount: Number
hotel: ObjectId<hotel>
```

## Links

-   [Figma](https://www.figma.com/file/XuuAKse7PF5Hs605ZH7DTD/Stay-with-me?type=design&node-id=0-1&mode=design&t=SuIGn9lG7MzPH4bY-0)
-   [Deployment Link]()
-   [Slides Link]()
