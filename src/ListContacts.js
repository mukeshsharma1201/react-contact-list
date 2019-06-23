import React ,{Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import escapeRegex from 'escape-string-regexp';


class ListContacts extends Component {
    
    static propTypes = {
        contacts : PropTypes.array.isRequired,
        removeContact : PropTypes.func.isRequired
    };

    state = {
        query : ""
    }

    updateQuery(query) {
        this.setState({
            query : query.trim()
        });    
    }

    clearSearch(){
        this.updateQuery("");
    }

    render(){

        const {contacts, removeContact} = this.props;
        const {query} = this.state;

        let showingContacts = [];

        if(query){
            const pattern = new RegExp(escapeRegex(query),'i');
            showingContacts = contacts.filter( (item) => pattern.test(item.name + item.email))
        }else{
            showingContacts = contacts;
        }

        showingContacts = _.sortBy(showingContacts,'name');

        return (
            <div className="list-contacts">
                <div className="list-contacts-top">
                    <input 
                        className = "search-contacts"
                        type = "text"
                        placeholder = "Search Contacts"
                        value = {query}
                        onChange = {(event) => this.updateQuery(event.target.value)}
                    />
                </div>
                
                {   showingContacts.length !== contacts.length && ( 
                        <div className="showing-contacts">
                            <span>Now showing {showingContacts.length} of {contacts.length} contacts</span>
                            <button onClick={() => this.clearSearch()}>Show All</button>
                        </div>
                )}

                <ol className="contact-list">
                {showingContacts.map((person) => (
                    <li key={person.id} className="contact-list-item">
                        <div className="contact-avatar" style={{
                            backgroundImage: `url(${person.avatarURL})`
                        }} />
    
                        <div className="contact-details">
                            <p>{person.name}</p>
                            <p>{person.email}</p>
                        </div>
    
                        <button className="contact-remove" onClick={() => removeContact(person)}>
                            Remove
                        </button>
                    </li>
                ))}
            </ol>
            </div>
        );
    }
    
}

export default ListContacts;