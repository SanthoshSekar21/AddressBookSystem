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

    add(firstName, lastName, address, city, state, zip, phone, email) {
        this.validateInput(firstName, lastName, address, city, state, zip, phone, email);
        this.contacts.push({ firstName, lastName, address, city, state, zip, phone, email });
    }

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

    remove(firstName) {
        const initialLength = this.contacts.length;
        this.contacts = this.contacts.filter(contact => contact.firstName !== firstName);
        console.log(initialLength > this.contacts.length ? `Contact with first name '${firstName}' has been removed from ${this.name}.` : `No contact found with first name '${firstName}' in ${this.name}.`);
    }

    search(firstName) {
        const contact = this.contacts.find(contact => contact.firstName === firstName);
        return contact ? contact : "Contact not found.";
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

    const friendsBook = manager.createAddressBook("Friends");
    friendsBook.add('John', 'Doe', '123 Elm St', 'Springfield', 'Illinois', '627011', '1234567890', 'john.doe@example.com');

    // Print all address books
    manager.printAllBooks();

    // Search for a contact in the Family address book
    console.log("Search Result in Family Book:", familyBook.search('Santhosh'));

    // Remove a contact from the Family address book
    familyBook.remove('Santhosh'); // Remove contact

    // Print all address books after removal
    manager.printAllBooks(); // Print after removal
} catch (error) {
    console.error(error.message); // Handle validation errors
}

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

    add(firstName, lastName, address, city, state, zip, phone, email) {
        this.validateInput(firstName, lastName, address, city, state, zip, phone, email);
        this.contacts.push({ firstName, lastName, address, city, state, zip, phone, email });
    }

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

    remove(firstName) {
        const initialLength = this.contacts.length;
        this.contacts = this.contacts.filter(contact => contact.firstName !== firstName);
        console.log(initialLength > this.contacts.length ? `Contact with first name '${firstName}' has been removed from ${this.name}.` : `No contact found with first name '${firstName}' in ${this.name}.`);
    }

    search(firstName) {
        const contact = this.contacts.find(contact => contact.firstName === firstName);
        return contact ? contact : "Contact not found.";
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

    const friendsBook = manager.createAddressBook("Friends");
    friendsBook.add('John', 'Doe', '123 Elm St', 'Springfield', 'Illinois', '627011', '1234567890', 'john.doe@example.com');

    // Print all address books
    manager.printAllBooks();

    // Search for a contact in the Family address book
    console.log("Search Result in Family Book:", familyBook.search('Santhosh'));

    // Remove a contact from the Family address book
    familyBook.remove('Santhosh'); // Remove contact

    // Print all address books after removal
    manager.printAllBooks(); // Print after removal
} catch (error) {
    console.error(error.message); // Handle validation errors
}

