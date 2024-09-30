// Address Book Contact Constructor
class AddressBook {
    constructor() {
      this.contacts = [];
    }
  
    add(firstName, lastName, address, city, state, zip, phone, email) {
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
  
      if (this.contacts.length < initialLength) {
        console.log(`Contact with first name '${firstName}' has been removed.`);
      } else {
        console.log(`No contact found with first name '${firstName}'.`);
      }
    }
    
    // Search for a contact by first name
    search(firstName) {
      return this.contacts.find(contact => contact.firstName === firstName) || "Contact not found.";
    }
  }
  
  // Example usage
  const c1 = new AddressBook();
  c1.add('Santhosh', 'Sekar', 'Vellore', 'Vellore', 'Tamil Nadu', 632002, 9952041871, 'Samuraisanthosh234@gmail.com');
  c1.add('Santhish', 'S', 'Arni', 'Tiruvannamalai', 'Tamil Nadu', 632301, 9344991970, 'santhosh20sekar@gmail.com');
  
  // Print all contacts
  c1.print();
  
  // Search for a contact
  console.log("Search Result:", c1.search('Santhosh'));
  
  // Remove contact with first name 'Santhosh'
  c1.remove('Santhosh');
  
  // Print after removal
  c1.print();
  