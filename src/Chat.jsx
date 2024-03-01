import { useEffect, useRef, useState } from "react"
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore"
import { auth, db } from "./config/firebase"

export default function Chat({ room }){
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])

    const messagesRef = collection(db, "messages");
    const scrollableDivRef = useRef(null);

    useEffect(() => {
        const queryMessages = query(
            messagesRef, 
            where("room", "==", room),
            orderBy("createdAt")
        );
        const unsuscribe = onSnapshot(queryMessages, (snapshot) =>{
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id:doc.id});
            });
            setMessages(messages)
        });

        return () => unsuscribe();
    }, []);

    useEffect(() => {
        scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight
    }, [messages])

    async function handleSubmit(e) {
        e.preventDefault() 
        if(newMessage === "") return;

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });

        setNewMessage("")
    };

    return(
        <div className="chat-room">
            <div className="header">
                <h1>Welcome to: <span className="room-name">{room}</span></h1>
            </div>
            <div className="messages" ref={scrollableDivRef}>
                {messages.map((messages) => (
                <div className="message" key={messages.id}>
                    <span className="user">{messages.user}: </span>
                    {messages.text}
                </div>
                ))}  
            </div>
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder="Type your message here..."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
                />
                <button>Send</button>
            </form>
        </div>
    )
}