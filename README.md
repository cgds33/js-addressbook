# js-addressbook

## Summary

This project is a project that includes the architecture where new services can be added easily and includes the "address book" application as its first service.

New services to be created can be seamlessly added to this project. It includes session control and provides API support for the mobile app. This API support will be developed according to new applications to be written for different platforms.

Built using JavaScript and mongoDB. While creating this application, a modular structure was used.

<br>

## Project features

Project includes session control and API service. Application saves user and session information to MongoDB.

It has API service and detailed API documentation. 

Currently, there is an application called address book and new applications will be added to the project.

<br>

## Features to come with the next update

### On Address Book

- Address entries will also be updated from the interface.
- Users will be able to reset their passwords.
- Addresses can be searched on the interface

<br>

## Web İnterface

There are pages in the web interface where data can be entered directly. Also, the entered data is listed.

There are structures that give general information about the services. Newly created services can be added here.

<br>

## Project API Services

<br>

### Address Book API

API methods contain the login information of the users in the requests of the posts. The transaction takes place through this information.

{
  "user": {
    "userEmail": "example@example.com",
    "userPassword": "examplePassword"
  }
}

Each user's address list can contain a person with the same name. This name will be sent to the server side in operations such as updating or deleting.

{
"info": {
		"name_surname":"updatedName"
	}
}

<br>

#### `POST >> "/api/add_address"`

This request; creates a new address record.

The information of the address to be created should be sent with the keyword "info".

{
	"info": {
		"name_surname":"exampleName",
		"address":"exampleAddress",
		"phone":"+905555555555",
		"workPhone":"+906666666666",
		"email":"example@example.com",
		"workEmail":"example@work.com",
		"companyName":"exampleCompany"
	}
}

When creating a new address, name, address and phone keywords should be sent.

<br>

#### `DELETE >> "/api/delete/by_name"`

This method deletes an address based on the "name_surname" information sent in the "info".

<br>

#### `UPDATE >> "/api/update_address"`

This method is just like creating a new address, but the "info" keyword must contain the name to be updated and the information to be updated must be sent within the "update" keyword.

<br>

#### `GET >> "/api/fetch/by_name"`

It is used to call all the data in the address information by name. The "info" keyword must contain the "name_surname".

<br>

#### `GET >> "/api/fetch/email"`

It is used to call all the data in the address information by email. The "info" keyword must contain the "email".

<br>

#### `GET >> "/api/fetch/phone"`

It is used to call all the data in the address information by phone. The "info" keyword must contain the "phone".

<br>

#### `GET >> "/api/fetch/all"`

It is used to call all addresses of the user. You don't need to send any information in "info".

<br>

### Response

Responses come as a json with two keywords. These are the keywords "answer" and "msg".

For example: { "answer": "success","msg": "address was deleted" }

The keyword "answer" takes two values, "success" and "error", and indicates whether the request was successful.

The "msg" keyword contains the reason for the "answer" key. 

<br><br>












