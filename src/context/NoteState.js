import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = 'https://notes-api-mfue.onrender.com'

  // eslint-disable-next-line
  const initialNotes = []

  const [notes, setNotes] = useState(initialNotes)
  const [authToken, setAuthToken] = useState(sessionStorage.getItem('authToken'))

  // function to 'LOG IN'
  const logIn = async (email, password) => {
    // data in the form of an OBJECT to send with the API CALL
    const data = {
      "email": email,
      "password": password
    }
    // API CALL
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    const json = await response.json()

    //setting response/status to the user
    if (json.status === 'success') {
      sessionStorage.setItem('authToken', json.authToken)
      setAuthToken(json.authToken)
      getUser(json.authToken)
      //setting NOTE DISPLAY PAGE'S STATUSES ON API CALL SUCCESS
      setTimeout(() => {
        setDisplayPageStatus({
          "status": json.status,
          'msg': json.msg
        })
        setTimeout(() => {
          setDisplayPageStatus({
            "status": "",
            'msg': ""
          })
        }, 3000);
      }, 100);
    } else {
      //setting NOTE DISPLAY PAGE'S STATUSES ON API CALL FAILED
      setLoading(false)
      setSignPageStatus({
        "status": json.status,
        'msg': json.msg
      })
      setTimeout(() => {
        setSignPageStatus({
          "status": "",
          'msg': ""
        })
      }, 3000);
    }
  }

  // function to 'SIGN UP'
  const signUp = async (name, email, password) => {
    // data in the form of an OBJECT to send with the API CALL
    const data = {
      "name": name,
      "email": email,
      "password": password
    }
    // API CALL
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data)
    });
    const json = await response.json()
    //setting SIGN PAGE'S STATUSES ON API CALL SUCCESS
    setLoading(false)
    setSignPageStatus({
      "status": json.status,
      'msg': json.msg
    })
    setShowSignIn(true) // SUCCESS
    setTimeout(() => {
      setSignPageStatus({
        "status": "",
        'msg': ""
      })
    }, 3000);
  }

  // function to get user details
  const getUser = async (authToken) => {
    // API CALL
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "authToken": authToken
      }
    });
    const json = await response.json()
    // SETTING USER DEATAILS GOT IN RESPONSE OF THE API CALL
    sessionStorage.setItem('name', json.name)
    // setUserDetails(json)
  }

  //function to fetc all the notes from the database
  const getNotes = async () => {
    try {
      // API CALL
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "authToken": sessionStorage.getItem('authToken')
        }
      });
      const json = await response.json()

      // converting the response in the opposite order , so the latest note can be on top
      let dataOpposite = []
      let j = json.length - 1;
      for (let i = 0; i < json.length; i++) {
        dataOpposite[j] = json[i];
        j--;
      }
      // SETTING ALL THE NOTES IN THE NOTE LIST
      setNotes(dataOpposite)
      // setting the initial note
      if (dataOpposite[0]) {
        await setDisplayingNote(dataOpposite[0])
        setLoading(false)
      } else {
        setDisplayingNote({
          'title': `Welcome`,
          'description': "Add your note please.",
          'tag': 'Learning',
          'date': "idk when",
          "_id": "abcdef123456"
        })
      }
    } catch {
      setLoading2(false)
      setDisplayPageStatus({
        "status": "failed",
        "msg": "Error! Check your internet and try again"
      })
      setTimeout(() => {
        setDisplayPageStatus('')
      }, 3000);
    }
  }

  //function to add a note
  const addNote = async (title, description, tag) => {
    try {
      // data in the form of an OBJECT to send with the API CALL
      const data = {
        "title": title,
        "description": description,
        "tag": tag
      }
      // API CALL
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "authToken": authToken,
        },
        body: JSON.stringify(data)
      });
      const json = await response.json()
      //setting NOTE DISPLAY PAGE'S STATUSES ON API CALL 
      await getNotes()
      setLoading2(false)
      setDisplayPageStatus({
        "status": json.status,
        "msg": json.msg
      })
      setTimeout(() => {
        setDisplayPageStatus('')
      }, 3000);
    } catch {
      setLoading2(false)
      setDisplayPageStatus({
        "status": "failed",
        "msg": "Error! Check your internet and try again"
      })
    }
    setTimeout(() => {
      setDisplayPageStatus('')
    }, 3000);
  }

  //function to delete the selected note
  const deleteNote = async (id) => {
    try {
      //API CALL
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "authToken": authToken
        }
      })
      let json = await response.json()
      //setting NOTE DISPLAY PAGE'S STATUSES ON API CALL 

      await getNotes()
      setLoading2(false)
      setDisplayPageStatus({
        "status": json.status,
        'msg': json.msg
      })
      setTimeout(() => {
        setDisplayPageStatus({
          "status": "",
          'msg': ""
        })
      }, 3000);
    } catch {
      setLoading2(false)
      setDisplayPageStatus({
        "status": "failed",
        "msg": "Error! Check your internet and try again"
      })
      setTimeout(() => {
        setDisplayPageStatus('')
      }, 3000);
    }
  }

  //function to update the selected note
  const updateNote = async (id, title, description, tag) => {
    try {
      // data in the form of an OBJECT to send with the API CALL
      const data = {
        "title": title,
        "description": description,
        "tag": tag
      }
      //API CALL
      // eslint-disable-next-line
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "authToken": authToken
        },
        body: JSON.stringify(data)
      });
      let json = await response.json()
      //setting NOTE DISPLAY PAGE'S STATUSES ON API CALL 
      setDisplayPageStatus({
        "status": json.status,
        'msg': json.msg
      })
      setTimeout(() => {
        setDisplayPageStatus({
          "status": "",
          'msg': ""
        })
      }, 3000);

      // not using getNote() because it will make the latest note as displaying note
      //updating the note list and keeping the display note as it was
      let idToCheck = displayingNote._id
      const response2 = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "authToken": authToken
        }
      });
      const json2 = await response2.json()

      // converting the response in the opposite order , so the latest note can be on top
      let dataOpposite = []
      let j = json2.length - 1;
      for (let i = 0; i < json2.length; i++) {
        dataOpposite[j] = json2[i];
        j--;
      }
      setNotes(dataOpposite)
      //setting display note as it was
      for (let i = 0; i < notes.length; i++) {
        if (dataOpposite[i]._id === idToCheck) {
          setDisplayingNote({
            "title": dataOpposite[i].title,
            'description': dataOpposite[i].description,
            'tag': dataOpposite[i].tag,
            'date': dataOpposite[i].date,
            "_id": dataOpposite[i]._id
          })
        }
      }
    } catch {
      setLoading2(false)
      setDisplayPageStatus({
        "status": "failed",
        "msg": "Error! Check your internet and try again"
      })
      setTimeout(() => {
        setDisplayPageStatus('')
      }, 3000);
    }
  }

  //DISPLAYING NOTE STATE i.e. TO DISPLAY NOTES
  const [displayingNote, setDisplayingNote] = useState('')

  //STATE TO SWITCH B/W NOTE PAGE and AUTH PAGE
  const [toDisplay, setToDisplay] = useState(false)
  // STATE TO SHOW RESPONSE/NOTIFICATION ON AUTH PAGE
  const [signPageStatus, setSignPageStatus] = useState('')
  // STATE TO SHOW RESPONSE/NOTIFICATION ON NOTE PAGE
  const [displayPageStatus, setDisplayPageStatus] = useState('');
  // STATE TO SWITCH BETWEN SIGN UP AND SIGN IN PAGE
  const [showSignIn, setShowSignIn] = useState(true)
  // STATE TO SHOW AND SET LOGGED IN USER DETAILS
  const [userDetails, setUserDetails] = useState('')
  //STATE TO SHOW AND SET LOADER
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [activeClass, setActiveClass] = useState('')
  const [theme, setTheme] = useState('dark')

  return (
    <NoteContext.Provider value={{ notes: notes, displayingNote: displayingNote, setDisplayingNote: setDisplayingNote, toDisplay, setToDisplay, authToken, setAuthToken, signUp, logIn, addNote, getNotes, deleteNote, signPageStatus, displayPageStatus, setDisplayPageStatus, showSignIn, setShowSignIn, updateNote, userDetails, setUserDetails, loading, setLoading, loading2, setLoading2, activeClass, setActiveClass, theme, setTheme }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;

