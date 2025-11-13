const express = require('express');
const app = express();
app.use(express.json());

const users = [
    { id: 1, name: "Suman", address: "Amnour" },
    { id: 2, name: "Raman", address: "Maker" },
    { id: 3, name: "Manjit", address: "Lachhi" }];

app.get('/users', (request, response) => {
    response.status(200).json({ message: "Data fetch successfully", users: users });
});

// Find Specific data using get method // By ID
app.get('/user/:id', (request, response) => {
    const id = Number(request.params.id);
    const user = users.find(u => u.id === id);
    if (user) {
        response.status(200).json({
            message: "Find User Successfully",
            id: id,
            user: user
        });
    }
    else {
        response.status(404).json({ message: "user not found" });
    }
});


// Find Specific data using get method // By Name
app.get('/user/name/:name', (request, response) => {
    const name = String(request.params.name);
    const user = users.find(u => u.name === name);
    if (user) {
        response.status(200).json({
            message: "Find User Successfully",
            user: user
        });
    }
    else {
        response.status(404).json({ message: "user not found" });
    }
});

// Add New User Using Post Method

app.post('/newUser', (request, response) => {
    const newUser = request.body;
    users.push(newUser);
    response.status(201).json({
        message: "User Added Successfully",
        newUser: newUser
    });
});
app.delete('/deletUser/id/:id', (request, response) => {
    const userId = Number(request.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    console.log("index: " + userIndex);
    if (userIndex === -1) {
        response.status(404).json({ message: "User Not Found" });
    }
    else {
        const deleteU = users.splice(userIndex, 1);
        response.status(200).json({
            message: "user deleted successfully",
            id: userId
        });
    }
})

app.put('/updateUser/:id', (request, response) => {
    const userId = Number(request.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        response.status(404).json({
            message: "user not found"
        });
    }
    else {
        const userData = request.body;
        users[userIndex] = { ...users[userIndex], ...userData };
        response.json({
            message: "data updated successfully"
        });
    }
})
app.listen(4000, () => {
    console.log("Server is running...");
});