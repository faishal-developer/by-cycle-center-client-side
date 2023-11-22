import { getAuth, updateProfile, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeFirebaseApp from "../../Firebase/Firebase.init";

initializeFirebaseApp()

//code started here
const auth = getAuth();

const useFireBase = () => {
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const addUserOnMongodb = (email, name) => {
        fetch(`https://by-cycle-center-faishal-developer.vercel.app/users`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email, name })
        })
            .then(res => res.json())
            .then(data => { })
            .catch(e => alert(e.message))
    }

    const findUserFromDb = (email, displayName) => {
        setIsLoading(true)

        fetch(`https://by-cycle-center-faishal-developer.vercel.app/users/${email}`)
            .then(res => res.json())
            .then(data => {
                let modifiUser = { ...data }
                modifiUser['displayName'] = displayName
                let role = data?.role ? data.role : 'user'
                modifiUser['role'] = role;
                console.log(modifiUser);
                setUser(modifiUser)
            })
            .catch(e => console.log(e.message))
            .finally(() => setIsLoading(false))
    }

    const createUserWithPassword = (email, password, name, history) => {
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then((result) => {
                    let updateUser = { ...res.user }
                    addUserOnMongodb(email, name)
                    updateUser['displayName'] = name
                    setUser(updateUser)
                    history.push('/home')

                }).finally((error) => {
                    setIsLoading(false)
                })

            })
            .catch(e => {
                let error = {}
                error.message = e.message;
                setUser(error)
                setIsLoading(false)
            })
    }
    const signInWithPassword = (email, password, history, url) => {
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                setUser(res.user)
                findUserFromDb(res.user.email, res.user.displayName)
                history.push(`${url}`)
            })
            .catch(e => {
                let error = {}
                error.message = e.message;
                setUser(error)
                setIsLoading(false)
            })
    }

    const logOut = () => {
        signOut(auth)
            .then(() => {
                setUser({})
            })
            .catch(e => {
                let error = {}
                error.message = e.message;
                setUser(error)
            })
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                findUserFromDb(user.email, user.displayName)
                setUser(user)
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        });
    }, [])

    return {
        user,
        signInWithPassword,
        createUserWithPassword,
        logOut,
        isLoading
    }
}

export default useFireBase