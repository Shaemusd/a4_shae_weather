import React from 'react';
import Header from 'components/header.js';
import Footer from './footer';
import TodoList from './TodoList';
import Card from './Card';

const App = () => {
    const todos = [
        { id: 1, text: "Complete React assignment", completed: false },
        { id: 2, text: "Study for math test", completed: false },
        { id: 3, text: "Do laundry", completed: true }
    ];

    return (
        <div>
            <Header title="Welcome to My Website!" message="Thanks for visiting my site." />
            <TodoList todos={todos} />
            <Card
                title="My Card Title"
                subtitle="My Card Subtitle"
                content="This is the content of my card."
                image="https://example.com/my-image.jpg"
            />
            <Footer message="Contact me at contact@mywebsite.com" />
        </div>
    );
};

export default App;
