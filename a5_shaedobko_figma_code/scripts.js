// Profile Component
// props: name, description, imageUrl
// css has: div.profile h2 p img
////////////////////
// function Profile(props) {
//     return (
//         <div className="profile">
//             <img src={props.imageUrl} alt={props.name} />
//             <h1>{props.name}</h1>
//             <p>{props.description}</p>
//         </div>
//     );
// }
////////////////////
// App Component
// Root of the entire web application
/////////////////////////////////////////////////////
// function App() {
//     return (
//         <div>
//             <Profile name="Arlin" description="MULT 213 Instructor" imageUrl="https://arlin.education/media/arlin.jpg" />
//             <Profile name="Craig" description="GRPH 201 Instructor" imageUrl="https://arlin.education/media/craig-head.png" />
//             <Quote text="Sometimes I'm good at things. Sometimes not." author="Shae Dobko" />
//         </div>
//     );
// }
///////////////////////////////////

// Quote Component
// Using an Arrow Function just to show it is possible
// props: text, author
// css has: blockquote.quote p footer

//////////////////////////////////////
// const Quote = (props) => {
//     return (
//         <blockquote className="quote">
//             <p>"{props.text}"</p>
//             <footer>- {props.author}</footer>
//         </blockquote>
//     );
// }
////////////////////////////////

function Header(props) {
    return (
        <header>
            <h1>{props.title}</h1>
            <p>{props.message}</p>
        </header>
    );
}

function Footer(props) {
    return (
        <footer>
            <p>{props.message}</p>
            <p>Copyright © 2023 My Website. All rights reserved.</p>
        </footer>
    );
}

function Card(props) {
    return (
        <div className="card">
            <img src={props.image} alt={props.subtitle} />
            <h2>{props.title}</h2>
            <h3>{props.subtitle}</h3>
            <p>{props.content}</p>
        </div>
    );
}
function App() {
    return (
        <div>
            <Header title="Welcome to My Website!" message="Thanks for visiting my site." />
            <Card
                title="My Card Title"
                subtitle="My Card Subtitle"
                image="media/overpriced.png"
                content="This is the content of my card."
            />
            <Footer message="Contact me at contact@mywebsite.com" />
        </div>
    );
}
























// const Student = (props) => {
//     return (
//         <tr>
//             <td>{props.name}</td>
//             <td>{props.grade}</td>
//             <td>{props.passed ? "Pass" : "Fail"}</td>
//         </tr>
//     );

// }

// const StudentGrades = (props) => {
//     // create student array using map
//     let student_array = props.students.map(student => (
//         <Student
//             name={student.name}
//             grade={student.grade}
//             passed={student.passed} />
//     ));

//     return (
//         <table>
//             <tr>
//                 <th>Name</th>
//                 <th>Grade</th>
//                 <th>Pass/Fail</th>
//             </tr>
//             {student_array}
//         </table>
//     )

// }

// function App() {
//     return (
//         <div>
//             <h1>Student Grades</h1>
//             <StudentGrades students={[
//                 { id: 1, name: "Alice", grade: 85, passed: true },
//                 { id: 2, name: "Bob", grade: 45, passed: false },
//                 { id: 3, name: "Charlie", grade: 72, passed: true }
//             ]} />
//         </div>
//     );
// }




const TodoItem = (props) => {
    return (
        <li>
            <input type="checkbox" checked={props.completed} readOnly />
            <span style={{ textDecoration: props.completed ? "line-through" : "none" }}>
                {props.text}
            </span>
        </li>
    );
};


const TodoList = (props) => {
    const todoItems = props.todos.map(todo => (
        <TodoItem key={todo.id} text={todo.text} completed={todo.completed} />
    ));

    const handleRemoveCompleted = () => {
        const remainingTodos = props.todos.filter(todo => !todo.completed);
        console.log("Remaining todos:", remainingTodos);
    };

    return (
        <div>
            <ul>
                {todoItems}
            </ul>
            <button onClick={handleRemoveCompleted}>Remove Completed Items</button>
        </div>
    );
};

function App() {
    return (
        <div>
            <h1>Todo List</h1>
            <TodoList todos={[
                { id: 1, text: "Complete React assignment", completed: false },
                { id: 2, text: "Study for math test", completed: true },
                { id: 3, text: "Do laundry", completed: false }
            ]} />
        </div>
    );
}




























// React DOM Render
// We should only ever have ONE of these
ReactDOM.render(<App />, document.getElementById('root'));
