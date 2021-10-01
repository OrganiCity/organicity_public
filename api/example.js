export async function getTodos({ instance }, payload) {
    return await instance.get("https://jsonplaceholder.typicode.com/todos/" + payload)
}