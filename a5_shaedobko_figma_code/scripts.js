// Profile Component
// props: name, description, imageUrl
// css has: div.profile h2 p img
function Profile(props) {
    return (
        <div className="profile">
            <img src={props.imageUrl} alt={props.name} />
            <h1>{props.name}</h1>
            <p>{props.description}</p>
        </div>
    );
}

// App Component
// Root of the entire web application
function App() {
    return (
        <div>
            <Profile name="Arlin" description="MULT 213 Instructor" imageUrl="https://arlin.education/media/arlin.jpg" />
            <Profile name="Craig" description="GRPH 201 Instructor" imageUrl="https://arlin.education/media/craig-head.png" />
            <Quote text="Sometimes I'm good at things. Sometimes not." author="Arlin Schaffel" />
        </div>
    );
}

// Quote Component
// Using an Arrow Function just to show it is possible
// props: text, author
// css has: blockquote.quote p footer
const Quote = (props) => {
    return (
        <blockquote className="quote">
            <p>"{props.text}"</p>
            <footer>- {props.author}</footer>
        </blockquote>
    );
}

// React DOM Render
// We should only ever have ONE of these
ReactDOM.render(<App />, document.getElementById('root'));
