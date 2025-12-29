import { useState } from "react";
import { useMutation } from "urql";

const CREATE_TODO_MUTATION = `
mutation ($input: NewTodo!) {
  createTodo(input: $input) {
    id
    text
  }
}
`;

export default function TodoMutation(
    { userID }: { userID: string }
) {

    // keep track of Input
    const [newText, setNewText] = useState('')

    // Mutation
    const [, createTodo] = useMutation(CREATE_TODO_MUTATION);

    const handleAddTodo = async () => {
        if (!newText) {
            return
        };

        await createTodo({
            input: {
                text: newText,
                userId: userID
            }
        });

        // clear input after mutation returned
        setNewText('');
    };

    return <section className="container">
        <h2>Create a new ToDo</h2>
        <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="New todo text"
        />
        <button
            className="btn-glass"
            onClick={handleAddTodo}
        >
            Add Todo
        </button>
    </section>
}
