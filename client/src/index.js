import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import headshot from './headshot.png';
import axios from 'axios'
// import App from './App';


const DirectoryView = (props) => (
    <div className="directory">
        <SearchForm searchVal={props.searchVal} handleSubmit={props.handleSubmit} handleChange={props.handleChange} handleAdd={props.handleAdd} handleAddSubmit={props.handleAddSubmit}/>
        {props.contacts.map((contact, i) => <ContactCard name={contact.name} key={i} />)}
    </div>
);

const SearchForm = (props) => (
    <form>
        <input value={props.searchVal} placeholder="Enter client name for search" onChange={props.handleChange} />
        <button onClick={props.handleSubmit}><strong>Search</strong></button>

        <input value={props.addVal} placeholder="Add contact time elapsed" onChange={props.handleAdd} />
        <button onClick={props.handleAddSubmit}><strong>Add</strong></button>


    </form>
);

const Header = () => (
    <div className="header"> 
        <div><strong>Client Contact App</strong></div>
    </div>
);

const ContactCard = (props) => (
    <div className="card">
        <p>{props.name}</p>
    </div>
);


class App extends React.Component {
    state = {
        contacts: [
            {
                id: 1,
                name: 'John Adams',
                photo: headshot,
                phone: ['Mobile: 202-453-1567', 'Home: 202-234-7896'],
                dates: ['12-01-18', '12-31-18', '1-12-19'],
                time: []
            },
            {
                id: 2,
                name: 'Steve Beyers',
                photo: headshot,
                phone: ['Mobile: 515-435-1234', 'Home: 515-421-7895 '],
                dates: ['11-01-18', '12-11-18', '1-10-19'],
                time: []
            },
            {
                id: 3,
                name: 'Bill Carver',
                photo: headshot,
                phone: ['Mobile: 404-567-6789', 'Home: 678-120-0964'],
                dates: ['10-01-18', '11-1-18', '1-2-19'],
                time: []
            },
            {
                id: 4,
                name: 'Dee Davenport',
                photo: headshot,
                phone: ['Mobile: 202-234-6789', 'Home: 202-987-1207'],
                dates: ['9-01-18', '10-31-18', '11-12-19'],
                time: []
            },
            {
                id: 5,
                name: 'Barbara Feldman',
                photo: headshot,
                phone: ['Mobile: 678-564-3210', 'Home: 404-342-4567'],
                dates: ['10-21-18', '11-11-18', '1-10-19'],
                time: []
            },
            {
                id: 6,
                name: 'Garrett Hyatt',
                photo: headshot,
                phone: ['Mobile: ', 'Home: '],
                dates: ['11-18-18', '12-10-18', '1-3-19'],
                time: []
            },
            {
                id: 7,
                name: 'Fred Ingle',
                photo: headshot,
                phone: ['Mobile: ', 'Home: '],
                dates: ['10-14-18', '11-21-18', '1-8-19'],
                time: []
            },
            {
                id: 8,
                name: 'Beverly Kimball',
                photo: headshot,
                phone: ['Mobile: ', 'Home: '],
                dates: ['11-15-18', '12-19-18', '1-1-19'],
                time: []
            },
            {
                id: 9,
                name: 'George Lehman',
                photo: headshot,
                phone: ['Mobile: ', 'Home: '],
                dates: ['11-25-18', '12-18-18', '1-4-19'],
                time: []
            },
            {
                id: 10,
                name: 'Bill Manning',
                photo: headshot,
                phone: ['Mobile: ', 'Home: '],
                dates: ['11-5-18', '12-22-18', '1-6-19'],
                time: []
            },
            {
                id: 11,
                name: 'Raven Mable',
                photo: headshot,
                phone: ['Mobile: ', 'Home: '],
                dates: ['11-8-18', '12-2-18', '1-1-19'],
                time: []
            },
            {
                id: 12,
                name: 'Bill Nye',
                photo: headshot,
                phone: ['Mobile: ', 'Home: '],
                dates: ['11-23-18', '12-28-18', '1-2-19'],
                time: []
            },
            {
                id: 13,
                name: 'Oprah Payton',
                photo: headshot,
                phone: ['Mobile: ', 'Home: '],
                dates: ['11-6-18', '12-2-18', '1-1-19'],
                time: []
            },
            {
                id: 14,
                name: 'Steve Silverman',
                photo: headshot,
                phone: ['Mobile: ', 'Home: '],
                dates: ['11-7-18', '12-4-18', '1-7-19'],
                time: []
            },
            {
                id: 15,
                name: 'Mable Valens',
                photo: headshot,
                phone: ['Mobile: ', 'Home: '],
                dates: ['11-17-18', '12-10-18', '1-9-19'],
                time: []
            },
        ],
        selectedContact: null,
        searchVal: '',
        addVal: '',
        timerStarted: false,
        timerStopped: true,
        hours: 0,
        minutes: 0,
        seconds:0
    }

