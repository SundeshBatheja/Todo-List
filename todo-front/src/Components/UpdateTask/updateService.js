const UpdateTodo = async ({ taskId, task }) => {
  try {
    const jwtToken = localStorage.getItem('token');
    console.log(jwtToken)
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'application/json',
    };
    const response = await fetch(`http://localhost:3300/todo/${taskId}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    window.location.href = 'http://localhost:3000/home'
    // Check if data has the expected properties before setting state

  } catch (error) {
    console.error('Error:', error);
  }
};
export default UpdateTodo;