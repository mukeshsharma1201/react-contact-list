import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';

class App extends Component {

  state = {
    contacts : []
  }

  removeContact = (contact) => {
    console.log('[removeContact] >> ',contact);
    
    ContactsAPI.remove(contact).then(() => {
      this.setState( (prevState) => {
        return {
          contacts : prevState.contacts.filter( function(item) {
            return (item.id !== contact.id)
          })
        }
      })
    });
    
  }

  componentDidMount(){
    ContactsAPI.getAll().then( (allContacts) => this.setState({contacts : allContacts}));
  }

  render() {
    return (
      <div>
        <ListContacts contacts={this.state.contacts} removeContact={this.removeContact} />
        <CreateContact />
      </div>
    )
  }
}

export default App;
