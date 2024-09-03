const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!");
}

// Function to handle user creation
const createUser = () => {
    const name = $('#newUserName').val();
    const email = $('#newUserEmail').val();
    const age = parseInt($('#newUserAge').val());

    if (name && email && !isNaN(age)) {
        $.ajax({
            url: '/api/users', // Updated to match the correct endpoint
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name, email, age }),
            success: (data) => {
                if (data.statusCode === 201) {
                    alert('User created successfully!');
                    $('#newUserName').val('');
                    $('#newUserEmail').val('');
                    $('#newUserAge').val('');
                    fetchUsers(); // Refresh the user list after creation
                } else {
                    alert('Error creating user: ' + data.message);
                }
            },
            error: (err) => {
                console.error('Error:', err);
            }
        });
    } else {
        alert('Please fill in all fields correctly.');
    }
}

// Function to fetch and display users
const fetchUsers = () => {
    $.ajax({
        url: '/api/users',
        type: 'GET',
        success: (data) => {
            if (data.statusCode === 200) {
                const users = data.data;
                let userList = '<ul>';
                users.forEach(user => {
                    userList += `<li>${user.name} - ${user.email} - ${user.age} years old</li>`;
                });
                userList += '</ul>';
                $('#users').html(userList);
            } else {
                $('#users').html('<p>No users found</p>');
            }
        },
        error: (err) => {
            console.error('Error fetching users:', err);
        }
    });
}

$(document).ready(() => {
    $('#clickMeButton').click(() => {
        alert("Thanks for clicking me. Hope you have a nice day!");
    });

    $('#rightButton').click(() => {
        console.log('Right Button Clicked!');
        $.ajax({
            url: 'http://localhost:3040/addTwoNumber',
            type: 'GET',
            success: (data) => {
                $('#info').text("Result of adding two numbers is: " + data.data);
            },
            error: (err) => {
                console.error(err);
            }
        });
    });

    $('#createUserButton').click(() => {
        const name = $('#newUserName').val();
        const email = $('#newUserEmail').val();
        const age = parseInt($('#newUserAge').val());

        if (name && email && !isNaN(age)) {
            $.ajax({
                url: '/api/users',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ name, email, age }),
                success: (data) => {
                    if (data.statusCode === 201) {
                        alert('User created successfully!');
                        $('#newUserName').val('');
                        $('#newUserEmail').val('');
                        $('#newUserAge').val('');
                    } else {
                        alert('Error creating user: ' + data.message);
                    }
                },
                error: (err) => {
                    console.error('Error:', err);
                }
            });
        } else {
            alert('Please fill in all fields correctly.');
        }
    });

    $('#fetchUsersButton').click(() => {
        const userName = $('#userName').val();

        if (userName) {
            $.ajax({
                url: '/getUserByName',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ name: userName }),
                success: (data) => {
                    if (data.statusCode === 200) {
                        const user = data.data;
                        $('#users').html(`
                            <p><strong>Name:</strong> ${user.name}</p>
                            <p><strong>Email:</strong> ${user.email}</p>
                            <p><strong>Age:</strong> ${user.age}</p>
                        `);
                    } else {
                        $('#users').html(`<p>${data.message}</p>`);
                    }
                },
                error: (err) => {
                    console.error('Error fetching user:', err);
                }
            });
        } else {
            alert('Please enter a user name to fetch.');
        }
    });
});

