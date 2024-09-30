class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phone = phone;
        this.email = email;
    }

    // Override toString method for better console output
    toString() {
        return `Name: ${this.firstName} ${this.lastName}, Address: ${this.address}, ${this.city}, ${this.state} - ${this.zip}, Phone: ${this.phone}, Email: ${this.email}`;
    }
}

class AddressBook {
    constructor(name) {
        this.name = name; // Name of the address book (e.g., Family, Friends)
        this.contacts = [];
    }

    validateInput(firstName, lastName, address, city, state, zip, phone, email) {
        console.log(`Validating: ${firstName}, ${lastName}, ${address}, ${city}, ${state}, ${zip}, ${phone}, ${email}`);
        
        const patterns = {
            name: /^[A-Z][a-z]{2,}$/, // Names must start with a capital letter and be at least 3 characters long
            address: /^.{4,}$/, // Address, city, and state must be at least 4 characters long
            zip: /^\d{5}$/, // Zip should be exactly 5 digits
            phone: /^\d{10}$/, // Phone should be exactly 10 digits
            email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // Valid email format
        };

        const validations = [
            { test: patterns.name.test(firstName), message: "First name must start with a capital letter and be at least 3 characters long." },
            { test: patterns.name.test(lastName), message: "Last name must start with a capital letter and be at least 3 characters long." },
            { test: patterns.address.test(address), message: "Address must be at least 4 characters long." },
            { test: patterns.address.test(city), message: "City must be at least 4 characters long." },
            { test: patterns.address.test(state), message: "State must be at least 4 characters long." },
            { test: patterns.zip.test(zip), message: "Zip code must be exactly 5 digits." },
            { test: patterns.phone.test(phone), message: "Phone number must be exactly 10 digits." },
            { test: patterns.email.test(email), message: "Email is not valid." }
        ];

        for (const validation of validations) {
            if (!validation.test) {
                console.error(`Validation failed: ${validation.message}`);
                throw new Error(validation.message);
            }
        }
    }

    // Method to check for duplicate contacts
    hasDuplicate(firstName, lastName) {
        return this.contacts.some(contact => 
            contact.firstName.toLowerCase() === firstName.toLowerCase() &&
            contact.lastName.toLowerCase() === lastName.toLowerCase()
        );
    }

    // Method to add a new contact
    add(firstName, lastName, address, city, state, zip, phone, email) {
        this.validateInput(firstName, lastName, address, city, state, zip, phone, email);
        
        // Check for duplicates
        if (this.hasDuplicate(firstName, lastName)) {
            console.warn(`Duplicate entry: Contact '${firstName} ${lastName}' already exists in the address book. Skipping addition.`);
            return; // Skip adding the duplicate and continue execution
        }

        this.contacts.push(new Contact(firstName, lastName, address, city, state, zip, phone, email));
        console.log(`Contact '${firstName} ${lastName}' has been added successfully.`);
    }

    // Method to print all contacts with detailed information
    print() {
        if (this.contacts.length === 0) {
            console.log(`${this.name} Address Book is empty.`);
        } else {
            console.log(`\n${this.name} Contact List:`);
            this.contacts.forEach((contact, index) => {
                console.log(`${index + 1}. ${contact.toString()}`);
                console.log('-------------------------');
            });
        }
    }

    // Method to sort contacts by name
    sortByName() {
        this.contacts.sort((a, b) => {
            const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
            const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
            return nameA.localeCompare(nameB);
        });
        console.log(`Contacts in '${this.name}' Address Book sorted by name.`);
    }

    // Method to search for contacts by city using filter
    searchByCity(city) {
        const filteredContacts = this.contacts.filter(contact => contact.city.toLowerCase() === city.toLowerCase());

        // Map to get a formatted string for each contact
        const contactDetails = filteredContacts.map(contact => `${contact.firstName} ${contact.lastName}, Address: ${contact.address}, Zip: ${contact.zip}`);

        this.displayContacts(contactDetails, `Contacts found in the city '${city}':`);
    }

    // Method to search for contacts by state using filter
    searchByState(state) {
        const filteredContacts = this.contacts.filter(contact => contact.state.toLowerCase() === state.toLowerCase());

        // Map to get a formatted string for each contact
        const contactDetails = filteredContacts.map(contact => `${contact.firstName} ${contact.lastName}, Address: ${contact.address}, City: ${contact.city}, Zip: ${contact.zip}`);

        this.displayContacts(contactDetails, `Contacts found in the state '${state}':`);
    }

