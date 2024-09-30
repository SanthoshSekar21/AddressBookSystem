class AddressBook {
    constructor() {
        this.contacts = [];
    }

    // Validation Helper Function
    validateInput(firstName, lastName, address, city, state, zip, phone, email) {
        const patterns = {
            name: /^[A-Z][a-z]{2,}$/, // First and last name must start with a capital letter and be at least 3 characters long
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
            console.log("Address book is empty.");
        } else {
            console.log("Contact List:");
            this.contacts.forEach((contact, index) => {
                console.log(`${index + 1}. ${contact.firstName} ${contact.lastName}`);
            });
        }
    }

    remove(firstName) {
        const initialLength = this.contacts.length;
        this.contacts = this.contacts.filter(contact => contact.firstName !== firstName);
        console.log(initialLength > this.contacts.length ? `Contact with first name '${firstName}' has been removed.` : `No contact found with first name '${firstName}'.`);
    }
    
    search(firstName) {
        const contact = this.contacts.find(contact => contact.firstName === firstName);
        return contact ? contact : "Contact not found.";
    }
}

// Example usage
const contactList = new AddressBook();
try {
    contactList.add('Santhosh', 'Sekar', 'Vellore', 'Vellore', 'Tamil Nadu', '632002', '9952041871', 'Samuraisanthosh234@gmail.com');
    contactList.add('Sathish', 'Kumar', 'Arni', 'Tiruvannamalai', 'Tamil Nadu', '632301', '9344991970', 'santhosh20sekar@gmail.com');
    
    contactList.print(); // Print all contacts
    console.log("Search Result:", contactList.search('Santhosh')); // Search for a contact
    contactList.remove('Santhosh'); // Remove contact
    contactList.print(); // Print after removal
} catch (error) {
    console.error(error.message); // Handle validation errors
}//