    handleChange = (event) => {
        this.setState({ searchVal: event.target.value });
    }

    handleAdd = (event) => {
       
        this.setState({ addVal: event.target.value});
    }


    handleSubmit = (event) => {
        event.preventDefault();
    
        const contactsFiltered = this.state.contacts.filter(contact => contact.name === this.state.searchVal);
        
        this.setState({ selectedContact: contactsFiltered, searchVal: '' }, () => console.log(this.state.selectedContact));
      }

    handleAddSubmit = (event) => {
        event.preventDefault();
        console.log('heyu');

        axios.post('/api/meeting', { clientId: this.state.selectedContact[0].id, time: this.state.addVal})
        .then((result) => {
        this.getContacts();
      })   
    }

    getContacts = () => {
        axios.get('/api/meeting')
          .then((result) => {
              console.log("in get contacts")
            this.setState({ notesList: result.data })
          });
      }
    
      componentDidMount() {
        this.getContacts();
      }
    
      handleTimerStart = (e) => {
          e.preventDefault();

        if(this.state.timerStopped){
            this.timer = setInterval(() => {
                
                    this.setState( {timerStarted: true, timerStopped: false});
                    if(this.state.timerStarted){
                        if(this.state.seconds >= 60){
                            this.setState((prevState) => ({minutes: prevState.minutes + 1, seconds: 0}));
                        } 
                        if(this.state.minutes >= 60){
                            this.setState((prevState) => ({ hours: prevState.hours + 1, minutes: 0, seconds: 0}));
                        }
                        this.setState((prevState) => ({ seconds: prevState.seconds + 1}));
                    }

                
            }, 1000);
      }
    }
    handleTimerStop = (e) => {
        e.preventDefault();

        this.setState({ timerStarted: false, timerStopped: true})
        clearInterval(this.timer);
        
    }
    resetTimer = (e) => {
        e.preventDefault();

        this.setState({ hours: 0, minutes: 0, seconds: 0 })
    }


    render() {
        return (
            <div>
            <Header/>
            <div className="container-body">
            <div className="contact-name">
            <DirectoryView 
                contacts={this.state.contacts}
                searchVal={this.state.searchVal}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                addVal={this.state.addVal}
                handleAdd={this.handleAdd}
                handleAddSubmit={this.handleAddSubmit}
                />
            </div>
            <div className="selected-contact">
                {
                  this.state.selectedContact ? 
                   this.state.selectedContact.map((contact, i) => {
                       console.log(contact.photo)
                      return(
                        <div className="selected" key={i}>
                        <div className="stop-watch">{this.state.hours + ':' + this.state.minutes + ':' + this.state.seconds}
                        <button className="start" onClick={this.handleTimerStart.bind(this)} type="button"  ><strong>Start</strong></button>
                        <button className="stop" onClick={this.handleTimerStop.bind(this)} type="button"><strong>Stop</strong></button>
                        <button className="reset" onClick={this.resetTimer.bind(this)} type="button"><strong>Reset</strong></button>
                        </div>
                        <p className="headingPhoto">
                         <img src={contact.photo} />
                        </p>
                        <p className="headingName">{contact.name}</p>
                        <div className="content">
                            <div className="content phone">
                            <p className="headingPhone"><b>PHONE</b> <br></br>{contact.phone.map((e, i) => {return<div key={i}> {e}</div> })}</p>
                            </div>
                            <div className="content contacts">
                            <p className="headingContacts"><b>DATES OF CONTACT</b> <br></br>{contact.dates.map((e, i) => {return <div key={i}>{e}</div>})}</p>
                            </div>
                        </div>
                            <div className="times">
                            <p className="headingTimes"><b>TIME</b> <br></br>{this.state.addVal}</p>      
                            </div>
                            <div>
                                <p className="headingMeeting"><b>MEETING TIMES</b> <br></br>{this.state.notesList.filter( note  => note.clientId == this.state.selectedContact[0].id ).map(note => note.time)}</p>
                            </div>
                        </div>
                      ) 
                  })
                  :
                  ""
                }
            </div>
                
            </div>
            </div>
        );
    } 
}



ReactDOM.render(<App />, document.getElementById('root'));