    // Method to count contacts by city
    countByCity(city) {
        const count = this.contacts.filter(contact => contact.city.toLowerCase() === city.toLowerCase()).length;
        console.log(`Number of contacts in the city '${city}': ${count}`);
    }

    // Method to count contacts by state
    countByState(state) {
        const count = this.contacts.filter(contact => contact.state.toLowerCase() === state.toLowerCase()).length;
        console.log(`Number of contacts in the state '${state}': ${count}`);
    }

    // Method to display filtered contacts
    displayContacts(contactDetails, message) {
        if (contactDetails.length === 0) {
            console.log(`No contacts found.`);
        } else {
            console.log(message);
            contactDetails.forEach(detail => {
                console.log(`- ${detail}`);
            });
        }
    }

    // Method to remove a contact by first name or full name
    findAndDelete(name) {
        const index = this.contacts.findIndex(contact => 
            contact.firstName.toLowerCase() === name.toLowerCase() || 
            `${contact.firstName} ${contact.lastName}`.toLowerCase() === name.toLowerCase()
        );

        if (index !== -1) {
            const removedContact = this.contacts.splice(index, 1);
            console.log(`Contact '${removedContact[0].firstName} ${removedContact[0].lastName}' has been removed successfully from ${this.name} Address Book.`);
        } else {
            console.log(`No contact found with the name '${name}' in ${this.name} Address Book.`);
        }
    }

    // Linear search to find a contact by first name
    search(firstName) {
        const contact = this.contacts.find(contact => contact.firstName === firstName);
        return contact ? contact : "Contact not found.";
    }

    // Method to edit an existing contact by first name
    edit(existingFirstName, newFirstName, newLastName, newAddress, newCity, newState, newZip, newPhone, newEmail) {
        for (let i = 0; i < this.contacts.length; i++) {
            if (this.contacts[i].firstName === existingFirstName) {
                // Validate the updated inputs before applying changes
                this.validateInput(newFirstName, newLastName, newAddress, newCity, newState, newZip, newPhone, newEmail);

                // Check for duplicates
                if (this.hasDuplicate(newFirstName, newLastName)) {
                    throw new Error(`Duplicate entry: Contact '${newFirstName} ${newLastName}' already exists in the address book.`);
                }

                // Update contact details
                this.contacts[i] = new Contact(newFirstName, newLastName, newAddress, newCity, newState, newZip, newPhone, newEmail);
                console.log(`Contact '${existingFirstName}' has been updated successfully.`);
                return;
            }
        }
        console.log(`No contact found with the first name '${existingFirstName}'.`);
    }

    // Method to get the number of contacts in the address book
    getNumberOfContacts() {
        return this.contacts.length;
    }
}

// AddressBookManager to manage multiple AddressBook instances
class AddressBookManager {
    constructor() {
        this.addressBooks = []; // Array to hold multiple AddressBook instances
    }

    createAddressBook(name) {
        const newAddressBook = new AddressBook(name);
        this.addressBooks.push(newAddressBook);
        console.log(`New Address Book '${name}' created.`);
        return newAddressBook;
    }

    printAllBooks() {
        if (this.addressBooks.length === 0) {
            console.log("No Address Books available.");
        } else {
            console.log("List of Address Books:");
            this.addressBooks.forEach(book => console.log(`- ${book.name}`));
        }
    }
}

// Example usage
const manager = new AddressBookManager();
const familyAddressBook = manager.createAddressBook("Family");

// Adding contacts
familyAddressBook.add("John", "Doe", "123 Elm St", "Springfield", "Ohio", "62701", "1234567890", "john.doe@example.com");
familyAddressBook.add("Jane", "Smith", "456 Oak St", "Springfield", "Illinois", "62702", "0987654321", "jane.smith@example.com");
familyAddressBook.add("Alice", "Johnson", "789 Pine St", "Springfield", "Illinois", "62703", "1122334455", "alice.johnson@example.com");

// Print contacts before sorting
familyAddressBook.print();

// Sort contacts by name
familyAddressBook.sortByName();

// Print contacts after sorting
familyAddressBook.print();
