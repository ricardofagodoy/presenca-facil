import firebase from 'firebase'

firebase.initializeApp({
    databaseURL: "https://presenca-facil-a8cee.firebaseio.com"
})

export default firebase.database()