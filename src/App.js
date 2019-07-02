import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import {Route} from 'react-router-dom';
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

  createContact = (contact) => {
    ContactsAPI.create(contact).then( ( addedContact ) => {
      this.setState( (prevState) => ({
        contacts : prevState.contacts.concat( [ addedContact ])
      }))
    })
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <ListContacts contacts={this.state.contacts} removeContact={this.removeContact} />
        )}/>

        <Route path="/create" render={ ({ history }) => (
          <CreateContact onCreateContact = { (contact) => {
            if(contact.name && contact.email){
              this.createContact(contact);
              history.push("/");
            }else{
              console.error('Please Provide Name & Email.');
            }
          }} />
        )}/>
      </div>
    )
  }
}

export default App;
