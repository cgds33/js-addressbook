# js-addressbook

# This project is not finished yet. 


## Project API Services

### Address Book

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


#### `DELETE >> "/api/delete/by_name"`

This method deletes an address based on the "name_surname" information sent in the "info".


#### `UPDATE >> "/api/update_address"`

This method is just like creating a new address, but the "info" keyword must contain the name to be updated and the information to be updated must be sent within the "update" keyword.


#### `GET >> "/api/fetch/by_name"`

It is used to call all the data in the address information by name. The "info" keyword must contain the "name_surname".


#### `GET >> "/api/fetch/email"`

It is used to call all the data in the address information by email. The "info" keyword must contain the "email".


#### `GET >> "/api/fetch/phone"`

It is used to call all the data in the address information by phone. The "info" keyword must contain the "phone".


#### `GET >> "/api/fetch/all"`

It is used to call all addresses of the user. You don't need to send any information in "info".












