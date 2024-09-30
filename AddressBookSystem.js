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

    // Method to add a new contact
    add(firstName, lastName, address, city, state, zip, phone, email) {
        this.validateInput(firstName, lastName, address, city, state, zip, phone, email);
        this.contacts.push({ firstName, lastName, address, city, state, zip, phone, email });
    }

    // Method to print all contacts
    print() {
        if (this.contacts.length === 0) {
            console.log(`${this.name} Address Book is empty.`);
        } else {
            console.log(`${this.name} Contact List:`);
            this.contacts.forEach((contact, index) => {
                console.log(`${index + 1}. ${contact.firstName} ${contact.lastName}`);
            });
        }
    }

    // Method to remove a contact by first name
    remove(firstName) {
        const initialLength = this.contacts.length;
        this.contacts = this.contacts.filter(contact => contact.firstName !== firstName);
        console.log(initialLength > this.contacts.length ? `Contact with first name '${firstName}' has been removed from ${this.name}.` : `No contact found with first name '${firstName}' in ${this.name}.`);
    }

    // Linear search to find a contact by first name
    search(firstName) {
        for (let i = 0; i < this.contacts.length; i++) {
            if (this.contacts[i].firstName === firstName) {
                return this.contacts[i];
            }
        }
        return "Contact not found.";
    }

    // Method to edit an existing contact by first name
    edit(existingFirstName, newFirstName, newLastName, newAddress, newCity, newState, newZip, newPhone, newEmail) {
        for (let i = 0; i < this.contacts.length; i++) {
            if (this.contacts[i].firstName === existingFirstName) {
                // Validate the updated inputs before applying changes
                this.validateInput(newFirstName, newLastName, newAddress, newCity, newState, newZip, newPhone, newEmail);

                // Update contact details
                this.contacts[i].firstName = newFirstName;
                this.contacts[i].lastName = newLastName;
                this.contacts[i].address = newAddress;
                this.contacts[i].city = newCity;
                this.contacts[i].state = newState;
                this.contacts[i].zip = newZip;
                this.contacts[i].phone = newPhone;
                this.contacts[i].email = newEmail;

                console.log(`Contact '${existingFirstName}' has been updated successfully.`);
                return;
            }
        }
        console.log(`No contact found with the first name '${existingFirstName}'.`);
    }
}

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
            console.log(`Address Book ${index + 1} (${book.name}):`);
            book.print();
            console.log('---');
        });
    }
}

// Example usage
const manager = new AddressBookManager();
try {
    // Create new address books with names
    const familyBook = manager.createAddressBook("Family");
    familyBook.add('Santhosh', 'Sekar', 'Vellore', 'Vellore', 'Tamil Nadu', '632002', '9952041871', 'Samuraisanthosh234@gmail.com');
    familyBook.add('Sathish', 'Kumar', 'Arni', 'Tiruvannamalai', 'Tamil Nadu', '632301', '9344991970', 'santhosh20sekar@gmail.com');

    // Search using linear search
    console.log("Search Result in Family Book:", familyBook.search('Santhosh')); // Output: The contact details for 'Santhosh'
    
    // Edit an existing contact in the Family address book
    familyBook.edit('Santhosh', 'Santhosh', 'Sekar', 'Pudhukamoor', 'Arni', 'New State', '123456', '9876543210', 'newemail@example.com');

    // Print the Family address book to see the updated contact
    manager.printAllBooks();
} catch (error) {
    console.error(error.message); // Handle validation errors
}
