class AddressBook {
    constructor(name) {
        this.name = name; // Name of the address book (e.g., Family, Friends)
        this.contacts = [];
    }

    // Validation Helper Function
    validateInput(firstName, lastName, address, city, state, zip, phone, email) {
        const patterns = {
            name: /^[A-Z][a-z]{2,}$/, // Names must start with a capital letter and be at least 3 characters long
            address: /^.{4,}$/, // Address, city, and state must be at least 4 characters long
            zip: /^\d{6}$/, // Zip should be exactly 6 digits
            phone: /^\d{10}$/, // Phone should be exactly 10 digits
            email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // Valid email format
        };

        const validations = [
            { test: patterns.name.test(firstName), message: "First name must start with a capital letter and be at least 3 characters long." },
            { test: patterns.name.test(lastName), message: "Last name must start with a capital letter and be at least 3 characters long." },
            { test: patterns.address.test(address), message: "Address must be at least 4 characters long." },
            { test: patterns.address.test(city), message: "City must be at least 4 characters long." },
            { test: patterns.address.test(state), message: "State must be at least 4 characters long." },
            { test: patterns.zip.test(zip), message: "Zip code must be exactly 6 digits." },
            { test: patterns.phone.test(phone), message: "Phone number must be exactly 10 digits." },
            { test: patterns.email.test(email), message: "Email is not valid." }
        ];

        for (const validation of validations) {
            if (!validation.test) {
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
            throw new Error(`Duplicate entry: Contact '${firstName} ${lastName}' already exists in the address book.`);
        }

        this.contacts.push({ firstName, lastName, address, city, state, zip, phone, email });
    }

    // Method to print all contacts with detailed information
    print() {
        if (this.contacts.length === 0) {
            console.log(`${this.name} Address Book is empty.`);
        } else {
            console.log(`\n${this.name} Contact List:`);
            this.contacts.forEach((contact, index) => {
                console.log(`${index + 1}. Name: ${contact.firstName} ${contact.lastName}`);
                console.log(`   Address: ${contact.address}, ${contact.city}, ${contact.state} - ${contact.zip}`);
                console.log(`   Phone: ${contact.phone}`);
                console.log(`   Email: ${contact.email}`);
                console.log('-------------------------');
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
                this.contacts[i] = { firstName: newFirstName, lastName: newLastName, address: newAddress, city: newCity, state: newState, zip: newZip, phone: newPhone, email: newEmail };
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
            console.log("No address books available.");
            return;
        }

        this.addressBooks.forEach((book, index) => {
            console.log(`\nAddress Book ${index + 1} (${book.name}):`);
            book.print();
            console.log('---');
        });
    }
}

// Example usage
const manager = new AddressBookManager();
try {
    // Create new address books and add contacts
    const familyBook = manager.createAddressBook("Family");
    familyBook.add('Santhosh', 'Sekar', 'Vellore', 'Vellore', 'Tamil Nadu', '632002', '9952041871', 'Samuraisanthosh234@gmail.com');
    familyBook.add('Sathish', 'Kumar', 'Arni', 'Tiruvannamalai', 'Tamil Nadu', '632301', '9344991970', 'santhosh20sekar@gmail.com');

    const friendsBook = manager.createAddressBook("Friends");
    friendsBook.add('John', 'Doe', '123 Elm St', 'Springfield', 'Illinois', '627011', '1234567890', 'john.doe@example.com');
    friendsBook.add('Jane', 'Doe', '456 Oak St', 'Springfield', 'Illinois', '627012', '0987654321', 'jane.doe@example.com');

    // Get and print the number of contacts in the address books
    console.log(`Number of contacts in ${familyBook.name} Address Book: ${familyBook.getNumberOfContacts()}`);
    console.log(`Number of contacts in ${friendsBook.name} Address Book: ${friendsBook.getNumberOfContacts()}`);

    // Edit a contact in the Family address book
    familyBook.edit('Santhosh', 'Santhosh', 'Sekar', 'Pudhukamoor', 'Arni', 'New State', '123456', '9876543210', 'newemail@example.com');

    // Attempt to add a duplicate contact
    try {
        familyBook.add('Santhosh', 'Sekar', 'Another Address', 'Another City', 'Another State', '000000', '0000000000', 'duplicate@example.com');
    } catch (error) {
        console.error(error.message); // Handle duplicate entry error
        
        // Display current contacts after error
        familyBook.print(); // Display current contacts to show they remain unchanged
    }

    // Print all address books with detailed contact info
    manager.printAllBooks();

    // Remove a contact and reprint
    friendsBook.findAndDelete('John Doe');
    friendsBook.print();

} catch (error) {
    console.error(error.message); // Handle validation errors
}
