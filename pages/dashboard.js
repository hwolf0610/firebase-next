// pages/dashboard.js
import React from 'react';
// import Nav from '../components/nav';
import withAuth from './helpers/withAuth';
import firebase from 'firebase';

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            dataList: [],
            selectedId: '',
            newId: ''
        }
    }

    async componentDidMount() {
        var tutorialsRef = await firebase.database().ref("/tutorials");
        var tutorials = [];
        await tutorialsRef.on('value', function (snapshot) {
            console.log('snapchat : ', snapshot)
            snapshot.forEach(function (childSnapshot) {

                var key = childSnapshot.key;
                var data = childSnapshot.val();
                // ...
                console.log('id : ', data.id)
                tutorials.push({ key: key, id: data.id });
            });
        });
        console.log('data : ', tutorials, this.state.dataList)
        this.setState({
            dataList: tutorials
        })
       
    }
    render() {
        return (
            <div>
                {/* <Nav /> */}
                <h1>Dashboard  Page</h1>
                <p>You can't go into this page if you are not authenticated.</p>
                {
                   this.state.dataList.map((item, index) => {
                        return (
                            <p key={index}>id: {item.key}, value: {item.id}</p>
                        )
                    })
                }
                <input type="text" placeholder="type your id" value={this.state.id} onChange={(e) => {
                    this.setState({
                        id: e.target.value
                    })
                }} />
                <button type="button" onClick={async () => {
                    var tutorialsRef = await firebase.database().ref("/tutorials");
                    tutorialsRef.push({
                        id: this.state.id
                    });
                }} >Add Id</button><br/>

                 <input type="text" placeholder="type your key" value={this.state.selectedId} onChange={(e) => {
                    this.setState({
                        selectedId: e.target.value
                    })
                }} />
                <input type="text" placeholder="type your id" value={this.state.newId} onChange={(e) => {
                    this.setState({
                        newId: e.target.value
                    })
                }} />
                <button type="button" onClick={async () => {
                    var tutorialsRef = await firebase.database().ref("/tutorials");
                    tutorialsRef.child(this.state.selectedId).update({
                        id: this.state.newId
                    });
                }} >Update Id</button>
                <button type="button" onClick={async () => {
                    var tutorialsRef = await firebase.database().ref("/tutorials");
                    tutorialsRef.child(this.state.selectedId).remove();
                }} >Remove Id</button>
            </div>
        )
    }
}
export default withAuth(Dashboard);