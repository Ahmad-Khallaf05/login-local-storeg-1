document.addEventListener('DOMContentLoaded', () => {
    const createAccountForm = document.getElementById('createAccountForm');
    const signInForm = document.getElementById('signInForm');
    const homePage = document.getElementById('homePage');
    const welcomeUser = document.getElementById('welcomeUser');
    const userList = document.getElementById('userList');
    const signOutButton = document.getElementById('signOutButton');

    function saveUser(firstName, lastName, email, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ firstName, lastName, email, password });
        localStorage.setItem('users', JSON.stringify(users));
    }

    function getUserByEmail(email) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users.find(user => user.email === email);
    }

    function displayUsers() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        userList.innerHTML = '';
        users.forEach((user, index) => {
            userList.innerHTML += `
                <div class="user">
                    <input type="text" value="${user.firstName}" data-index="${index}" data-field="firstName">
                    <input type="text" value="${user.lastName}" data-index="${index}" data-field="lastName">
                    <button class="edit-button" data-index="${index}">Edit</button>
                </div>`;
        });

        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                const firstNameInput = document.querySelector(`input[data-index="${index}"][data-field="firstName"]`);
                const lastNameInput = document.querySelector(`input[data-index="${index}"][data-field="lastName"]`);
                updateUser(index, firstNameInput.value, lastNameInput.value);
            });
        });
    }

    function updateUser(index, firstName, lastName) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users[index].firstName = firstName;
        users[index].lastName = lastName;
        localStorage.setItem('users', JSON.stringify(users));
        displayUsers();
    }

    createAccountForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        saveUser(firstName, lastName, email, password);
        alert('Account created successfully');
        createAccountForm.reset();
    });

    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signInEmail').value;
        const password = document.getElementById('signInPassword').value;
        const user = getUserByEmail(email);
        if (user && user.password === password) {
            welcomeUser.textContent = user.firstName;
            displayUsers();
            homePage.style.display = 'block';
            document.getElementById('createAccount').style.display = 'none';
            document.getElementById('signIn').style.display = 'none';
        } else {
            alert('Invalid email or password');
        }
    });

    signOutButton.addEventListener('click', () => {
        homePage.style.display = 'none';
        document.getElementById('createAccount').style.display = 'block';
        document.getElementById('signIn').style.display = 'block';
    });
});
