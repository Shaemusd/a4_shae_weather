const Header = ({ title, message }) =>
    React.createElement("div", null,
        React.createElement("h1", null, title),
        React.createElement("p", null, message)
    );

const Footer = ({ message }) =>
    React.createElement("div", null,
        React.createElement("p", null, message || "Copyright © 2023 My Website. All rights reserved.")
    );

const Card = ({ title, subtitle, content, image }) =>
    React.createElement("div", { className: "card" },
        React.createElement("img", { src: image, alt: subtitle, style: { width: "100%" } }),
        React.createElement("h2", null, title),
        React.createElement("h3", null, subtitle),
        React.createElement("p", null, content)
    );


const TodoList = ({ todos }) =>
    React.createElement("div", null,
        React.createElement("ul", null,
            todos.map(todo =>
                React.createElement("li", {
                    key: todo.id,
                    style: { textDecoration: todo.completed ? "line-through" : "none" }
                },
                    React.createElement("input", { type: "checkbox", checked: todo.completed }),
                    " ",
                    todo.text
                )
            )
        ),
        React.createElement("button", null, "Remove Completed Items")
    );
