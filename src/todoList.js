import './App.css';
import { useState } from 'react';

//In JSX you need a single parent element.
//So you should wrap it in a single REACT FRAGMENT (just <> to </>)

//OK, some notes:
//curly braces in a return statement mean that you're using JSX, which is like mixing javascript and HTML. 
    //


//NOTE: HERE YOU HAVE TO RETURN THE TASKS.MAP THING. IT DOES RETURN SOMETHING, BUT IT'LL BE IN A VACCUUM - IF YOU WRAP IT INSIDE OF ANOTHER FUNCTION,
//YOU HAVE TO RETURN WHAT IT RETURNS FOR ANYTHING TO COME OF IT

//Div key={index} basically makes sure to map everything to a specific element inside your list. You need this or else you'll get a warning.
//No comma between that and className.

//OK, if you want to create a dynamically changing component, you need to define it as a seperate react component. 
//THAT'S IT!

function TodoList() {
    //usestate is a "react hook" that allows react components to have states.

    //OK, let's look at the syntax here a little better.
    //useState will return an array that looks like [originalValue, updaterFunction]
    //Weird - apparently, updaterfunction can 
    //And inside useState is the initial value that you want upon the start of the webpage.
    const [tasks, setTasks] = useState([
    ]);

    //This allows you to dynamically update name, note, due
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const [due, setDue] = useState('');

    //This is your boolean flag for showing a form.
    const [showForm, setShowForm] = useState(false);

    //OK, note here - if you press showForm, 
    function mapTasks() {
        return tasks.map((task, index) => (
            <div key={index} className="todo-item">
                <div>
                    <p>Task: {task[0]}</p>
                    <p>Notes: {task[1]}</p>
                    <p>Due: {task[2]}</p>
                    <button onClick={() => deleteTask(index)}>Remove</button>
                    <button onClick={() => setShowForm(!showForm)}>Edit</button>
                    <p>
                        {showForm &&
                            <>
                            <div>
                                <input type="text" value={name} onChange={(e) => handleChange(e, "title")} placeholder="Task Title"></input>
                            </div>
                            <div>
                                <input type="text" value={notes} onChange={(e) => handleChange(e, "notes")} placeholder="Task Notes"></input>
                            </div>
                            <div>
                                <input type="text" value={due} onChange={(e) => handleChange(e, "due")} placeholder ="Due Date"></input>
                            </div>
                            <button onClick={() => confirmEdit(index)}>Confirm Edit</button>
                            </>
                        }
                    </p>
                </div>
            </div>
        ))
    }

    //MAKE SURE YOU SET SHOWFORM TO FALSE WHEN 1) confirm 2) erase 3) you press edit twice (done in the JSX being returned: !current state gets you the opposite)
    function confirmEdit(index) {
        const newTasks = [...tasks]
        if (name != '') {
            newTasks[index][0] = [name];
        }
        if (notes != '') {
            newTasks[index][1] = [notes];
        }
        if (due != '') {
            newTasks[index][2] = [due];
        }
        setTasks(newTasks);
        setShowForm(false);
        setName('')
        setNotes('')
        setDue('')
    }
    function deleteTask(index) {
        const newTasks = [...tasks]
        newTasks.splice(index, 1)
        setTasks(newTasks)
        setShowForm(false)
    }

    //This is not a usestate function, it's just a regular helper function
    //So e is an "event" - particularly in this case some input from a user. 
    //and target.value is standard java syntax for the specific thing that was inputted by the user in the event. 
    function handleChange(e, target) {
        if (target == "title") {
            setName(e.target.value)
        } else if (target == "notes") {
            setNotes(e.target.value)
        } else {
            setDue(e.target.value)
        }
    }


    //This literally just gives you a new task using useState to update the state.
    //So what does ...tasks do?
    //Well it's basically like saying each of the array elements without having to write them out yourself, just like the 3 dots kind of mean.
    //So:
    //setTasks([...tasks], ["new task title," "notes," "due"])
    //is the same as
    //setTasks(["first task title," "notes," "due"], ["second task title," "notes," "due"], ["new task title," "notes," "due"])
    //The 3 dots mean the other array can change DYNAMICALLY - if you wrote it like I did above, it would just reupdate to the same thing every time (that I wrote above)

    function addTask() {
        //Adds a new task with the default values, which are all the empty string
        setTasks([...tasks, [name, notes, due]])
        //Then it sets the name, due, and notes back to the empty string.
        setName('')
        setDue('')
        setNotes('')
    }

    //OK, BIG NOTE - in the onClick syntax, do not CALL the function in the brackets like function() - just write its NAME. If you call it it'll cause an infintie loop.
    return (
        <div>
            <p className="holographic-text">Todo List</p>
            <div>
                <input type="text" value={name} onChange={(e) => handleChange(e, "title")} placeholder="Task Title" />
            </div>
            <div>
                <input type="text" value={notes} onChange={(e) => handleChange(e, "notes")} placeholder="Task Notes" />
            </div>
            <div>
                <input type="text" value={due} onChange={(e) => handleChange(e, "due")} placeholder="Task Due Date" />
            </div>
            <div>
                <button onClick={addTask}>Add Task</button>
            </div>

            <div>
                {mapTasks()}
            </div>
        </div>
    );
}


export default TodoList;